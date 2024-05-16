import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm, usePage, Head, Link} from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import Wysiwyg from "@/Pages/CookingProjects/Partials/Wysiwyg.jsx";

export default function Index({ auth, projects}) {

    const { } = usePage().props

    const [editorOpened, setEditorOpened] = useState(false)
    const [editProjectId, setEditProjectId] = useState(null)

    console.log(usePage().props)

    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        project_date: '',
        project_place: '',
        project_category: '',
        project_title: '',
        project_extract: '',
        project_teaser: '',
        project_description: '',
        project_goal: '',
        project_method: '',
        project_results: '',
        project_single_url: '',
        project_img_url: '',
        project_img_name: '',
        project_infos: {},
        project_meta: {},
        project_publish_status: '',
    });

    console.log('project', projects)

    const submit = (e) => {
        e.preventDefault();
        post(route('cooking-projects.store'), { onSuccess: () => reset() });
    };



    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Equipe" />
            <section className="max-w-7xl mx-auto flex flex-wrap" >
                <div className="min-w-[550px] p-4 sm:p-6 lg:p-8">
                    <form onSubmit={submit} className="max-w-lg flex flex-col gap-5">
                        <TextInput
                            value={data.project_title}
                            placeholder="Titre du projet"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('project_title', e.target.value)}
                        ></TextInput>
                        <TextInput
                            value={data.project_place}
                            placeholder="Lieu du projet"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('project_place', e.target.value)}
                        ></TextInput>
                        <textarea
                            value={data.project_extract}
                            placeholder="Donner un extrait pour les vignettes du projet ici"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('project_extract', e.target.value)}
                        ></textarea>
                        <select
                            placeholder="Catégorie du projet"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={e => setData('project_category', e.target.value)}
                        >
                            <option value="hygiène">Hygiène</option>
                            <option value="education">Education</option>
                            <option value="autre">Autre</option>
                        </select>

                        {Object.keys(errors).map((errorField) => (
                            <InputError key={errorField} message={errors[errorField]} className="mt-2" />
                        ))}
                        <PrimaryButton className="mt-4 justify-center" disabled={processing}>Créer un projet</PrimaryButton>
                    </form>
                    {projects.length > 0 && projects.map(project =>
                        <div className="my-5">{project.project_title}
                            <Wysiwyg project={project} />
                        </div>)
                    }
                </div>
                <div className="p-4 sm:p-6 lg:p-8 flex flex-wrap grow gap-2">
                    {projects.length > 0 ?
                    <ul>
                        {projects.map(project =>
                            <li key={project.id} className="min-w-[350px] flex">
                                <span
                                    className="grow">Projet n°&nbsp;{project.id}&nbsp;:&nbsp;{project.project_title}</span>&nbsp;
                                <span className={`text-teal-900 hover:text-red-600`}>
                                    <Link as="button"
                                          href={route('cooking-projects.destroy', project.id)}
                                          method="delete">Supprimer</Link>
                                </span>
                            </li>
                        )}
                    </ul> : <div>Aucun projet publié</div>}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
