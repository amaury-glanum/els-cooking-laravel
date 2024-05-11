import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TeamMember from '@/Components/TeamMember';
import { useForm, Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, teams}) {

    const { data, setData, post, processing, reset, errors } = useForm({
        prenom: '',
        nom: '',
        presentation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('cooking-team.store'), { onSuccess: () => reset() });
    };

    console.log('teams members', teams)

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
                        <option value="president">Président</option>
                        <option value="secretaire">Secretaire</option>
                        <option value="membre">Membre</option>
                    </select>
                    <InputError message={errors.message} className="mt-2" />
                    {Object.keys(errors).map((errorField) => (
                        <InputError key={errorField} message={errors[errorField]} className="mt-2" />
                    ))}
                    <PrimaryButton className="mt-4 justify-center" disabled={processing}>Créer un membre</PrimaryButton>
                </form>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 flex flex-wrap grow gap-2">
            {teams.map(member =>
                <TeamMember key={member.id} member={member} />
                )}

            </div>
        </section>
        </AuthenticatedLayout>
    );
}
