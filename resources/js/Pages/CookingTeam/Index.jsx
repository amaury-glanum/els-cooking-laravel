import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TeamMember from '@/Components/TeamMember';
import { useForm, Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';



export default function Index({ auth, members}) {

    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        prenom: '',
        nom: '',
        presentation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('cooking-team.store'), { onSuccess: () => reset() });
    };

    console.log('teams members', members)
    console.log('user id', auth.user.id)
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Equipe" />
            <section className="max-w-7xl mx-auto flex flex-wrap" >
            <div className="min-w-[550px] p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="max-w-lg flex flex-col gap-5">
                    <TextInput
                        value={data.prenom}
                        placeholder="Prénom du membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('prenom', e.target.value)}
                    ></TextInput>
                    <TextInput
                        value={data.nom}
                        placeholder="Nom du membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('nom', e.target.value)}
                    ></TextInput>
                    <input
                        type="hidden"
                        value={auth.user.id}
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('user_id', e.target.value)}
                    />

                    <textarea
                        value={data.presentation}
                        placeholder="Présentez le membre ici"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('presentation', e.target.value)}
                    ></textarea>
                    <select
                        placeholder="Role du membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('role', e.target.value)}
                    >
                        <option value="Président">Président</option>
                        <option value="Secrétaire">Secretaire</option>
                        <option value="Coordinateur">Coordinateur</option>
                    </select>
                    
                    <InputError message={errors.message} className="mt-2" />
                    {Object.keys(errors).map((errorField) => (
                        <InputError key={errorField} message={errors[errorField]} className="mt-2" />
                    ))}
                    <PrimaryButton className="mt-4 justify-center" disabled={processing}>Créer un membre</PrimaryButton>
                </form>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 flex flex-wrap grow gap-2">
            {members.length > 0 ? 
            
            members.map(member =>
                <TeamMember key={member.id} member={member} />
                ): 
                <div className="min-w-[100%] flex flex-col items-center justify-center" >
                    <div className="min-w-[80%] rounded p-5 bg-slate-600 flex flex-col items-center justify-center" >
                        <p className="text-center text-lg fw-bold text-gray-200">Aucun membre n'est définit pour l'instant</p>
                    </div>
                </div>
                
                }

            </div>
        </section>
        </AuthenticatedLayout>
    );
}
