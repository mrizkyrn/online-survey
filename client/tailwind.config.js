/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            dark: '#0e131c',
            semiDark: '#17202e',
            light: '#f5f5f5',
            primary: '#291c73',
            secondary: '#fbbc05',
          },
      },
   },
   plugins: [],
};
