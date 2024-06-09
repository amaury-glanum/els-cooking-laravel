// import React, { useRef } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import PrimaryButton from "@/Components/PrimaryButton.jsx";
// import { useForm, usePage } from "@inertiajs/react";
//
// export default function Wysiwyg({project}) {
//     const { auth, flash } = usePage().props;
//     const editorRef = useRef(null);
//     const { data, setData, post, processing, errors } = useForm({
//         user_id: auth.user.id,
//         content: '',
//     });
//
//     const saveContent = () => {
//         if (editorRef.current) {
//             setData('project_description', editorRef.current.getContent());
//             post(route('cooking-projects.store'), {
//                 onSuccess: () => {
//                     editorRef.current.setContent(''); // Clear editor after save
//                     flash.success('Contenu sauvegardé');
//                 },
//             });
//         }
//     };
//
//     return (
//         <>
//             <Editor
//                 apiKey='b04ybqxttmft36lewewwjvawjv1fenb537ke9u1obaajaw1i'
//                 onInit={(_evt, editor) => editorRef.current = editor}
//                 initialValue=""
//                 init={{
//                     height: 500,
//                     menubar: false,
//                     plugins: [
//                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
//                         'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
//                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'save'
//                     ],
//                     toolbar: 'undo redo save | blocks | ' +
//                         'bold italic forecolor | alignleft aligncenter ' +
//                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                         'removeformat | help',
//                     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
//                     save_onsavecallback: saveContent
//                 }}
//             />
//             <PrimaryButton className="mt-4 justify-center" onClick={saveContent}>Valider</PrimaryButton>
//         </>
//     );
// }
//
