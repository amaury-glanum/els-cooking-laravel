import React, { useState } from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/fr'; 
import Dropdown from '@/Components/Dropdown';
import { useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import relativeTime from 'dayjs/plugin/relativeTime';
import TextInput from '@/Components/TextInput';


dayjs.locale('fr-FR');
dayjs.extend(relativeTime);

export default function TeamMember({ member }) {

    const [editing, setEditing] = useState("");
    const { auth } = usePage().props;

    const { id, user_id, prenom, nom, presentation, role , created_at, updated_at} = member;

    const { data, setData, patch, clearErrors, reset, errors } = useForm({

        nom: member.nom,

    });

    const submit = (e) => {

        e.preventDefault();
        try {
        patch(route('cooking-team.update', id), { onSuccess: () => setEditing(false) });
        } catch (error) {
            console.log(error);
        }

    };

    return (

        <div className="min-w-[300px] bg-gray-100 border rounded-md border-gray-600 p-6 flex space-x-2">
            <div className="flex justify-between gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                <div className="">
                    {auth.user.id === user_id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link as="button" href={route('cooking-team.destroy', id)} method="delete">
                                    Supprimer
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
            </div>
            
            <div className="flex-1">
                <div className="flex justify-between items-center gap-5">
                    <div className="w-full flex flex-col gap-2">
                            <small className="ml-2 text-sm text-gray-600"> Créé {dayjs(created_at).fromNow()}</small> 
                
                {editing ? <form onSubmit={submit}>

                        <input type="text" placeholder={`${editing}`} onChange={e => setData(`${editing}`, e.target.value)} 
                        className={`mt-4 w-full text-gray-900 border-gray-300
                                focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`} />
                   

                        <div className="space-x-2">

                            <PrimaryButton className="mt-4">Save</PrimaryButton>

                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>

                        </div>

                    </form>

                    : <div className="w-full flex flex-col gap-2">
                         <span className="text-gray-600 flex justify-between gap-2">
                            <span className="cursor-pointer text-green-700">Nom: {nom}</span>
                            <span className="cursor-pointer text-green-700" onClick={() => setEditing('nom')}>Editer</span>
                        </span>
                         <span className="text-gray-600 flex justify-between gap-2">
                            <span className="cursor-pointer text-green-700">Prénom: {prenom}</span>
                            <span className="cursor-pointer text-green-700" onClick={() => setEditing('prenom')}>Editer</span>
                         </span>
                         <span className="text-gray-600">Fonction: {role}</span>
                         <span className="text-gray-600">Id: {id}</span>
                         <span className="text-gray-600">Responsable: {user_id}</span>
                      </div>
                }                        
                       
                    </div>            
                </div>
            </div>

        </div>

    )

}
