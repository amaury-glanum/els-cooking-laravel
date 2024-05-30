import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import {createRoot} from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title : (title) => `${title} - ${appName}`,
        resolve: name => {
            const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
            return pages[`./Pages/${name}.jsx`]
        },
        setup({ el, App, props }) {
            const root = createRoot(el);

            root.render(<App {...props} />);
        },
    }),
)
