import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx',
            'resources/css/app.css',
            'resources/js/app.js'],
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     host: '0.0.0.0',
    //     hmr: {
    //         clientPort: 3000, // Adjust this port if necessary
    //         host: 'localhost',
    //     },
    // },
});


