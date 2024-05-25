import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const CloudinaryImg = ({ cld, media, selectedMedias }) => {

    const { media_provider_id, media_name, id } = media;

    const cldImg = cld.image(media_provider_id)
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(200).height(200))
        .roundCorners(byRadius(10)); // Transform the image: auto-crop to square aspect_ratio;

     const isMediaSelected = selectedMedias.find(selectedMedia => selectedMedia.toString() ===  id.toString())

    return (<div className={`relative ${!isMediaSelected ? `h-auto max-w-[250px] ${selectedMedias.length !== 0 ? "hidden":"block"}`: "block"}`}>
        <div className={`z-10 absolute top-0 bottom-0 right-0 left-0 rounded-[10px] peer
                ${isMediaSelected ? "border-4 border-amber-900" :
                                    "bg-gray-500 opacity-0 hover:opacity-100 hover:bg-[rgba(0,0,0,0.5)]"}
                `}>
            <div
                className={`z-30 absolute top-2 bottom-2 right-2 left-2
                            flex items-center justify-center`}>
                <span className={`text-center text-gray-100 ${isMediaSelected ? "hidden" : "inline"}`}>{media_provider_id}</span>
            </div>
        </div>
        <AdvancedImage className={`peer-hover:opacity-80 ${isMediaSelected && "opacity-80"}`} cldImg={cldImg}/>
    </div>);
};

export default CloudinaryImg
