import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
function ProjectMediasSelection({ projects, medias, setSelectedMedias, openSelectedMedias }) {
  const { auth } = usePage().props;
  const { data, setData, post, patch, processing, reset, errors } = useForm({
    user_id: auth.user.id,
    project_name: "",
    media_name: "",
    project_id: 0,
    media_id: 0
  });
  const [displayProjectSelection, setProjectSelection] = useState("");
  const submit = (e) => {
    e.preventDefault();
    try {
      post(route("cooking-medias.media-to-project"), { onSuccess: () => reset() });
    } catch (error) {
      console.log(error);
    }
  };
  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setData("project_id", projectId);
    setProjectSelection("");
    setProjectSelection((prev) => [...prev, projectId]);
  };
  const handleMediaChange = (e) => {
    const mediaId = e.target.value;
    setData("media_id", mediaId);
    setSelectedMedias([]);
    setSelectedMedias((prev) => [...prev, mediaId]);
  };
  const reinitializeSelection = () => {
    setSelectedMedias([]);
    setProjectSelection("");
  };
  return /* @__PURE__ */ jsxs("div", { className: "my-5 max-w-[300px] flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx("span", { className: "w-full flex justify-end sm:hidden", children: /* @__PURE__ */ jsxs(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "lucide lucide-square-x",
        children: [
          /* @__PURE__ */ jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "m15 9-6 6"
            }
          ),
          /* @__PURE__ */ jsx("path", { d: "m9 9 6 6" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "project-choice", children: [
        " Sélection du projet ",
        displayProjectSelection,
        " "
      ] }),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "project-choice",
          value: data.project_id,
          className: "block w-full border-gray-300\n                    focus:border-indigo-300 focus:ring focus:ring-indigo-200\n                    focus:ring-opacity-50 rounded-md shadow-sm",
          onChange: handleProjectChange,
          children: projects.map((project) => {
            return /* @__PURE__ */ jsx("option", { value: project.id, children: project.project_title }, project.id);
          })
        }
      ),
      /* @__PURE__ */ jsx("label", { htmlFor: "media-choice", children: " Sélection du media " }),
      /* @__PURE__ */ jsx(
        "select",
        {
          id: "media-choice",
          value: data.media_id,
          className: "block w-full border-gray-300\n                    focus:border-indigo-300 focus:ring focus:ring-indigo-200\n                    focus:ring-opacity-50 rounded-md shadow-sm",
          onChange: handleMediaChange,
          children: medias.map((media) => {
            return /* @__PURE__ */ jsx("option", { value: media.id, children: media.media_name }, media.id);
          })
        }
      ),
      Object.keys(errors).map((errorField) => /* @__PURE__ */ jsx(InputError, { message: errors[errorField], className: "mt-2" }, errorField)),
      /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          className: `mt-4 justify-center`,
          disabled: processing,
          children: "Valider la sélection"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      PrimaryButton,
      {
        onClick: reinitializeSelection,
        className: `mt-4 justify-center`,
        disabled: processing,
        children: "Réinitialiser la sélection"
      }
    )
  ] });
}
export {
  ProjectMediasSelection as default
};
