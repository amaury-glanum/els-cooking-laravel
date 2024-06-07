import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { D as Dropdown, A as Authenticated } from "./AuthenticatedLayout-BsmVNvpl.js";
import { I as InputError } from "./InputError-cRVTeK4i.js";
import { P as PrimaryButton } from "./PrimaryButton-C-TDjBGq.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import "./ApplicationLogo-VXSMMN2A.js";
import "@headlessui/react";
dayjs.extend(relativeTime);
function Chirp({ chirp }) {
  const { auth } = usePage().props;
  const [editing, setEditing] = useState(false);
  const { data, setData, patch, clearErrors, reset, errors } = useForm({
    message: chirp.message
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("chirps.update", chirp.id), { onSuccess: () => setEditing(false) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 flex space-x-2", children: [
    /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-gray-600 -scale-x-100", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: chirp.user.name }),
          /* @__PURE__ */ jsx("small", { className: "ml-2 text-sm text-gray-600", children: dayjs(chirp.created_at).fromNow() }),
          chirp.created_at !== chirp.updated_at && /* @__PURE__ */ jsx("small", { className: "text-sm text-gray-600", children: " · edited" })
        ] }),
        chirp.user.id === auth.user.id && /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 text-gray-400", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" }) }) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx("button", { className: "block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out", onClick: () => setEditing(true), children: "Edit" }),
            /* @__PURE__ */ jsx(Dropdown.Link, { as: "button", href: route("chirps.destroy", chirp.id), method: "delete", children: "Delete" })
          ] })
        ] })
      ] }),
      editing ? /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsx("textarea", { value: data.message, onChange: (e) => setData("message", e.target.value), className: "mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" }),
        /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-2" }),
        /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
          /* @__PURE__ */ jsx(PrimaryButton, { className: "mt-4", children: "Save" }),
          /* @__PURE__ */ jsx("button", { className: "mt-4", onClick: () => {
            setEditing(false);
            reset();
            clearErrors();
          }, children: "Cancel" })
        ] })
      ] }) : /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-900", children: chirp.message })
    ] })
  ] });
}
function Index({ auth, chirps }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    message: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("chirps.store"), { onSuccess: () => reset() });
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Chirps" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: data.message,
            placeholder: "What's on your mind?",
            className: "block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm",
            onChange: (e) => setData("message", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.message, className: "mt-2" }),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "mt-4", disabled: processing, children: "Chirp" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 bg-white shadow-sm rounded-lg divide-y", children: chirps.map(
        (chirp) => /* @__PURE__ */ jsx(Chirp, { chirp }, chirp.id)
      ) })
    ] })
  ] });
}
export {
  Index as default
};
