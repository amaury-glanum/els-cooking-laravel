import {useEffect, useState, useRef} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProviderImg from "@/Pages/Gallery/Partials/ProviderImg.jsx";
import UpdateMediaProvider from "@/Pages/Gallery/Partials/UpdateMediaProvider.jsx";
import {toast} from "react-toastify";
import ProjectMediasSelection from "@/Pages/Gallery/Partials/ProjectMediasSelection.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import NavLink from "@/Components/NavLink.jsx";

export default function Gallery({ auth, medias, members, projects, authors, flash, providers, providersUrls }) {
    const toastId = useRef(null);

    const [selectedMedias, setSelectedMedias] = useState([])
    const [openSelectedMedias, setOpenSelectedMedias] = useState(false)

    let selectedProviders = [];
    let providerRoute;

    providers.map(provider => {
            providerRoute = {
                getActive: {name: `cooking-medias.get-provider`, method:"get", header:""},
                getReadyToUpdate: {name: `cooking-medias.get-provider`, method:"get", header:""},
                getUnactive : {name: `cooking-medias.down-provider`, method:"get", header:""},
            }
            selectedProviders = [...selectedProviders, {
                provider: provider,
                url: providersUrls[`${provider}`],
                isActiveProvider: medias.some(media => media.media_provider === provider),
                route: providerRoute
            }]
        }
    )

    const handleOpenSelectedMedia = () => {
        if(openSelectedMedias) {
            setOpenSelectedMedias(false)
        } else {
            setOpenSelectedMedias(true)
        }
    }


    console.log('selected media', selectedMedias)

    useEffect(() => {
        if(!toast.isActive(toastId.current)) {
            toast(flash?.message)
            toast.error(flash?.error)
            toast.warning(flash?.warning)
            toast.success(flash?.success)
        }
    }, [flash])

    console.log('gallery - members', members)
    console.log('gallery - projects', projects)
    console.log('gallery - authors', authors)
    console.log('gallery - medias', medias)

    console.log('media selected', selectedMedias)

    const folders = [
        {id:1, name:'elstogo' }
    ]

    const myCloudinaryAccountUrl = '';

    const getFolderName = (url) => {
        try {
            const parts = url.split('/');
            return parts.length > 1 ? parts[0] : url;
        } catch(error) {
            console.error(error);
            return ""
        }
    };

    const addedcss = {
        linkWrapper: "flex gap-2 max-sm:justify-center",
        firstLink: "bg-green-600 hover:bg-green-200 active:bg-red-800",
        secondLink: "bg-gray-600 hover:bg-red-200 active:bg-red-800"
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes médias</h2>}
        >
            <Head title="Els-cooking - Gallerie de médias"/>

            <div className={"w-full my-12 flex flex-col min-h-100"}>
                    <section className={`w-full mx-auto sm:px-6 lg:px-8 ${openSelectedMedias ? "max-sm:block" : "max-sm:hidden"}`}>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="px-6 pt-4 text-gray-900">
                                <h2 className={"text-lg font-bold my-2"}>Bienvenue {auth.username} </h2>
                                <p className={"text-lg my-2"}> Ceci est votre galerie d'images: nous vous expliquons la
                                    démarche pour allouer une image à vos projets.</p>
                            </div>
                            <ul className="px-6 pb-4 text-gray-900">
                                <p className={"py-3 text-sm text-gray-500 font-bold underline"}>Etapes à suivre : </p>
                                <li className={"text-sm text-gray-500"}><span
                                    className="font-bold">Etape 1 :</span> Sélectionner et activer un provider d'images.
                                </li>
                                <li className={"text-sm text-gray-500"}><span
                                    className="font-bold">Etape 2 :</span> Vérifier que les images voulues s'affichent.
                                </li>
                                <li className={"text-sm text-gray-500"}><span
                                    className="font-bold">Etape 3 :</span>
                                    <span className={"max-sm:hidden"}> Rendez-vous sur le formulaire à gauche.</span>
                                    <span className={"sm:hidden"}>CLiquer sur "Allouer mes médias".</span>
                                </li>
                                <li className={"text-sm text-gray-500"}><span
                                    className="font-bold">Etape 4 :</span> Utiliser le formulaire pour allouer un média
                                    à un objet (projets etc.) et, si besoin est, son emplacement.
                                </li>
                                <li className={"text-sm text-gray-500"}><span
                                    className="font-bold">Etape 5 :</span> Valider la sélection du média : il sera
                                    affiché sur le site aprés publication
                                    de l'objet (projets etc.).
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className={"w-full flex justify-center items-center my-5 sm:hidden"}>
                        <PrimaryButton type={"button"} onClick={handleOpenSelectedMedia}>
                            {openSelectedMedias ? "Allouer mes médias" : "Fermer le panneau"}
                        </PrimaryButton>
                    </section>
                    <section className={"my-3 w-full mx-auto sm:px-6 lg:px-8"}>
                        {selectedProviders.length > 0 ?
                            selectedProviders
                            .filter(store =>
                                store.route.getActive &&
                                store.route.getReadyToUpdate &&
                                store.route.getActive.name &&
                                store.route.getReadyToUpdate.name &&
                                store.route.getReadyToUpdate.method &&
                                store.provider)
                            .map((store, index) => {
                            return (
                                <UpdateMediaProvider
                                    key={index.toString()+ "--" + store.provider}
                                    isActiveMedias={store.isActiveProvider}
                                    providerRoute={store.route}
                                    providerName={store.provider}
                                    addedcss={addedcss}/>
                            )
                        }): null}
                    </section>

                    {medias.length > 0 ?
                        (<section className="w-full my-5 mx-auto sm:px-6 lg:px-8">
                            <h2 className={"text-xl text-blue-950 font-bold"}>Images Cloudinary</h2>
                            <section className={"py-5 w-full flex flex-col gap-1"}>
                                <p className={"max-w-[1000px] text-md text-gray-600 font-bold italic"}>Ces images
                                    reflètent celles présentent dans votre espace de cloud ou localement. Elles sont maintenant
                                    disponibles pour être utilisées dans
                                    vos création de els-cooking.</p>
                                {selectedProviders.map(provider => {
                                    return (<a title={`aller dans mon espace ${provider.provider}`}
                                       href={`${provider.url}`}
                                       className={"text-md text-green-600 italic hover:text-orange-700 font-semibold"}>
                                        Se rendre dans mon espace {provider.provider}
                                    </a>)
                                })}

                            </section>
                            <section className={"my-5 flex flex-col sm:flex-row gap-5"}>
                                <aside className={`sm:min-w-[250px] max-w-[400px] max-h-[600px]
                                        ${openSelectedMedias ? "max-sm:hidden" : "max-sm:block z-100"}
                                        rounded-xl bg-white z-40 px-3 sm:px-6 lg:px-8`}>
                                    <div className={"h-full flex flex-col justify-center items-center"}>
                                        {projects.length > 0 && medias.length > 0 ?
                                            <ProjectMediasSelection
                                                openSelectedMedias={openSelectedMedias}
                                                projects={projects}
                                                medias={medias}
                                                setSelectedMedias={setSelectedMedias}
                                                selectedMedias={selectedMedias}
                                            /> :
                                            <div className={"p-4 h-full flex flex-col items-center justify-center"}>
                                                <h2 className={"text-primary-dark text-center text-bold text-lg my-5"}>Aucun projet
                                                    disponible</h2>
                                                <p className={"text-center text-bold text-md text-gray-500"}>Vous devez
                                                    créer des projets pour leur allouer des médias.</p>
                                                <NavLink className={"my-5 text-center text-tertiary-600 hover:text-tertiary-950"}
                                                         href={route('cooking-projects.index')}
                                                         active={route().current('cooking-projects.index')}>
                                                    Créer un projet
                                                </NavLink>
                                            </div>}
                                    </div>
                                </aside>
                                <section className={`grow flex flex-col gap-4`} >
                                    {folders.map(folder => (
                                    <article>
                                        <h3 className={"mb-5 text-lg font-bold text-primary-dark"}>Images non-classées:</h3>
                                        <div className={"flex flex-wrap gap-5"}>
                                            {medias
                                                .filter(media => getFolderName(media.media_provider_id) !== folder.name)
                                                .map(media => (
                                                    <ProviderImg key={media.id} media={media}
                                                                 selectedMedias={selectedMedias}/>
                                                ))}
                                        </div>
                                    </article>
                                    ))}

                                    {folders.map(folder => (
                                        <article key={folder.id}>
                                            {medias.some(media => folder.name === getFolderName(media.media_provider_id)) ?
                                            <h3 className={"mb-5 text-lg font-bold text-primary-dark"}>Dossier {folder.name} <span
                                                className={"text-tertiary-700"}>{folder.name}</span></h3> : null}
                                            <div className={"flex flex-wrap gap-5"}>
                                                {medias
                                                    .filter(media => getFolderName(media.media_provider_id) === folder.name)
                                                    .map(media => (
                                                        <ProviderImg key={media.id} media={media}
                                                                     selectedMedias={selectedMedias}/>
                                                    ))}
                                            </div>
                                        </article>
                                    ))}
                                </section>

                            </section>
                        </section>) : null}
            </div>
        </AuthenticatedLayout>
    );
}
