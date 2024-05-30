import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import dns from 'node:dns'

dns.setDefaultResultOrder('verbatim')
const port = 8443;
const origin = `${process.env.DDEV_PRIMARY_URL}`;
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/assets/scss/style.scss',
                'resources/css/app.css',
                'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     // respond to all network requests
    //     host: '0.0.0.0',
    //     port: port,
    //     strictPort: true,
    //     // Defines the origin of the generated asset URLs during development,
    //     // this will also be used for the public/hot file (Vite devserver URL)
    //     origin: origin
    // }
});


