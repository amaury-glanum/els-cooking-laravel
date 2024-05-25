import React, { useState, useEffect } from 'react';
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function ProjectMediasSelection({projects, medias, setSelectedMedias, openSelectedMedias}) {

    const { auth } = usePage().props

    const { data, setData, post, patch, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        project_name: "",
        media_name: "",
        project_id: 0,
        media_id: 0
    });

    const submit = (e) => {
        e.preventDefault();
        try {
            post(route('cooking-medias.media-to-project'), { onSuccess: () => reset() });
        } catch(error) {
            console.log(error)
        }
    };

    const handleMediaChange = (e) => {
        const mediaId = e.target.value;
        setData('media_id', mediaId);
        setSelectedMedias([])
        setSelectedMedias(prev => [...prev, mediaId])
    };

    const reinitializeSelection = () => {
        setSelectedMedias([])
    }

    return(
        <div className={"my-5 max-w-[300px] flex flex-col gap-2"}>
            <span className={"w-full flex justify-end sm:hidden"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-square-x">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path
                    d="m15 9-6 6"/><path d="m9 9 6 6"/>
                </svg>
            </span>
            <form onSubmit={submit} className="flex flex-col gap-5">
                <label htmlFor='project-choice'> Sélection du projet </label>
                <select
                    id='project-choice'
                    value={data.project_id}
                    className="block w-full border-gray-300
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200
                    focus:ring-opacity-50 rounded-md shadow-sm"
                    onChange={e => setData('project_id', e.target.value)}
                >
                    {projects.map(project => {
                        return (<option key={project.id} value={project.id}>{project.project_title}</option>)
                    })}
                </select>
                <label htmlFor='project-choice'> Sélection du media </label>
                <select
                    id='media-choice'
                    value={data.media_id}
                    className="block w-full border-gray-300
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200
                    focus:ring-opacity-50 rounded-md shadow-sm"
                    onChange={handleMediaChange}
                >
                    {/* TODO: filter media by media_category*/}
                    {medias.map(media => {
                        return (<option key={media.id} value={media.id}>{media.media_name}</option>)
                    })}
                </select>
                {Object.keys(errors).map((errorField) => (
                    <InputError key={errorField} message={errors[errorField]} className="mt-2"/>
                ))}
                <PrimaryButton
                    className={`mt-4 justify-center`}
                    disabled={processing}>
                    Valider la sélection
                </PrimaryButton>
            </form>
            <PrimaryButton
                onClick={reinitializeSelection}
                className={`mt-4 justify-center`}
                disabled={processing}>
                Réinitialiser la sélection
            </PrimaryButton>
        </div>
    )
}
