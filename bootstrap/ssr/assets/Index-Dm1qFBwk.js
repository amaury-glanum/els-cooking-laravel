import { jsxs, jsx } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { A as Authenticated, N as NavLink } from "./AuthenticatedLayout-BsmVNvpl.js";
import { Head } from "@inertiajs/react";
import ProviderImg from "./ProviderImg-BUv_yeUC.js";
import UpdateMediaProvider from "./UpdateMediaProvider-Ckp0y-49.js";
import { toast } from "react-toastify";
import ProjectMediasSelection from "./ProjectMediasSelection-DfuiAPlH.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
import "@cloudinary/url-gen/actions/resize";
import "@cloudinary/url-gen/qualifiers/gravity";
import "@cloudinary/react";
import "@cloudinary/url-gen/actions/roundCorners";
import "@cloudinary/url-gen";
import "./InputError-cRVTeK4i.js";
function Gallery({ auth, medias, members, projects, authors, flash, providers, providersUrls }) {
  const toastId = useRef(null);
  const [selectedMedias, setSelectedMedias] = useState([]);
  const [openSelectedMedias, setOpenSelectedMedias] = useState(false);
  let selectedProviders = [];
  let providerRoute;
  providers.map(
    (provider) => {
      providerRoute = {
        getActive: { name: `cooking-medias.get-provider`, method: "get", header: "" },
        getReadyToUpdate: { name: `cooking-medias.get-provider`, method: "get", header: "" },
        getUnactive: { name: `cooking-medias.down-provider`, method: "get", header: "" }
      };
      selectedProviders = [...selectedProviders, {
        provider,
        url: providersUrls[`${provider}`],
        isActiveProvider: medias.some((media) => media.media_provider === provider),
        route: providerRoute
      }];
    }
  );
  const handleOpenSelectedMedia = () => {
    if (openSelectedMedias) {
      setOpenSelectedMedias(false);
    } else {
      setOpenSelectedMedias(true);
    }
  };
  console.log("selected media", selectedMedias);
  useEffect(() => {
    if (!toast.isActive(toastId.current)) {
      toast(flash == null ? void 0 : flash.message);
      toast.error(flash == null ? void 0 : flash.error);
      toast.warning(flash == null ? void 0 : flash.warning);
      toast.success(flash == null ? void 0 : flash.success);
    }
  }, [flash]);
  console.log("gallery - members", members);
  console.log("gallery - projects", projects);
  console.log("gallery - authors", authors);
  console.log("gallery - medias", medias);
  console.log("media selected", selectedMedias);
  const folders = [
    { id: 1, name: "elstogo" }
  ];
  const getFolderName = (url) => {
    try {
      const parts = url.split("/");
      return parts.length > 1 ? parts[0] : url;
    } catch (error) {
      console.error(error);
      return "";
    }
  };
  const addedcss = {
    linkWrapper: "flex gap-2 max-sm:justify-center",
    firstLink: "bg-green-600 hover:bg-green-200 active:bg-red-800",
    secondLink: "bg-gray-600 hover:bg-red-200 active:bg-red-800"
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Mes médias" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Els-cooking - Gallerie de médias" }),
        /* @__PURE__ */ jsxs("div", { className: "w-full my-12 flex flex-col min-h-100", children: [
          /* @__PURE__ */ jsx("section", { className: `w-full mx-auto sm:px-6 lg:px-8 ${openSelectedMedias ? "max-sm:block" : "max-sm:hidden"}`, children: /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "px-6 pt-4 text-gray-900", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold my-2", children: [
                "Bienvenue ",
                auth.username,
                " "
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-lg my-2", children: " Ceci est votre galerie d'images: nous vous expliquons la démarche pour allouer une image à vos projets." })
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "px-6 pb-4 text-gray-900", children: [
              /* @__PURE__ */ jsx("p", { className: "py-3 text-sm text-gray-500 font-bold underline", children: "Etapes à suivre : " }),
              /* @__PURE__ */ jsxs("li", { className: "text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bold",
                    children: "Etape 1 :"
                  }
                ),
                " Sélectionner et activer un provider d'images."
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bold",
                    children: "Etape 2 :"
                  }
                ),
                " Vérifier que les images voulues s'affichent."
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bold",
                    children: "Etape 3 :"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "max-sm:hidden", children: " Rendez-vous sur le formulaire à gauche." }),
                /* @__PURE__ */ jsx("span", { className: "sm:hidden", children: 'CLiquer sur "Allouer mes médias".' })
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bold",
                    children: "Etape 4 :"
                  }
                ),
                " Utiliser le formulaire pour allouer un média à un objet (projets etc.) et, si besoin est, son emplacement."
              ] }),
              /* @__PURE__ */ jsxs("li", { className: "text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bold",
                    children: "Etape 5 :"
                  }
                ),
                " Valider la sélection du média : il sera affiché sur le site aprés publication de l'objet (projets etc.)."
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("section", { className: "w-full flex justify-center items-center my-5 sm:hidden", children: /* @__PURE__ */ jsx(PrimaryButton, { type: "button", onClick: handleOpenSelectedMedia, children: openSelectedMedias ? "Allouer mes médias" : "Fermer le panneau" }) }),
          /* @__PURE__ */ jsx("section", { className: "my-3 w-full mx-auto sm:px-6 lg:px-8", children: selectedProviders.length > 0 ? selectedProviders.filter((store) => store.route.getActive && store.route.getReadyToUpdate && store.route.getActive.name && store.route.getReadyToUpdate.name && store.route.getReadyToUpdate.method && store.provider).map((store, index) => {
            return /* @__PURE__ */ jsx(
              UpdateMediaProvider,
              {
                isActiveMedias: store.isActiveProvider,
                providerRoute: store.route,
                providerName: store.provider,
                addedcss
              },
              index.toString() + "--" + store.provider
            );
          }) : null }),
          medias.length > 0 ? /* @__PURE__ */ jsxs("section", { className: "w-full my-5 mx-auto sm:px-6 lg:px-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl text-blue-950 font-bold", children: "Images Cloudinary" }),
            /* @__PURE__ */ jsxs("section", { className: "py-5 w-full flex flex-col gap-1", children: [
              /* @__PURE__ */ jsx("p", { className: "max-w-[1000px] text-md text-gray-600 font-bold italic", children: "Ces images reflètent celles présentent dans votre espace de cloud ou localement. Elles sont maintenant disponibles pour être utilisées dans vos création de els-cooking." }),
              selectedProviders.map((provider) => {
                return /* @__PURE__ */ jsxs(
                  "a",
                  {
                    title: `aller dans mon espace ${provider.provider}`,
                    href: `${provider.url}`,
                    className: "text-md text-green-600 italic hover:text-orange-700 font-semibold",
                    children: [
                      "Se rendre dans mon espace ",
                      provider.provider
                    ]
                  }
                );
              })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "my-5 flex flex-col sm:flex-row gap-5", children: [
              /* @__PURE__ */ jsx("aside", { className: `sm:min-w-[250px] max-w-[400px] max-h-[600px]
                                        ${openSelectedMedias ? "max-sm:hidden" : "max-sm:block z-100"}
                                        rounded-xl bg-white z-40 px-3 sm:px-6 lg:px-8`, children: /* @__PURE__ */ jsx("div", { className: "h-full flex flex-col justify-center items-center", children: projects.length > 0 && medias.length > 0 ? /* @__PURE__ */ jsx(
                ProjectMediasSelection,
                {
                  openSelectedMedias,
                  projects,
                  medias,
                  setSelectedMedias,
                  selectedMedias
                }
              ) : /* @__PURE__ */ jsxs("div", { className: "p-4 h-full flex flex-col items-center justify-center", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-primary-dark text-center text-bold text-lg my-5", children: "Aucun projet disponible" }),
                /* @__PURE__ */ jsx("p", { className: "text-center text-bold text-md text-gray-500", children: "Vous devez créer des projets pour leur allouer des médias." }),
                /* @__PURE__ */ jsx(
                  NavLink,
                  {
                    className: "my-5 text-center text-tertiary-600 hover:text-tertiary-950",
                    href: route("cooking-projects.index"),
                    active: route().current("cooking-projects.index"),
                    children: "Créer un projet"
                  }
                )
              ] }) }) }),
              /* @__PURE__ */ jsxs("section", { className: `grow flex flex-col gap-4`, children: [
                folders.map((folder) => /* @__PURE__ */ jsxs("article", { children: [
                  /* @__PURE__ */ jsx("h3", { className: "mb-5 text-lg font-bold text-primary-dark", children: "Images non-classées:" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-5", children: medias.filter((media) => getFolderName(media.media_provider_id) !== folder.name).map((media) => /* @__PURE__ */ jsx(
                    ProviderImg,
                    {
                      media,
                      selectedMedias
                    },
                    media.id
                  )) })
                ] })),
                folders.map((folder) => /* @__PURE__ */ jsxs("article", { children: [
                  medias.some((media) => folder.name === getFolderName(media.media_provider_id)) ? /* @__PURE__ */ jsxs("h3", { className: "mb-5 text-lg font-bold text-primary-dark", children: [
                    "Dossier ",
                    folder.name,
                    " ",
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "text-tertiary-700",
                        children: folder.name
                      }
                    )
                  ] }) : null,
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-5", children: medias.filter((media) => getFolderName(media.media_provider_id) === folder.name).map((media) => /* @__PURE__ */ jsx(
                    ProviderImg,
                    {
                      media,
                      selectedMedias
                    },
                    media.id
                  )) })
                ] }, folder.id))
              ] })
            ] })
          ] }) : null
        ] })
      ]
    }
  );
}
export {
  Gallery as default
};
