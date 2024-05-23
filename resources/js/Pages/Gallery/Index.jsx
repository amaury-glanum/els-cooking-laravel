import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Cloudinary } from '@cloudinary/url-gen';
import CloudinaryImg from "@/Pages/Gallery/Partials/CloudinaryImg.jsx";
export default function Gallery({ auth, medias, members, authors }) {

    console.log(members)
    console.log(authors)
    console.log(medias)

    const cld = new Cloudinary({cloud: {cloudName: 'dtgt8j8u8'}});
    const imgIds = [
        'project-1_piisxw'
    ]
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mes médias</h2>}
        >
            <Head title="Els-cooking - Gallerie de médias"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Bienvenue {auth.user.name}</div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {imgIds.length > 0 && imgIds.map(
                            imgId => {
                               return (<CloudinaryImg key={imgId} cld={cld} imgId={imgId}/>)
                            }
                        )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
