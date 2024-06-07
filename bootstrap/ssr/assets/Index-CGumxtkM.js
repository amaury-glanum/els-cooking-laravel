import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { D as Dropdown, A as Authenticated } from "./AuthenticatedLayout-BsmVNvpl.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { T as TextInput } from "./TextInput-Dmygz_uX.js";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
dayjs.locale("fr-FR");
dayjs.extend(relativeTime);
function TeamMember({ member, authors }) {
  const [editing, setEditing] = useState("");
  const { auth } = usePage().props;
  const cardAuthor = authors[0].user.name.charAt(0).toUpperCase() + authors[0].user.name.slice(1);
  const { id, user_id, prenom, nom, email, presentation, role, created_at, updated_at } = member;
  const { data, setData, patch, clearErrors, reset, errors } = useForm({
    nom: member.nom,
    prenom: member.prenom,
    role: member.role,
    email: member.email
  });
  const submit = (e) => {
    e.preventDefault();
    try {
      patch(route("cooking-team.update", id), { onSuccess: () => setEditing(false) });
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-w-[300px] bg-gray-100 border rounded-md border-gray-600 p-6 flex space-x-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-between gap-2", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "lucide lucide-circle-user", children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" }),
      /* @__PURE__ */ jsx("path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 h-full flex justify-between items-center gap-5", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex justify-between gap-2`, children: [
        /* @__PURE__ */ jsxs("small", { className: "ml-2 text-sm text-gray-600", children: [
          " Créé ",
          dayjs(created_at).fromNow()
        ] }),
        /* @__PURE__ */ jsx("div", { className: "", children: auth.user.id === user_id && /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-4 w-4 text-gray-400",
              viewBox: "0 0 20 20",
              fill: "currentColor",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                }
              )
            }
          ) }) }),
          /* @__PURE__ */ jsx(Dropdown.Content, { children: /* @__PURE__ */ jsx(
            Dropdown.Link,
            {
              as: "button",
              href: route("cooking-team.destroy", id),
              method: "delete",
              children: "Supprimer"
            }
          ) })
        ] }) })
      ] }),
      editing ? /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: `${editing}`,
            onChange: (e) => setData(`${editing}`, e.target.value),
            className: `mt-4 w-full text-gray-900 border-gray-300
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "flex-grow mt-4 flex flex-col items-center bg-red-500",
              children: "Valider"
            }
          ),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              className: "flex-grow mt-4 flex flex-col items-center bg-green-800",
              onClick: () => {
                setEditing(false);
                reset();
                clearErrors();
              },
              children: "Annuler"
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "h-full w-full flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "cursor-pointer text-gray-600", children: [
              "Nom: ",
              nom
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "cursor-pointer text-green-700",
                onClick: () => setEditing("nom"),
                children: "Editer"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "cursor-pointer text-gray-600", children: [
              "Prénom: ",
              prenom
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "cursor-pointer text-green-700",
                onClick: () => setEditing("prenom"),
                children: "Editer"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "cursor-pointer text-gray-600", children: [
              "Email: ",
              email
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "cursor-pointer text-green-700",
                onClick: () => setEditing("email"),
                children: "Editer"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-gray-600 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "cursor-pointer text-gray-600", children: [
              "Fonction: ",
              role
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "cursor-pointer text-green-700",
                onClick: () => setEditing("role"),
                children: "Editer"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "col-start-1 text-gray-600", children: [
            "Id Membre : ",
            id,
            " "
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "col-start-2 text-gray-600", children: [
            "Auteur : ",
            cardAuthor,
            " "
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function Index({ auth, members, authors }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    user_id: auth.user.id,
    prenom: "",
    nom: "",
    email: "",
    presentation: "",
    role: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("cooking-team.store"), { onSuccess: () => reset() });
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Equipe" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-7xl mx-auto flex flex-wrap", children: [
      /* @__PURE__ */ jsx("div", { className: "min-w-[550px] p-4 sm:p-6 lg:p-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "max-w-lg flex flex-col gap-5", children: [
        /* @__PURE__ */ jsx(
          TextInput,
          {
            value: data.prenom,
            placeholder: "Prénom du membre",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("prenom", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            value: data.nom,
            placeholder: "Nom du membre",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("nom", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            value: data.email,
            placeholder: "Email associatif du membre",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            value: data.role,
            placeholder: "Ecrivez ici la fonction officiel du membre",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("role", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.presentation,
            placeholder: "Ecrivez ici un court texte pour présenter le membre",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("presentation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-2" }),
        Object.keys(errors).map((errorField) => /* @__PURE__ */ jsx(InputError, { message: errors[errorField], className: "mt-2" }, errorField)),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "mt-4 justify-center", disabled: processing, children: "Créer un membre" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-6 lg:p-8 flex flex-wrap grow gap-2", children: members.map((member) => /* @__PURE__ */ jsx(TeamMember, { member, authors }, member.id)) })
    ] })
  ] });
}
export {
  Index as default
};
