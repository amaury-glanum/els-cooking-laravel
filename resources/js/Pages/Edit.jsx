// resources/js/Pages/Edit.jsx
import React, { useState } from 'react';
import { router } from '@inertiajs/react'

export default function Edit({ member }) {
    const [values, setValues] = useState({ // Form fields
        member: member.nom,
        body: member.prenom
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.put(`/member/${member.id}`, values)
    }

    return (
        <>
            <h1>Modifier le Membre</h1>
            <hr/>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom">Nom:</label>
                <input id="nom" value={values.nom} onChange={handleChange} />

                <label htmlFor="prenom">Prénom:</label>
                <input id="prenom" value={values.prenom} onChange={handleChange}/>
                <button type="submit">Modifier</button>
            </form>
        </>
    )
}
