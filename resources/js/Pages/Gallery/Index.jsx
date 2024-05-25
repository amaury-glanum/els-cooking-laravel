import {useEffect, useState, useRef} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryImg from "@/Pages/Gallery/Partials/CloudinaryImg.jsx";
import UpdateMediaProvider from "@/Pages/Gallery/Partials/UpdateMediaProvider.jsx";
import {toast} from "react-toastify";
import ProjectMediasSelection from "@/Pages/Gallery/Partials/ProjectMediasSelection.jsx";
import { useCapitalize } from "@/utils/stringManipulation.js";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Gallery({ auth, medias, members, projects, authors, flash }) {
    const toastId = useRef(null);
    console.log(auth);
    const [selectedMedias, setSelectedMedias] = useState([])
    const [openSelectedMedias, setOpenSelectedMedias] = useState(false)

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

    const isCloudinaryMedias = medias.some(media => media.media_provider === "cloudinary");

    const getFolderName = (url) => {
        try {
            const parts = url.split('/');
            return parts.length > 1 ? parts[0] : url;
        } catch(error) {
            console.error(error);
            return ""
        }
    };

    const cld = new Cloudinary({cloud: {cloudName: 'dtgt8j8u8'}});

    const providerRoute = {
        getActive: {name: "cooking-medias.get-cloudinary", method:"get", header:""},
        getReadyToUpdate: {name: "cooking-medias.get-cloudinary", method:"get", header:""},
        getUnactive : {name: "cooking-medias.down-cloudinary", method:"get", header:""},
    }
    const contentBtnProvider = 'Cloudinary'
    const addedcss = {
        linkWrapper: "flex gap-2 max-sm:justify-center",
        firstLink: "bg-green-600 hover:bg-green-200 active:bg-red-800",
        secondLink: "bg-gray-600 hover:bg-red-200 active:bg-red-800"
    };

    console.log('SELECTED MEDIA LENGTH ==xx ', selectedMedias.length);
  console.log(openSelectedMedias);
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
                                    <span className={"max-sm:hidden"}>Rendez-vous sur le formulaire à gauche.</span>
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
                    <section className={"w-full mx-auto sm:px-6 lg:px-8"}>
                        <UpdateMediaProvider
                            isActiveMedias={isCloudinaryMedias}
                            providerRoute={providerRoute}
                            providerName={contentBtnProvider}
                            addedcss={addedcss}/>
                    </section>

                    {medias.length > 0 && medias.some(media => media.media_provider === "cloudinary") ?
                        (<section className="w-full my-5 mx-auto sm:px-6 lg:px-8">
                            <h2 className={"text-xl text-blue-950 font-bold"}>Images Cloudinary</h2>
                            <section className={"py-5 w-full flex flex-col gap-1"}>
                                <p className={"max-w-[1000px] text-md text-gray-600 font-bold italic"}>Ces images
                                    reflètent celles présentent dans votre espace cloudinary. Elles sont maintenant
                                    disponibles pour être utilisées dans
                                    vos création de els-cooking.</p>
                                <a title="aller dans mon espace cloudinary"
                                   href={`${myCloudinaryAccountUrl}`}
                                   className={"text-md text-green-600 italic hover:text-orange-700 text-gray-600 font-semibold"}>
                                    Se rendre dans mon espace cloudinary
                                </a>
                            </section>
                            <section className={"my-5 flex flex-col sm:flex-row gap-5"}>
                                <aside className={`sm:min-w-[250px] max-w-[400px]
                                        ${openSelectedMedias ? "max-sm:hidden" : "max-sm:block z-100"}
                                        rounded-xl bg-white z-40 px-3 sm:px-6 lg:px-8`}>
                                    <div className={"flex flex-col justify-center items-center"}>
                                        {projects.length > 0 && medias.length > 0 ?
                                            <ProjectMediasSelection
                                                openSelectedMedias={openSelectedMedias}
                                                projects={projects}
                                                medias={medias}
                                                setSelectedMedias={setSelectedMedias}
                                                selectedMedias={selectedMedias}
                                            /> : <div className={"flex flex-col items-center justify-center"}>
                                                <p className={"text-center text-bold text-md text-gray-500"}>Vous devez
                                                    créer des projets pour leur allouer des médias</p>
                                            </div>}
                                    </div>
                                </aside>
                                {folders.map(folder => (
                                    <article className={`grow`}key={folder.id}>
                                        <h3 className={"my-5 text-lg font-bold text-blue-950"}>{folder.name}</h3>
                                        <div className={"flex flex-wrap gap-5"}>
                                            {medias
                                                .filter(media => getFolderName(media.media_provider_id) === folder.name && media.media_provider === 'cloudinary')
                                                .map(media => (
                                                    <CloudinaryImg key={media.id} cld={cld} media={media}
                                                                   selectedMedias={selectedMedias}/>
                                                ))}
                                        </div>
                                    </article>
                                ))}
                            </section>
                        </section>) : null}
            </div>
        </AuthenticatedLayout>
    );
}
