import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')
export default defineConfig({

    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost',
        port: 5173,
        cors: true,
        // hmr: {
        //     clientPort: 3000, // Adjust this port if necessary
        //     host: 'localhost',
        //
        // },
        // hmr:{
        //     host: process.env.DDEV_HOSTNAME,
        //     protocol : 'wss'
        // }
    },
});


