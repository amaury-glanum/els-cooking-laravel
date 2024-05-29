import {Link} from "@inertiajs/react";
import React, {useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import NavLink from "@/Components/NavLink.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";


export default function ProjectListItem({ project, authors, setEditing, editing, projectMedias, medias}){

    const { auth } = usePage().props
    console.log(medias);
    // const [authorProjects, setAuthorProjects] = useState([]);
    const [authorProject, setAuthorProject] = useState([]);

    useEffect(() => {
        const filteredAuthors = authors.filter(author => author.user.id === project.user_id)
        if (filteredAuthors.length > 0) {
            filteredAuthors.map(filteredAuthor => {
                // setAuthorProjects(prev => [...prev, filteredAuthor]);
                if(filteredAuthor.id === project.id) {
                    setAuthorProject(filteredAuthor);
                }
            })
        }
    }, [authors, auth.user.id]);

    const storage = "storage/uploads/"

    if (!authorProject) {
        return <li className={"text-center text-orange-700"}>Il n'y a pas encore de projets à montrer</li> // or a loading indicator
    }

    const { created_at, project_publish_status, user } = authorProject
    const createdFrom = dayjs(created_at).fromNow();
    const projectCreator = user?.name.charAt(0).toUpperCase() + user?.name.slice(1);

    return (
        <li className="flex flex-col gap-1">
                    <div className="grow min-w-[350px] flex justify-between gap-2">
                        <span className="grow">Projet n°&nbsp;{project.id}&nbsp;:&nbsp;{project.project_title}</span>&nbsp;
                        {auth.user.id === project.user_id ?
                            (<>
                                <span className={`cursor-pointer ${editing ? 'text-orange-700': 'text-blue-950'}`} onClick={() => setEditing({on: true, object: project })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round" className="lucide lucide-pencil"><path
                                        d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path
                                        d="m15 5 4 4"/></svg>
                                </span>
                                <span className={`text-teal-900 hover:text-red-600`}>
                            <Link as="button" href={route('cooking-projects.destroy', project.id)}
                                  method="delete">Supprimer</Link>
                            </span>

                                <span className={"text-blue-500 hover:text-green-600"}>
                            {project_publish_status !== 'published' ?
                                (<Link as="button" href={route('cooking-projects.publish', project.id)}
                                       method="patch">Publier </Link>) :
                                (<Link as="button" href={route('cooking-projects.draft', project.id)}
                                       method="patch">Dépublier </Link>)
                            }
                        </span></>) : null}
                    </div>
                    <span
                        className="text-xs text-gray-500">Créé par {projectCreator}, {createdFrom} ({project_publish_status === 'published' ? 'Publié' : 'Brouillon'}). </span>
            {projectMedias?.length > 0 ?
                (<div className={"flex flex-row flex-wrap gap-3"}>
                    {projectMedias.filter(projectMedia => projectMedia.projects_id === project.id).map(
                        projectMedia => {
                            return <div key={projectMedia.id}>{
                                medias.filter(media => media.id === projectMedia.medias_id).map(media => {
                                    return (<>
                                        <div className={"max-w-[50px]"}>
                                           <img className="w-full object-contain aspect-square"
                                                src={storage+media.media_provider_id+'.'+media.media_provider_ext} alt={''} />
                                        </div>
                                    </>)
                                })
                            }</div>
                        }
                    )}
                </div>) : <div>Aucun média associé</div>}
        </li>
    )
}
