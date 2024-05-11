import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


dayjs.extend(relativeTime);

export default function TeamMember({ member }) {

    return (

        <div className="min-w-[300px] bg-gray-100 border border-2 rounded-md border-gray-600 p-6 flex space-x-2">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
            <div className="flex-1">

                <div className="flex justify-between items-center gap-5">

                    <div className="flex flex-col gap-2">
                    <small className="ml-2 text-sm text-gray-600"> Créé {dayjs(member.created_at).fromNow()}</small>
                        <span className="text-gray-600">Nom: {member.nom}</span>
                        <span className="text-gray-600">Prénom: {member.prenom}</span>
                        <span className="text-gray-600">Fonction: {member.role}</span>
                    </div>

                </div>

            </div>

        </div>

    )

}
