import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { Cloudinary } from "@cloudinary/url-gen";
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
const ProviderImg$1 = ProviderImg;
export {
  ProviderImg$1 as default
};
