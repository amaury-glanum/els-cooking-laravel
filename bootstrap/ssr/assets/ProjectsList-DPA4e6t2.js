import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "@inertiajs/react";
import "react";
import "dayjs";
import ProjectListItem from "./ProjectListItem-BPNochdM.js";
function ProjectsList({ projects, authors, setEditing, editing, projectMedias, medias }) {
  return /* @__PURE__ */ jsxs("div", { className: `bg-gray-100 rounded p-5`, children: [
    /* @__PURE__ */ jsxs("h2", { children: [
      " ",
      projects.length > 0 ? "Liste des projets :" : "Aucun projet en cours"
    ] }),
    projects.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("ul", { className: `mt-5 flex flex-col gap-4`, children: projects.map(
      (project) => /* @__PURE__ */ jsx(
        ProjectListItem,
        {
          projectMedias,
          project,
          medias,
          authors,
          setEditing,
          editing
        },
        project.id
      )
    ) }) }) : null
  ] });
}
export {
  ProjectsList as default
};
