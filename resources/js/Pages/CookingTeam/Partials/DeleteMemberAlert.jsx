import { useState } from 'react';

export default function DeleteMemberAlert({ className = '' , member, confirmMemberDeletion}) {
  
    return (
        <div className={`${className}`}>
       
            <span className="p-3 cursor-pointer hover:text-red-500" onClick={confirmMemberDeletion}>Supprimer {member.prenom} </span>

        </div>
    );
}