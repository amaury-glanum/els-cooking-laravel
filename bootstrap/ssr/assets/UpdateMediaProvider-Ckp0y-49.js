import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
const useCapitalize = (string) => {
  return string.length > 0 ? string.replace(/^\w/, (c) => c.toUpperCase()) : string;
};
const UpdateMediaProvider = ({ isActiveMedias, providerName, providerRoute, addedcss }) => {
  if (!providerRoute.getActive || !providerRoute.getReadyToUpdate) {
    return /* @__PURE__ */ jsx("div", { children: "La ressource Provider est introuvable" });
  }
  const { linkWrapper, firstLink, secondLink } = addedcss;
  const routeUrl = isActiveMedias ? { path: providerRoute.getReadyToUpdate.name, method: providerRoute.getReadyToUpdate.method } : { path: providerRoute.getActive.name, method: providerRoute.getReadyToUpdate.method };
  const unactiveRoute = isActiveMedias ? { path: providerRoute.getUnactive.name, method: providerRoute.getUnactive.method } : { path: "", method: "get" };
  const contentText = isActiveMedias ? `Mettre à jour ${useCapitalize(providerName) || ""}` : `Activer ${useCapitalize(providerName) || ""}`;
  return /* @__PURE__ */ jsxs("div", { className: `${isActiveMedias ? `${linkWrapper}` : ""}`, children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        as: "button",
        type: "button",
        className: `${firstLink} my-3 px-3 py-2 rounded`,
        href: route(routeUrl.path, providerName),
        method: routeUrl.method,
        children: contentText
      }
    ),
    isActiveMedias ? /* @__PURE__ */ jsxs(
      Link,
      {
        as: "button",
        type: "button",
        className: `${secondLink} my-3 px-3 py-2 rounded`,
        href: route(unactiveRoute.path, providerName),
        method: unactiveRoute.method,
        children: [
          "Désactiver ",
          useCapitalize(providerName) || ""
        ]
      }
    ) : null
  ] });
};
const UpdateMediaProvider$1 = UpdateMediaProvider;
export {
  UpdateMediaProvider$1 as default
};
