/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0B1315',     // Sleek near-black background
                    surface: '#121E21',  // Bento box card backgrounds
                    teal: '#00A896',     // Bright premium accent teal
                    muted: '#64748B',    // Clean gray for text descriptions
                }
            },
        },
    },
    plugins: [],
};