import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'white': '#ffffff',
                'primary': {
                   DEFAULT:'#004aad',
                   dark: '#0036A3FF',
                   50: 'rgba(0, 74, 173, 0.5)',
                   80: 'rgba(0, 74, 173, 0.8)'
                },
                'secondary': {
                    DEFAULT:  '#0036a3'
                },
                'tertiary' : {
                  DEFAULT: '#00AD9C'
                },
                'horizon': {
                    '50': '#f3f6fb',
                    '100': '#e3eaf6',
                    '200': '#cedbef',
                    light: '#cedbef',
                    DEFAULT: '#b2c8e6', // horizon
                    '400': '#84a5d6',
                    '500': '#6788ca',
                    '600': '#546fbc',
                    secondary: '#546fbc',
                    '700': '#495eac',
                    '800': '#404e8d',
                    '900': '#374371',
                    '950': '#252b46',
                },
                'customgray': {
                    50: '#fbfbfb',
                    500: '#727673',
                    100: '#f6f6f6'
                },
                'keppel': {
                    '50': '#effefb',
                    '100': '#c7fff3',
                    'cta-disable': '#c7fff3',
                    '200': '#90ffe8',
                    'card-bg': '#90ffe8',
                    '300': '#51f7db',
                    '400': '#1de4c9',
                    'cta-disable-text': '#1de4c9',
                    '500': '#04c8b0',
                    'cta-bg': '#04c8b0',
                    '600': '#00ad9c',
                    'cta-hover': '#00ad9c',
                    '700': '#058075',
                    'cta-active': '#058075',
                    '800': '#0a655e',
                    '900': '#0d544e',
                    '950': '#003332',
                    'cta-text': '#003332'
                },
                'cobalt': {
                    '50': '#ebf8ff',
                    '100': '#d1f1ff',
                    '200': '#aee7ff',
                    '300': '#76daff',
                    '400': '#35c3ff',
                    '500': '#079fff',
                    '600': '#0079ff',
                    '700': '#0060ff',
                    '800': '#004fd7',
                    '900': '#004aad',
                    '950': '#062c65',
                },
                'tahiti': {
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
            }
        },
    },

    plugins: [forms],
};
