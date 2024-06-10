import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
function ProjectListItem({ project, authors, setEditing, editing, projectMedias, medias }) {
  const { auth } = usePage().props;
  console.log(medias);
  const [authorProject, setAuthorProject] = useState([]);
  useEffect(() => {
    const filteredAuthors = authors.filter((author) => author.user.id === project.user_id);
    if (filteredAuthors.length > 0) {
      filteredAuthors.map((filteredAuthor) => {
        if (filteredAuthor.id === project.id) {
          setAuthorProject(filteredAuthor);
        }
      });
    }
  }, [authors, auth.user.id]);
  const storage = "storage/uploads/";
  if (!authorProject) {
    return /* @__PURE__ */ jsx("li", { className: "text-center text-orange-700", children: "Il n'y a pas encore de projets à montrer" });
  }
  const { created_at, project_publish_status, user } = authorProject;
  const createdFrom = dayjs(created_at).fromNow();
  const projectCreator = (user == null ? void 0 : user.name.charAt(0).toUpperCase()) + (user == null ? void 0 : user.name.slice(1));
  return /* @__PURE__ */ jsxs("li", { className: "flex flex-col gap-1", children: [
    /* @__PURE__ */ jsxs("div", { className: "grow min-w-[350px] flex justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("span", { className: "grow", children: [
        "Projet n° ",
        project.id,
        " : ",
        project.project_title
      ] }),
      " ",
      auth.user.id === project.user_id ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("span", { className: `cursor-pointer ${editing ? "text-orange-700" : "text-blue-950"}`, onClick: () => setEditing({ on: true, object: project }), children: /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "16",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "lucide lucide-pencil",
            children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  d: "m15 5 4 4"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: `text-teal-900 hover:text-red-600`, children: /* @__PURE__ */ jsx(
          Link,
          {
            as: "button",
            href: route("cooking-projects.destroy", project.id),
            method: "delete",
            children: "Supprimer"
          }
        ) }),
        /* @__PURE__ */ jsx("span", { className: "text-blue-500 hover:text-green-600", children: project_publish_status !== "published" ? /* @__PURE__ */ jsx(
          Link,
          {
            as: "button",
            href: route("cooking-projects.publish", project.id),
            method: "patch",
            children: "Publier "
          }
        ) : /* @__PURE__ */ jsx(
          Link,
          {
            as: "button",
            href: route("cooking-projects.draft", project.id),
            method: "patch",
            children: "Dépublier "
          }
        ) })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxs(
      "span",
      {
        className: "text-xs text-gray-500",
        children: [
          "Créé par ",
          projectCreator,
          ", ",
          createdFrom,
          " (",
          project_publish_status === "published" ? "Publié" : "Brouillon",
          "). "
        ]
      }
    ),
    (projectMedias == null ? void 0 : projectMedias.length) > 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-row flex-wrap gap-3", children: projectMedias.filter((projectMedia) => projectMedia.projects_id === project.id).map(
      (projectMedia) => {
        return /* @__PURE__ */ jsx("div", { children: medias.filter((media) => media.id === projectMedia.medias_id).map((media) => {
          return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "max-w-[50px]", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "w-full object-contain aspect-square",
              src: storage + media.media_provider_id + "." + media.media_provider_ext,
              alt: ""
            }
          ) }) });
        }) }, projectMedia.id);
      }
    ) }) : /* @__PURE__ */ jsx("div", { children: "Aucun média associé" })
  ] });
}
export {
  ProjectListItem as default
};
