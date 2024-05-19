import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage, Head, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import Wysiwyg from "@/Pages/CookingProjects/Partials/Wysiwyg.jsx";
import StepperIndicators from "@/Components/StepperIndicators.jsx";

export default function Index({ auth, projects }) {
    const STEPS_TEXTS = [
        { id: 0, text: "Vignette" },
        { id: 1, text: "Contenu (I)" },
        { id: 2, text: "Contenu (II)" }
    ];
    const [currentStep, setCurrentStep] = useState(0);

    const goToStep = (step) => setCurrentStep(step);

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

    const submit = (e) => {
        e.preventDefault();
        post(route('cooking-projects.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Equipe" />
            <section className="max-w-7xl mx-auto flex flex-wrap">
                <div className="min-w-[550px] p-4 sm:p-6 lg:p-8">
                    <form onSubmit={submit} className="h-[400px] max-w-lg flex flex-col gap-5">
                        <StepperIndicators currentStep={currentStep} />
                        <section className="w-full my-2 flex gap-10">
                            {STEPS_TEXTS.map((step) => (
                                <button
                                    type={"button"}
                                    key={step.id}
                                    onClick={() => goToStep(step.id)}
                                    className={`${step.id === currentStep ? "bg-green-500" : ""}  hover:opacity-60 bg-blue-600 text-white p-2 rounded-md`}
                                >
                                    {step.text}
                                </button>
                            ))}
                        </section>
                        <div
                            className={currentStep === 0 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                            <TextInput
                                value={data.project_title}
                                placeholder="Titre du projet"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_title', e.target.value)}
                            />
                            <TextInput
                                value={data.project_place}
                                placeholder="Lieu du projet"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_place', e.target.value)}
                            />
                            <TextInput
                                type="date"
                                value={data.project_date}
                                placeholder="Donner un extrait pour les vignettes du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_date', e.target.value)}
                            />
                        </div>
                        <div
                            className={currentStep === 1 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                            <textarea
                                value={data.project_goal}
                                placeholder="Donner un extrait pour les vignettes du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_goal', e.target.value)}
                            />
                            <textarea
                                value={data.project_description}
                                placeholder="Décrivez l'objet du projet ici"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_description', e.target.value)}
                            />
                            <textarea
                                value={data.project_results}
                                placeholder="Parlez-nous des impacts du projet"
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_results', e.target.value)}
                            />
                        </div>
                        <div
                            className={currentStep === 2 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden"}>
                            <select
                                value={data.project_category}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                onChange={e => setData('project_category', e.target.value)}
                            >
                                <option value="hygiène">Hygiène</option>
                                <option value="education">Education</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>
                        {Object.keys(errors).map((errorField) => (
                            <InputError key={errorField} message={errors[errorField]} className="mt-2" />
                        ))}
                        <PrimaryButton className={`mt-4 justify-center ${currentStep === 2 ? "opacity-100" : "opacity-50 pointer-events-none"}`} disabled={processing}>
                            Créer un projet
                        </PrimaryButton>
                    </form>
                </div>
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col flex-wrap grow gap-2">
                    {projects.length > 0 ?
                        <>
                        <h2> Liste des projets: </h2>
                        <ul className={`flex flex-col gap-4`}>
                            {projects.map(project =>
                                <li key={project.id} className="min-w-[350px] flex justify-between gap-2">
                                    <span className="grow">Projet n°&nbsp;{project.id}&nbsp;:&nbsp;{project.project_title}</span>&nbsp;
                                    <span className={`text-teal-900 hover:text-red-600`}>
                                        <Link as="button" href={route('cooking-projects.destroy', project.id)} method="delete">Supprimer</Link>
                                    </span>
                                </li>
                            )}
                        </ul></> :
                        <div >Aucun projet publié</div>
                    }
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
