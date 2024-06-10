
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { forwardRef, useRef, useEffect, createContext, useState, useContext, Fragment as Fragment$1 } from "react";
import { Link, useForm, Head, usePage, createInertiaApp } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { Editor } from "@tinymce/tinymce-react";
import "dayjs/locale/fr.js";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
import { createRoot } from "react-dom/client";
function ApplicationLogo(props) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ...props,
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "lucide lucide-chef-hat",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M6 17h12" })
      ]
    }
  );
}
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-20 h-20 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
function InputError({ message, className = "", ...props }) {
  return message ? /* @__PURE__ */ jsx("p", { ...props, className: "text-sm text-red-600 " + className, children: message }) : null;
}
function InputLabel({ value, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx("label", { ...props, className: `block font-medium text-sm text-gray-700 ` + className, children: value ? value : children });
}
function PrimaryButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type,
      className: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " + className,
      ref: input
    }
  );
});
function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: ""
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.confirm"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Confirm Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "This is a secure area of the application. Please confirm your password before continuing." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Confirm" }) })
    ] })
  ] });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ConfirmPassword
}, Symbol.toStringTag, { value: "Module" }));
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ForgotPassword
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({ className = "", ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      type: "checkbox",
      className: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " + className
    }
  );
}
function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("login"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            isFocused: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "current-password",
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "block mt-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx(
          Checkbox,
          {
            name: "remember",
            checked: data.remember,
            onChange: (e) => setData("remember", e.target.checked)
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "ms-2 text-sm text-gray-600", children: "Remember me" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-4", children: [
        canResetPassword && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("password.request"),
            className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Forgot your password?"
          }
        ),
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Se connecter" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(
        Link,
        {
          href: route("register"),
          className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "S'enregistrer"
        }
      ) })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("register"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            name: "name",
            value: data.name,
            className: "mt-1 block w-full",
            autoComplete: "name",
            isFocused: true,
            onChange: (e) => setData("name", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            type: "password",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value),
            required: true
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mt-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Register" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            children: "Déjà connecté ?"
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token,
    email,
    password: "",
    password_confirmation: ""
  });
  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);
  const submit = (e) => {
    e.preventDefault();
    post(route("password.store"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset Password" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            name: "email",
            value: data.email,
            className: "mt-1 block w-full",
            autoComplete: "username",
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            value: data.password,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            isFocused: true,
            onChange: (e) => setData("password", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            type: "password",
            id: "password_confirmation",
            name: "password_confirmation",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            autoComplete: "new-password",
            onChange: (e) => setData("password_confirmation", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ms-4", disabled: processing, children: "Reset Password" }) })
    ] })
  ] });
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResetPassword
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Email Verification" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600", children: "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another." }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Resend Verification Email" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "Log Out"
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
const DropDownContext = createContext();
const Dropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((previousState) => !previousState);
  };
  return /* @__PURE__ */ jsx(DropDownContext.Provider, { value: { open, setOpen, toggleOpen }, children: /* @__PURE__ */ jsx("div", { className: "relative", children }) });
};
const Trigger = ({ children }) => {
  const { open, setOpen, toggleOpen } = useContext(DropDownContext);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { onClick: toggleOpen, children }),
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) })
  ] });
};
const Content = ({ align = "right", width = "48", contentClasses = "py-1 bg-white", children }) => {
  const { open, setOpen } = useContext(DropDownContext);
  let alignmentClasses = "origin-top";
  if (align === "left") {
    alignmentClasses = "ltr:origin-top-left rtl:origin-top-right start-0";
  } else if (align === "right") {
    alignmentClasses = "ltr:origin-top-right rtl:origin-top-left end-0";
  }
  let widthClasses = "";
  if (width === "48") {
    widthClasses = "w-48";
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    Transition,
    {
      as: Fragment$1,
      show: open,
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 scale-95",
      enterTo: "opacity-100 scale-100",
      leave: "transition ease-in duration-75",
      leaveFrom: "opacity-100 scale-100",
      leaveTo: "opacity-0 scale-95",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`,
          onClick: () => setOpen(false),
          children: /* @__PURE__ */ jsx("div", { className: `rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses, children })
        }
      )
    }
  ) });
};
const DropdownLink = ({ className = "", children, ...props }) => {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out " + className,
      children
    }
  );
};
Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;
function NavLink({ active = false, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 text-gray-900 focus:border-indigo-700 " : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ") + className,
      children
    }
  );
}
function ResponsiveNavLink({ active = false, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${active ? "border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700" : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"} text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`,
      children
    }
  );
}
function Authenticated({ user, header, flash, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  console.log("flash", flash);
  useEffect(() => {
    toast(flash == null ? void 0 : flash.message);
    toast.error(flash == null ? void 0 : flash.error);
    toast.warning(flash == null ? void 0 : flash.warning);
    toast.success(flash == null ? void 0 : flash.success);
  }, [flash]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsxs("nav", { className: "bg-white border-b border-gray-100", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "block h-9 w-auto fill-current text-gray-800" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden space-x-8 sm:-my-px sm:ms-10 sm:flex", children: [
            /* @__PURE__ */ jsx(NavLink, { href: route("dashboard"), active: route().current("dashboard"), children: "Accueil" }),
            /* @__PURE__ */ jsx(NavLink, { href: route("cooking-team.index"), active: route().current("cooking-team.index"), children: "Notre équipe" }),
            /* @__PURE__ */ jsx(NavLink, { href: route("cooking-projects.index"), active: route().current("cooking-projects.index"), children: "Nos Projets" }),
            /* @__PURE__ */ jsx(NavLink, { href: route("cooking-medias.index"), active: route().current("cooking-medias.index"), children: "Galerie" }),
            /* @__PURE__ */ jsx(NavLink, { href: route("file.upload"), active: route().current("file.upload"), children: "Gestion des fichiers" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:flex sm:items-center sm:ms-6", children: /* @__PURE__ */ jsx("div", { className: "ms-3 relative", children: /* @__PURE__ */ jsxs(Dropdown, { children: [
          /* @__PURE__ */ jsx(Dropdown.Trigger, { children: /* @__PURE__ */ jsx("span", { className: "inline-flex rounded-md", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              className: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150",
              children: [
                user.name,
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                      }
                    )
                  }
                )
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsxs(Dropdown.Content, { children: [
            /* @__PURE__ */ jsx(Dropdown.Link, { href: route("profile.edit"), children: "Profile" }),
            /* @__PURE__ */ jsx(Dropdown.Link, { href: route("logout"), method: "post", as: "button", children: "Se déconnecter" })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "-me-2 flex items-center sm:hidden", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowingNavigationDropdown((previousState) => !previousState),
            className: "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out",
            children: /* @__PURE__ */ jsxs("svg", { className: "h-6 w-6", stroke: "currentColor", fill: "none", viewBox: "0 0 24 24", children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: !showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M4 6h16M4 12h16M4 18h16"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: showingNavigationDropdown ? "inline-flex" : "hidden",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: "2",
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            ] })
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "pt-2 pb-3 space-y-1", children: [
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("dashboard"), active: route().current("dashboard"), children: "Accueil" }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("cooking-team.index"), active: route().current("cooking-team.index"), children: "Notre équipe" }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("cooking-projects.index"), active: route().current("cooking-projects.index"), children: "Nos Projets" }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("cooking-medias.index"), active: route().current("cooking-medias.index"), children: "Galerie" }),
          /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("file.upload"), active: route().current("file.upload"), children: "Gestion des fichiers" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 pb-1 border-t border-gray-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "px-4", children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-base text-gray-800", children: user.name }),
            /* @__PURE__ */ jsx("div", { className: "font-medium text-sm text-gray-500", children: user.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-1", children: [
            /* @__PURE__ */ jsx(ResponsiveNavLink, { href: route("profile.edit"), children: "Profile" }),
            /* @__PURE__ */ jsx(ResponsiveNavLink, { method: "post", href: route("logout"), as: "button", children: "Se déconnecter" })
          ] })
        ] })
      ] })
    ] }),
    header && /* @__PURE__ */ jsx("header", { className: "bg-white shadow", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8", children: header }) }),
    /* @__PURE__ */ jsx(
      ToastContainer,
      {
        position: "top-right",
        autoClose: 5e3,
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light"
      }
    ),
    /* @__PURE__ */ jsx("main", { className: "relative mx-auto max-w-7xl max-sm:px-5", children })
  ] });
}
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
function Index$3({ auth, chirps }) {
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
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$3
}, Symbol.toStringTag, { value: "Module" }));
function Wysiwyg({ project }) {
  const { auth, flash } = usePage().props;
  const editorRef = useRef(null);
  const { data, setData, post, processing, errors } = useForm({
    user_id: auth.user.id,
    content: ""
  });
  const saveContent = () => {
    if (editorRef.current) {
      setData("project_description", editorRef.current.getContent());
      post(route("cooking-projects.store"), {
        onSuccess: () => {
          editorRef.current.setContent("");
          flash.success("Contenu sauvegardé");
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Editor,
      {
        apiKey: "b04ybqxttmft36lewewwjvawjv1fenb537ke9u1obaajaw1i",
        onInit: (_evt, editor) => editorRef.current = editor,
        initialValue: "",
        init: {
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "save"
          ],
          toolbar: "undo redo save | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          save_onsavecallback: saveContent
        }
      }
    ),
    /* @__PURE__ */ jsx(PrimaryButton, { className: "mt-4 justify-center", onClick: saveContent, children: "Valider" })
  ] });
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wysiwyg
}, Symbol.toStringTag, { value: "Module" }));
function StepperIndicators({ currentStep }) {
  const activeColor = (index) => currentStep >= index ? "bg-blue-500" : "bg-gray-300";
  const isFinalStep = (index) => index === 3 - 1;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center", children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-full ${activeColor(index)}` }),
    isFinalStep(index) ? null : /* @__PURE__ */ jsx("div", { className: `w-12 h-1 ${activeColor(index)}` })
  ] }, index)) });
}
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
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectListItem
}, Symbol.toStringTag, { value: "Module" }));
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
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectsList
}, Symbol.toStringTag, { value: "Module" }));
dayjs.locale("fr-FR");
dayjs.extend(relativeTime);
function Index$2({ projects, authors, flash, projectMedias, medias }) {
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
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$2
}, Symbol.toStringTag, { value: "Module" }));
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
function Index$1({ auth, members, authors }) {
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
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
function Dashboard({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Accueil" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900", children: [
          "Bienvenue ",
          auth.user.name
        ] }) }) }) })
      ]
    }
  );
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
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
        progress && /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full dark:bg-gray-700", children: /* @__PURE__ */ jsxs(
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
              CardContent,
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
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const ProviderImg = ({ media, selectedMedias }) => {
  const { media_provider_id, media_slug, media_name, media_provider, media_provider_ext, id } = media;
  const isMediaSelected = selectedMedias.find((selectedMedia) => selectedMedia.toString() === id.toString());
  let cldImg;
  if (media_provider === "cloudinary") {
    const cld = new Cloudinary({ cloud: { cloudName: "dtgt8j8u8" } });
    cldImg = cld.image(media_provider_id).format("auto").quality("auto").resize(auto().gravity(autoGravity()).width(200).height(200)).roundCorners(byRadius(10));
  } else {
    cldImg = "storage/uploads/" + media_provider_id + "." + media_provider_ext;
  }
  return /* @__PURE__ */ jsxs("div", { className: `relative ${!isMediaSelected ? `h-auto max-w-[250px] ${selectedMedias.length !== 0 ? "hidden" : "block"}` : "block"}`, children: [
    /* @__PURE__ */ jsx("div", { className: `z-10 absolute top-0 bottom-0 right-0 left-0 rounded-[10px] peer
                ${isMediaSelected ? "border-4 border-amber-900" : "bg-gray-500 opacity-0 hover:opacity-100 hover:bg-[rgba(0,0,0,0.5)]"}
                `, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `z-30 absolute top-2 bottom-2 right-2 left-2
                            flex items-center justify-center`,
        children: /* @__PURE__ */ jsx("span", { className: `text-center text-gray-100 ${isMediaSelected ? "hidden" : "inline"}`, children: media_provider_id })
      }
    ) }),
    media_provider === "cloudinary" ? /* @__PURE__ */ jsx(AdvancedImage, { className: `peer-hover:opacity-80 ${isMediaSelected && "opacity-80"}`, cldImg }) : /* @__PURE__ */ jsx("img", { src: cldImg, alt: "" })
  ] });
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProviderImg
}, Symbol.toStringTag, { value: "Module" }));
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
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateMediaProvider
}, Symbol.toStringTag, { value: "Module" }));
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
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProjectMediasSelection
}, Symbol.toStringTag, { value: "Module" }));
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
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Gallery
}, Symbol.toStringTag, { value: "Module" }));
function GdriveList() {
  const [folders, setFolders] = useState([]);
  useEffect(() => {
    axios.get(route("gdrive.list")).then((response) => {
      console.log(response);
      setFolders(response.data);
    }).catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
  }, []);
  console.log("folders", folders);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Google Drive Folders" }),
    /* @__PURE__ */ jsx("ul", { children: folders == null ? void 0 : folders.map((folder) => /* @__PURE__ */ jsx("li", { children: folder.name }, folder.id)) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GdriveList
}, Symbol.toStringTag, { value: "Module" }));
function DangerButton({ className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function Modal({ children, show = false, maxWidth = "2xl", closeable = true, onClose = () => {
} }) {
  const close = () => {
    if (closeable) {
      onClose();
    }
  };
  const maxWidthClass = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl"
  }[maxWidth];
  return /* @__PURE__ */ jsx(Transition, { show, as: Fragment$1, leave: "duration-200", children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      as: "div",
      id: "modal",
      className: "fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",
      onClose: close,
      children: [
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-500/75" })
          }
        ),
        /* @__PURE__ */ jsx(
          Transition.Child,
          {
            as: Fragment$1,
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            children: /* @__PURE__ */ jsx(
              Dialog.Panel,
              {
                className: `mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`,
                children
              }
            )
          }
        )
      ]
    }
  ) });
}
function SecondaryButton({ type = "button", className = "", disabled, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      type,
      className: `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && "opacity-25"} ` + className,
      disabled,
      children
    }
  );
}
function DeleteUserForm({ className = "" }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors
  } = useForm({
    password: ""
  });
  const confirmUserDeletion = () => {
    setConfirmingUserDeletion(true);
  };
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset()
    });
  };
  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };
  return /* @__PURE__ */ jsxs("section", { className: `space-y-6 ${className}`, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Delete Account" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain." })
    ] }),
    /* @__PURE__ */ jsx(DangerButton, { onClick: confirmUserDeletion, children: "Delete Account" }),
    /* @__PURE__ */ jsx(Modal, { show: confirmingUserDeletion, onClose: closeModal, children: /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, className: "p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Are you sure you want to delete your account?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "Password", className: "sr-only" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            name: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            className: "mt-1 block w-3/4",
            isFocused: true,
            placeholder: "Password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-end", children: [
        /* @__PURE__ */ jsx(SecondaryButton, { onClick: closeModal, children: "Cancel" }),
        /* @__PURE__ */ jsx(DangerButton, { className: "ms-3", disabled: processing, children: "Delete Account" })
      ] })
    ] }) })
  ] });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DeleteUserForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Update Password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Ensure your account is using a long, random password to stay secure." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "current_password", value: "Current Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "current_password",
            ref: currentPasswordInput,
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "current-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.current_password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            ref: passwordInput,
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password_confirmation", value: "Confirm Password" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password_confirmation",
            value: data.password_confirmation,
            onChange: (e) => setData("password_confirmation", e.target.value),
            type: "password",
            className: "mt-1 block w-full",
            autoComplete: "new-password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdatePasswordForm
}, Symbol.toStringTag, { value: "Module" }));
function UpdateProfileInformation({ mustVerifyEmail, status, className = "" }) {
  const user = usePage().props.auth.user;
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  return /* @__PURE__ */ jsxs("section", { className, children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900", children: "Profile Information" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600", children: "Update your account's profile information and email address." })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "name",
            className: "mt-1 block w-full",
            value: data.name,
            onChange: (e) => setData("name", e.target.value),
            required: true,
            isFocused: true,
            autoComplete: "name"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
        /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            className: "mt-1 block w-full",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            required: true,
            autoComplete: "username"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
      ] }),
      mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800", children: [
          "Your email address is unverified.",
          /* @__PURE__ */ jsx(
            Link,
            {
              href: route("verification.send"),
              method: "post",
              as: "button",
              className: "underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              children: "Click here to re-send the verification email."
            }
          )
        ] }),
        status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600", children: "A new verification link has been sent to your email address." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
        /* @__PURE__ */ jsx(
          Transition,
          {
            show: recentlySuccessful,
            enter: "transition ease-in-out",
            enterFrom: "opacity-0",
            leave: "transition ease-in-out",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Saved." })
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UpdateProfileInformation
}, Symbol.toStringTag, { value: "Module" }));
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Edit
}, Symbol.toStringTag, { value: "Module" }));
function Welcome({ auth, laravelVersion, phpVersion }) {
  const handleImageError = () => {
    var _a, _b, _c, _d;
    (_a = document.getElementById("screenshot-container")) == null ? void 0 : _a.classList.add("!hidden");
    (_b = document.getElementById("docs-card")) == null ? void 0 : _b.classList.add("!row-span-1");
    (_c = document.getElementById("docs-card-content")) == null ? void 0 : _c.classList.add("!flex-row");
    (_d = document.getElementById("background")) == null ? void 0 : _d.classList.add("!hidden");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 text-black/50 dark:bg-black dark:text-white/50", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          id: "background",
          className: "absolute -left-20 top-0 max-w-[877px]",
          src: "https://laravel.com/assets/img/welcome/background.svg"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-2xl px-6 lg:max-w-7xl", children: [
        /* @__PURE__ */ jsxs("header", { className: "grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex lg:justify-center lg:col-start-2", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]",
              viewBox: "0 0 62 65",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  d: "M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z",
                  fill: "currentColor"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: auth.user ? /* @__PURE__ */ jsx(
            Link,
            {
              href: route("dashboard"),
              className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
              children: "Accueil"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("login"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "Se connecter"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",
                children: "S'inscrire"
              }
            )
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "mt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-2 lg:gap-8", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel.com/docs",
              id: "docs-card",
              className: "flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] md:row-span-3 lg:p-10 lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    id: "screenshot-container",
                    className: "relative flex w-full flex-1 items-stretch",
                    children: [
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-light.svg",
                          alt: "Laravel documentation screenshot",
                          className: "aspect-video h-full w-full flex-1 rounded-[10px] object-top object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.06)] dark:hidden",
                          onError: handleImageError
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: "https://laravel.com/assets/img/welcome/docs-dark.svg",
                          alt: "Laravel documentation screenshot",
                          className: "hidden aspect-video h-full w-full flex-1 rounded-[10px] object-top object-cover drop-shadow-[0px_4px_34px_rgba(0,0,0,0.25)] dark:block"
                        }
                      ),
                      /* @__PURE__ */ jsx("div", { className: "absolute -bottom-16 -left-16 h-40 w-[calc(100%+8rem)] bg-gradient-to-b from-transparent via-white to-white dark:via-zinc-900 dark:to-zinc-900" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative flex items-center gap-6 lg:items-end", children: [
                  /* @__PURE__ */ jsxs("div", { id: "docs-card-content", className: "flex items-start gap-6 lg:flex-col", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsxs(
                      "svg",
                      {
                        className: "size-5 sm:size-6",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        children: [
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "#FF2D20",
                              d: "M23 4a1 1 0 0 0-1.447-.894L12.224 7.77a.5.5 0 0 1-.448 0L2.447 3.106A1 1 0 0 0 1 4v13.382a1.99 1.99 0 0 0 1.105 1.79l9.448 4.728c.14.065.293.1.447.1.154-.005.306-.04.447-.105l9.453-4.724a1.99 1.99 0 0 0 1.1-1.789V4ZM3 6.023a.25.25 0 0 1 .362-.223l7.5 3.75a.251.251 0 0 1 .138.223v11.2a.25.25 0 0 1-.362.224l-7.5-3.75a.25.25 0 0 1-.138-.22V6.023Zm18 11.2a.25.25 0 0 1-.138.224l-7.5 3.75a.249.249 0 0 1-.329-.099.249.249 0 0 1-.033-.12V9.772a.251.251 0 0 1 .138-.224l7.5-3.75a.25.25 0 0 1 .362.224v11.2Z"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              fill: "#FF2D20",
                              d: "m3.55 1.893 8 4.048a1.008 1.008 0 0 0 .9 0l8-4.048a1 1 0 0 0-.9-1.785l-7.322 3.706a.506.506 0 0 1-.452 0L4.454.108a1 1 0 0 0-.9 1.785H3.55Z"
                            }
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5 lg:pt-0", children: [
                      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Documentation" }),
                      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel has wonderful documentation covering every aspect of the framework. Whether you are a newcomer or have prior experience with Laravel, we recommend reading our documentation from beginning to end." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "size-6 shrink-0 stroke-[#FF2D20]",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: "1.5",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        }
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laracasts.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M24 8.25a.5.5 0 0 0-.5-.5H.5a.5.5 0 0 0-.5.5v12a2.5 2.5 0 0 0 2.5 2.5h19a2.5 2.5 0 0 0 2.5-2.5v-12Zm-7.765 5.868a1.221 1.221 0 0 1 0 2.264l-6.626 2.776A1.153 1.153 0 0 1 8 18.123v-5.746a1.151 1.151 0 0 1 1.609-1.035l6.626 2.776ZM19.564 1.677a.25.25 0 0 0-.177-.427H15.6a.106.106 0 0 0-.072.03l-4.54 4.543a.25.25 0 0 0 .177.427h3.783c.027 0 .054-.01.073-.03l4.543-4.543ZM22.071 1.318a.047.047 0 0 0-.045.013l-4.492 4.492a.249.249 0 0 0 .038.385.25.25 0 0 0 .14.042h5.784a.5.5 0 0 0 .5-.5v-2a2.5 2.5 0 0 0-1.925-2.432ZM13.014 1.677a.25.25 0 0 0-.178-.427H9.101a.106.106 0 0 0-.073.03l-4.54 4.543a.25.25 0 0 0 .177.427H8.4a.106.106 0 0 0 .073-.03l4.54-4.543ZM6.513 1.677a.25.25 0 0 0-.177-.427H2.5A2.5 2.5 0 0 0 0 3.75v2a.5.5 0 0 0 .5.5h1.4a.106.106 0 0 0 .073-.03l4.54-4.543Z" }) })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laracasts" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see for yourself, and massively level up your development skills in the process." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://laravel-news.com",
              className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-5 sm:size-6",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsxs("g", { fill: "#FF2D20", children: [
                      /* @__PURE__ */ jsx("path", { d: "M8.75 4.5H5.5c-.69 0-1.25.56-1.25 1.25v4.75c0 .69.56 1.25 1.25 1.25h3.25c.69 0 1.25-.56 1.25-1.25V5.75c0-.69-.56-1.25-1.25-1.25Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M24 10a3 3 0 0 0-3-3h-2V2.5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2V20a3.5 3.5 0 0 0 3.5 3.5h17A3.5 3.5 0 0 0 24 20V10ZM3.5 21.5A1.5 1.5 0 0 1 2 20V3a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v17c0 .295.037.588.11.874a.5.5 0 0 1-.484.625L3.5 21.5ZM22 20a1.5 1.5 0 1 1-3 0V9.5a.5.5 0 0 1 .5-.5H21a1 1 0 0 1 1 1v10Z" }),
                      /* @__PURE__ */ jsx("path", { d: "M12.751 6.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 7.3v-.5a.75.75 0 0 1 .751-.753ZM12.751 10.047h2a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-2A.75.75 0 0 1 12 11.3v-.5a.75.75 0 0 1 .751-.753ZM4.751 14.047h10a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-10A.75.75 0 0 1 4 15.3v-.5a.75.75 0 0 1 .751-.753ZM4.75 18.047h7.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75h-7.5A.75.75 0 0 1 4 19.3v-.5a.75.75 0 0 1 .75-.753Z" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Laravel News" }),
                  /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm/relaxed", children: "Laravel News is a community driven portal and newsletter aggregating all of the latest and most important news in the Laravel ecosystem, including new package releases and tutorials." })
                ] }),
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-6 shrink-0 self-center stroke-[#FF2D20]",
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "1.5",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] lg:pb-10 dark:bg-zinc-900 dark:ring-zinc-800", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF2D20]/10 sm:size-16", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "size-5 sm:size-6",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("g", { fill: "#FF2D20", children: /* @__PURE__ */ jsx("path", { d: "M16.597 12.635a.247.247 0 0 0-.08-.237 2.234 2.234 0 0 1-.769-1.68c.001-.195.03-.39.084-.578a.25.25 0 0 0-.09-.267 8.8 8.8 0 0 0-4.826-1.66.25.25 0 0 0-.268.181 2.5 2.5 0 0 1-2.4 1.824.045.045 0 0 0-.045.037 12.255 12.255 0 0 0-.093 3.86.251.251 0 0 0 .208.214c2.22.366 4.367 1.08 6.362 2.118a.252.252 0 0 0 .32-.079 10.09 10.09 0 0 0 1.597-3.733ZM13.616 17.968a.25.25 0 0 0-.063-.407A19.697 19.697 0 0 0 8.91 15.98a.25.25 0 0 0-.287.325c.151.455.334.898.548 1.328.437.827.981 1.594 1.619 2.28a.249.249 0 0 0 .32.044 29.13 29.13 0 0 0 2.506-1.99ZM6.303 14.105a.25.25 0 0 0 .265-.274 13.048 13.048 0 0 1 .205-4.045.062.062 0 0 0-.022-.07 2.5 2.5 0 0 1-.777-.982.25.25 0 0 0-.271-.149 11 11 0 0 0-5.6 2.815.255.255 0 0 0-.075.163c-.008.135-.02.27-.02.406.002.8.084 1.598.246 2.381a.25.25 0 0 0 .303.193 19.924 19.924 0 0 1 5.746-.438ZM9.228 20.914a.25.25 0 0 0 .1-.393 11.53 11.53 0 0 1-1.5-2.22 12.238 12.238 0 0 1-.91-2.465.248.248 0 0 0-.22-.187 18.876 18.876 0 0 0-5.69.33.249.249 0 0 0-.179.336c.838 2.142 2.272 4 4.132 5.353a.254.254 0 0 0 .15.048c1.41-.01 2.807-.282 4.117-.802ZM18.93 12.957l-.005-.008a.25.25 0 0 0-.268-.082 2.21 2.21 0 0 1-.41.081.25.25 0 0 0-.217.2c-.582 2.66-2.127 5.35-5.75 7.843a.248.248 0 0 0-.09.299.25.25 0 0 0 .065.091 28.703 28.703 0 0 0 2.662 2.12.246.246 0 0 0 .209.037c2.579-.701 4.85-2.242 6.456-4.378a.25.25 0 0 0 .048-.189 13.51 13.51 0 0 0-2.7-6.014ZM5.702 7.058a.254.254 0 0 0 .2-.165A2.488 2.488 0 0 1 7.98 5.245a.093.093 0 0 0 .078-.062 19.734 19.734 0 0 1 3.055-4.74.25.25 0 0 0-.21-.41 12.009 12.009 0 0 0-10.4 8.558.25.25 0 0 0 .373.281 12.912 12.912 0 0 1 4.826-1.814ZM10.773 22.052a.25.25 0 0 0-.28-.046c-.758.356-1.55.635-2.365.833a.25.25 0 0 0-.022.48c1.252.43 2.568.65 3.893.65.1 0 .2 0 .3-.008a.25.25 0 0 0 .147-.444c-.526-.424-1.1-.917-1.673-1.465ZM18.744 8.436a.249.249 0 0 0 .15.228 2.246 2.246 0 0 1 1.352 2.054c0 .337-.08.67-.23.972a.25.25 0 0 0 .042.28l.007.009a15.016 15.016 0 0 1 2.52 4.6.25.25 0 0 0 .37.132.25.25 0 0 0 .096-.114c.623-1.464.944-3.039.945-4.63a12.005 12.005 0 0 0-5.78-10.258.25.25 0 0 0-.373.274c.547 2.109.85 4.274.901 6.453ZM9.61 5.38a.25.25 0 0 0 .08.31c.34.24.616.561.8.935a.25.25 0 0 0 .3.127.631.631 0 0 1 .206-.034c2.054.078 4.036.772 5.69 1.991a.251.251 0 0 0 .267.024c.046-.024.093-.047.141-.067a.25.25 0 0 0 .151-.23A29.98 29.98 0 0 0 15.957.764a.25.25 0 0 0-.16-.164 11.924 11.924 0 0 0-2.21-.518.252.252 0 0 0-.215.076A22.456 22.456 0 0 0 9.61 5.38Z" }) })
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-5", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-black dark:text-white", children: "Vibrant Ecosystem" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm/relaxed", children: [
                "Laravel's robust library of first-party tools and libraries, such as",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://forge.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white dark:focus-visible:ring-[#FF2D20]",
                    children: "Forge"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://vapor.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Vapor"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://nova.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Nova"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://envoyer.io",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Envoyer"
                  }
                ),
                ", and",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://herd.laravel.com",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Herd"
                  }
                ),
                " ",
                "help you take your projects to the next level. Pair them with powerful open source libraries like",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/billing",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Cashier"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/dusk",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Dusk"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/broadcasting",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Echo"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/horizon",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Horizon"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/sanctum",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Sanctum"
                  }
                ),
                ",",
                " ",
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://laravel.com/docs/telescope",
                    className: "rounded-sm underline hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF2D20] dark:hover:text-white",
                    children: "Telescope"
                  }
                ),
                ", and more."
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("footer", { className: "py-16 text-center text-sm text-black dark:text-white/70", children: [
          "Laravel v",
          laravelVersion,
          " (PHP v",
          phpVersion,
          ")"
        ] })
      ] }) })
    ] })
  ] });

    }
  })
);
