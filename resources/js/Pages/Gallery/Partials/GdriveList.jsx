import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function GdriveList() {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        axios.get(route('gdrive.list'))
            .then(response => {
                console.log(response)
                setFolders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    console.log('folders', folders)

    return (
        <div>
            <h1>Google Drive Folders</h1>
            <ul>
                {folders?.map(folder => (
                    <li key={folder.id}>{folder.name}</li>
                ))}
            </ul>
        </div>
    );
};

