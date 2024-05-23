import React from 'react'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";

const CloudinaryImg = ({ cld, imgId}) => {
    // https://res.cloudinary.com/dtgt8j8u8/image/upload/v1716410731/elstogo/project-5_wvb3ne.jpg
    //Use this sample image or upload your own via the Media Explorer
    // const img = cld.image('');
    const myImage = cld.image('elstogo/project-5_wvb3ne')
        .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(200).height(200))
        .roundCorners(byRadius(10)); // Transform the image: auto-crop to square aspect_ratio;

     console.log('cld', cld);
    return (<div className={"max-w-[250px] h-auto"}>
        <AdvancedImage cldImg={myImage}/>
    </div>);
};

export default CloudinaryImg
