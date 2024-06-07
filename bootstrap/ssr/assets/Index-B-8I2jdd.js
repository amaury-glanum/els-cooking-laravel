import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { D as Dropdown, A as Authenticated } from "./AuthenticatedLayout-BsmVNvpl.js";
import dayjs from "dayjs";
import "dayjs/locale/fr.js";
import { usePage, useForm, Head, Link } from "@inertiajs/react";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
dayjs.locale("fr-FR");
dayjs.extend(relativeTime);
function Card({ addedcss = "", image, actions, user_id, children, created_at = null }) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs("div", { className: `${addedcss} bg-gray-100 border rounded-md border-gray-600 p-6 flex space-x-2`, children: [
    image ? /* @__PURE__ */ jsx("div", { className: "flex justify-between gap-2", children: image }) : null,
    /* @__PURE__ */ jsx("div", { className: "flex-1 h-full flex justify-between items-center gap-5", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex justify-between gap-2`, children: [
        created_at !== null ? /* @__PURE__ */ jsxs("small", { className: "ml-2 text-sm text-gray-600", children: [
          " Créé ",
          dayjs(created_at).fromNow()
        ] }) : null,
        /* @__PURE__ */ jsx("div", { className: "", children: auth.user.id === user_id && actions.length > 0 ? /* @__PURE__ */ jsxs(Dropdown, { children: [
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
          /* @__PURE__ */ jsx(Dropdown.Content, { children: actions.filter((action) => action.id && action.itemId && action.actionPath && action.pathName && action.method && (action.ui === "button" || "") && action.actionText).map((action) => {
            return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              Dropdown.Link,
              {
                type: action.ui,
                as: action.ui,
                method: action.method,
                href: action.pathName === "enable" ? route(`${action == null ? void 0 : action.actionPath}`, action.itemId) : `${action.actionPath}`,
                children: action.actionText
              },
              action.id
            ) });
          }) })
        ] }) : null })
      ] }),
      children
    ] }) })
  ] });
}
const CardContent = ({ submit = null, editing = null, setEditing = null, setData = null, reset = null, clearErrors = null, children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: editing && submit && reset && clearErrors ? /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
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
      /* @__PURE__ */ jsx(PrimaryButton, { className: "flex-grow mt-4 flex flex-col items-center bg-red-500", children: "Valider" }),
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
  ] }) : /* @__PURE__ */ jsx("div", { className: "h-full w-full flex flex-col justify-between", children: /* @__PURE__ */ jsx("div", { className: "mt-5 w-full flex flex-col gap-2", children: /* @__PURE__ */ jsx("div", { children }) }) }) });
};
const CardContent$1 = CardContent;
function Index(props) {
  const { files, auth } = usePage().props;
  const [editing, setEditing] = useState(false);
  const { data, setData, reset, clearErrors, errors, post, progress } = useForm({
    title: "",
    file: null
  });
  function handleSubmit(e) {
    e.preventDefault();
    post(route("file.upload.store"));
    setData("title", "");
    setData("file", null);
  }
  const submit = (e) => {
    console.log("submit");
  };
  console.log(files);
  return /* @__PURE__ */ jsxs(Authenticated, { user: props.auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Posts" }),
    /* @__PURE__ */ jsx("div", { className: "w-full mt-12 flex flex-col min-h-100", children: /* @__PURE__ */ jsx(
      "section",
      {
        className: `w-full mx-auto sm:px-6 lg:px-8`,
        children: /* @__PURE__ */ jsx("div", { className: "py-5 bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "px-6 pt-4 text-gray-900", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold my-2", children: [
            "Bienvenue ",
            auth.username,
            " "
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg my-2", children: " Ceci est votre espace de gestion des fichiers locaux." })
        ] }) })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white border-b border-gray-200", children: [
      /* @__PURE__ */ jsxs("form", { name: "createForm", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "text-md text-secondary", children: "Titre du fichier" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                className: "my-3 py-2 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
                name: "title",
                value: data.title,
                placeholder: "Ecrivez ici le nom du fichier",
                onChange: (e) => setData("title", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-red-600", children: errors.title })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-0", children: [
            /* @__PURE__ */ jsx("label", { className: "", children: "Sauvegarde du fichier dans l'espace locale :" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                className: "w-full py-2 cursor-pointer",
                name: "file",
                title: "Sauvegarder un fichier",
                onChange: (e) => setData("file", e.target.files[0])
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-red-600", children: errors.file })
          ] })
        ] }),
        progress && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full", children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full",
            width: progress.percentage,
            children: [
              " ",
              progress.percentage,
              "%"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "px-6 py-2 font-bold text-white bg-green-500 rounded",
            children: "Sauvegarder le fichier"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-5 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg text-primary-dark", children: " Liste des fichiers utilisant l'espace de stockage interne : " }),
        /* @__PURE__ */ jsx("p", { className: "text-md text-secondary-700", children: " Pour être alloués à des élèments (projets, membres ...), vous devez vous rendre dans la Galerie et activer le service local de stockage." })
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "max-sm:hidden table-fixed w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 w-20", children: "No." }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Title" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Image" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          files.map(({ id, title, name, url }) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: id }),
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: title }),
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: /* @__PURE__ */ jsx(
              "img",
              {
                className: "mx-auto aspect-square object-contain",
                src: url,
                alt: title,
                width: "100px"
              }
            ) }),
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: /* @__PURE__ */ jsx(
              Link,
              {
                className: "px-2 py-3 rounded-lg bg-red-400 hover:bg-red-600 flex flex-col items-center justify-center",
                href: route("file.destroy", id),
                method: "delete",
                children: "Supprimer"
              }
            ) })
          ] }, id)),
          files.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "Aucun fichier n'a été trouvé" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "max-sm:flex wrap gap-2 hidden", children: files.map(({ id, title, name, url }, index) => {
        const actions = [
          { id, itemId: 5, actionPath: "file.destroy", pathName: "enable", method: "delete", actionText: `Supprimer ${title}`, ui: "button" }
        ];
        return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          Card,
          {
            addedcss: "max-w-",
            actions,
            created_at: "12-05-2004",
            auth: props.auth,
            user_id: props.auth.user.id,
            children: /* @__PURE__ */ jsx(
              CardContent$1,
              {
                submit,
                setData,
                setEditing,
                editing,
                reset,
                clearErrors,
                children: /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("span", { className: "text-gray-600 flex justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "cursor-pointer text-gray-600",
                      children: [
                        "Nom: ",
                        title
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "cursor-pointer text-green-700",
                      onClick: () => setEditing(title),
                      children: "Editer"
                    }
                  )
                ] }) })
              }
            )
          }
        ) }, id);
      }) }),
      /* @__PURE__ */ jsx("h1", { children: "Uploaded File List:" }),
      /* @__PURE__ */ jsxs("table", { className: "table-fixed w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-100", children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2 w-20", children: "Id" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Titre" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Image" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-2", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxs("tbody", { children: [
          files.map(({ id, title, name, url }) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: id }),
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: title }),
            /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: /* @__PURE__ */ jsx("img", { src: url, alt: title, width: "200px" }) }),
            /* @__PURE__ */ jsxs("td", { children: [
              /* @__PURE__ */ jsx("div", { className: `text-teal-900 hover:text-red-600`, children: /* @__PURE__ */ jsx(
                Link,
                {
                  as: "button",
                  href: route("file.destroy", id),
                  method: "delete",
                  children: "Supprimer"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: `text-teal-900 hover:text-blue-600`, children: /* @__PURE__ */ jsx(
                Link,
                {
                  as: "button",
                  href: route("file.download", id),
                  method: "get",
                  children: "Télécharger"
                }
              ) })
            ] })
          ] })),
          files.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { className: "px-6 py-4 border-t", colSpan: "4", children: "No contacts found." }) })
        ] })
      ] })
    ] }) }) }) })
  ] });
}
export {
  Index as default
};
