import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TeamMember from '@/Components/TeamMember';
import { useForm, Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, members, author}) {

    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: auth.user.id,
        prenom: '',
        nom: '',
        email: '',
        presentation: '',
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('cooking-team.store'), { onSuccess: () => reset() });
    };

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
                    <TextInput
                        value={data.email}
                        placeholder="Email associatif du membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('email', e.target.value)}
                    ></TextInput>
                    <TextInput
                        value={data.role}
                        placeholder="Ecrivez ici la fonction officiel du membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('role', e.target.value)}
                    ></TextInput>
                    <textarea
                        value={data.presentation}
                        placeholder="Ecrivez ici un court texte pour présenter le membre"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('presentation', e.target.value)}
                    ></textarea>

                    <InputError message={errors.message} className="mt-2"/>
                    {Object.keys(errors).map((errorField) => (
                        <InputError key={errorField} message={errors[errorField]} className="mt-2"/>
                    ))}
                    <PrimaryButton className="mt-4 justify-center" disabled={processing}>Créer un membre</PrimaryButton>
                </form>
            </div>
                <div className="p-4 sm:p-6 lg:p-8 flex flex-wrap grow gap-2">
                    {members.map(member =>
                        <TeamMember key={member.id} member={member} author={author}/>)}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
