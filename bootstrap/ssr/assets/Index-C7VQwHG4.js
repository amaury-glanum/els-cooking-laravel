import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useState, useEffect } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-BsmVNvpl.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { T as TextInput } from "./TextInput-Dmygz_uX.js";
import "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import ProjectsList from "./ProjectsList-DPA4e6t2.js";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
import "./ProjectListItem-BPNochdM.js";
function StepperIndicators({ currentStep }) {
  const activeColor = (index) => currentStep >= index ? "bg-blue-500" : "bg-gray-300";
  const isFinalStep = (index) => index === 3 - 1;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full ${activeColor(index)}` }),
    isFinalStep(index) ? null : /* @__PURE__ */ jsx("div", { className: `w-12 h-1 ${activeColor(index)}` })
  ] }, index)) });
}
dayjs.locale("fr-FR");
dayjs.extend(relativeTime);
function Index({ projects, authors, flash, projectMedias, medias }) {
  const { auth } = usePage().props;
  console.log("projet medias", projectMedias);
  const toastId = useRef(null);
  const [editing, setEditing] = useState({ on: false, object: {} });
  useEffect(() => {
    if (!toast.isActive(toastId.current)) {
      toast(flash == null ? void 0 : flash.message);
      toast.error(flash == null ? void 0 : flash.error);
      toast.warning(flash == null ? void 0 : flash.warning);
      toast.success(flash == null ? void 0 : flash.success);
    }
  }, [flash]);
  const STEPS_TEXTS = [
    { id: 0, text: "Vignette" },
    { id: 1, text: "Contenu (I)" },
    { id: 2, text: "Contenu (II)" }
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const goToStep = (step) => setCurrentStep(step);
  const { data, setData, post, patch, processing, reset, errors } = useForm({
    user_id: auth.user.id,
    project_date: "",
    project_place: "",
    project_category: "",
    project_title: "",
    project_extract: "",
    project_teaser: "",
    project_description: "",
    project_goal: "",
    project_method: "",
    project_results: "",
    project_single_url: "",
    project_img_url: "",
    project_img_name: "",
    project_infos: {},
    project_meta: {},
    project_publish_status: ""
  });
  const submit = (e) => {
    e.preventDefault();
    try {
      post(route("cooking-projects.store"), { onSuccess: () => reset() });
    } catch (error) {
      console.log(error);
    }
  };
  const modify = (e) => {
    var _a;
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== null && value !== "")
    );
    console.log("Filtered Data:", filteredData);
    try {
      patch(route("cooking-projects.update", (_a = editing == null ? void 0 : editing.object) == null ? void 0 : _a.id), {
        data: filteredData,
        onSuccess: () => setEditing({ on: false, object: {} })
      });
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Projets" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto flex flex-wrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-[300px] p-4 sm:p-6 lg:p-8", children: [
        /* @__PURE__ */ jsxs("form", { onSubmit: editing.on ? modify : submit, className: "h-[400px] max-w-lg flex flex-col gap-5", children: [
          /* @__PURE__ */ jsx(StepperIndicators, { currentStep }),
          /* @__PURE__ */ jsx("section", { className: "w-full my-2 flex gap-10", children: STEPS_TEXTS.map((step) => /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => goToStep(step.id),
              className: `${step.id === currentStep ? "bg-green-500" : ""}  hover:opacity-60 bg-blue-600 text-white p-2 rounded-md`,
              children: step.text
            },
            step.id
          )) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: currentStep === 0 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden",
              children: [
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    value: data.project_title,
                    placeholder: editing.on ? editing.object.project_title : "Titre du nouveau projet",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_title", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    value: data.project_place,
                    placeholder: editing.on ? editing.object.project_place : "Lieu du projet",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_place", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx("label", { className: "mt-3 mb-1 text-xs text-gray-800 pl-1", children: editing.on ? `Date du projet (Actuelle: ${editing.object.project_date}) : ` : "Date du projet : " }),
                /* @__PURE__ */ jsx(
                  TextInput,
                  {
                    type: "date",
                    value: data.project_date,
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_date", e.target.value)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: currentStep === 1 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden",
              children: [
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.project_extract,
                    placeholder: "Donner un extrait pour les vignettes du projet ici",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_extract", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.project_description,
                    placeholder: "Décrivez l'objet du projet ici",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_description", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.project_goal,
                    placeholder: "Décrivez les objectifs du projet ici",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_goal", e.target.value)
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: currentStep === 2 ? "flex flex-col gap-2 h-full w-full opacity-100 transition-all duration-75 delay-75" : "hidden",
              children: [
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: data.project_results,
                    placeholder: "Parlez-nous des impacts du projet (résultats)",
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_results", e.target.value)
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.project_category,
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_category", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "hygiène", children: "Hygiène" }),
                      /* @__PURE__ */ jsx("option", { value: "education", children: "Education" }),
                      /* @__PURE__ */ jsx("option", { value: "autre", defaultValue: true, children: "Autre" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx("label", { children: " Voulez-vous créer un brouillon avant publication ? " }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: data.project_publish_status,
                    className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                    onChange: (e) => setData("project_publish_status", e.target.value),
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "published", defaultValue: true, children: "Publié" }),
                      /* @__PURE__ */ jsx("option", { value: "draft", children: "Brouillon" })
                    ]
                  }
                )
              ]
            }
          ),
          Object.keys(errors).map((errorField) => /* @__PURE__ */ jsx(InputError, { message: errors[errorField], className: "mt-2" }, errorField)),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: `mt-4 justify-center ${!editing.on && currentStep !== 2 ? "opacity-50 pointer-events-none" : "opacity-100"}`,
              disabled: processing,
              children: editing.on ? "Modifier ce projet" : "Créer un projet"
            }
          ),
          !editing.on ? /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-600", children: "Cliquez sur la dernière étape pour valider le projet." }) : null
        ] }),
        editing.on ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ jsx(
          PrimaryButton,
          {
            className: "w-full mt-4 justify-center bg-gray-500",
            onClick: () => setEditing({ on: false, object: {} }),
            children: "Annuler"
          }
        ) }) : null
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6 lg:p-8 flex flex-col flex-wrap grow gap-2", children: /* @__PURE__ */ jsx(ProjectsList, { medias, projects, projectMedias, authors, setEditing, editing }) })
    ] }),
    /* @__PURE__ */ jsx("section", {})
  ] });
}
export {
  Index as default
};
