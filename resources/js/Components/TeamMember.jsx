import dayjs from 'dayjs';
import 'dayjs/locale/fr'; 
import Dropdown from '@/Components/Dropdown';
import { useForm, usePage } from '@inertiajs/react';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('fr-FR');
dayjs.extend(relativeTime);

export default function TeamMember({ member }) {

    const { auth } = usePage().props;

    return (

        <div className="min-w-[300px] bg-gray-100 border rounded-md border-gray-600 p-6 flex space-x-2">
            <div className="flex justify-between gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                <div className="">
                    {auth.user.id === member.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link as="button" href={route('cooking-team.destroy', member.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex justify-between items-center gap-5">
                    <div className="flex flex-col gap-2">
                            <small className="ml-2 text-sm text-gray-600"> Créé {dayjs(member.created_at).fromNow()}</small>                         
                        <span className="text-gray-600">Nom: {member.nom}</span>
                        <span className="text-gray-600">Prénom: {member.prenom}</span>
                        <span className="text-gray-600">Fonction: {member.role}</span>
                        <span className="text-gray-600">Id: {member.id}</span>
                        <span className="text-gray-600">Responsable: {member.user_id}</span>
                    </div>            
                </div>
            </div>

        </div>

    )

}
