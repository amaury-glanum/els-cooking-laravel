import {Link} from "@inertiajs/react";
import React from "react";
import dayjs from "dayjs";
import ProjectListItem from "@/Pages/CookingProjects/Partials/ProjectListItem.jsx";


export default function ProjectsList({auth, projects, authors, setEditing, editing}) {

    return (
        <div className={`bg-gray-100 rounded p-5`}>
            <h2> {projects.length > 0 ? 'Liste des projets :' : 'Aucun projet en cours' }</h2>
            {projects.length > 0 ?
                <>
                    <ul className={`mt-5 flex flex-col gap-4`}>
                        {projects.map(project =>
                            <ProjectListItem key={project.id} auth={auth} project={project} authors={authors} setEditing={setEditing} editing={editing}/>
                            )}
                    </ul>
                </> :null}
        </div>
    )
}
