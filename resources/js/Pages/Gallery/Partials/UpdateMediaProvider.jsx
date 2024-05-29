import React from 'react';
import {Link, router} from '@inertiajs/react';
import { useCapitalize } from "@/utils/stringManipulation.js";

const UpdateMediaProvider = ({ isActiveMedias, providerName, providerRoute, addedcss }) => {



    if(!providerRoute.getActive || !providerRoute.getReadyToUpdate) {
        return (<div>La ressource Provider est introuvable</div>)
    }
    const { linkWrapper, firstLink, secondLink } = addedcss
    const routeUrl = isActiveMedias ?
        { path: providerRoute.getReadyToUpdate.name, method : providerRoute.getReadyToUpdate.method } :
        { path: providerRoute.getActive.name, method: providerRoute.getReadyToUpdate.method };

    const unactiveRoute = isActiveMedias ?
        {path: providerRoute.getUnactive.name, method: providerRoute.getUnactive.method } :
        {path: "", method: "get"}

    const contentText = isActiveMedias ? `Mettre à jour ${useCapitalize(providerName) || ""}` : `Activer ${useCapitalize(providerName) || ""}`

    return (
        <div className={`${isActiveMedias  ? `${linkWrapper}` : ""}`}>
        <Link  as="button" type={"button"} className={`${firstLink} my-3 px-3 py-2 rounded`}
                       href={route(routeUrl.path, providerName)} method={routeUrl.method} >
                    {contentText}
                </Link>
    {isActiveMedias ? (
        <Link  as="button" type={"button"} className={`${secondLink} my-3 px-3 py-2 rounded`}
               href={route(unactiveRoute.path,  providerName)} method={unactiveRoute.method} >
            Désactiver {useCapitalize(providerName) || ""}
        </Link>
    ): null}
        </div>
    );
};

export default UpdateMediaProvider;






