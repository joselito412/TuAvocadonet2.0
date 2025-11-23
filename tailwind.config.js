/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6AAE7D',    // Green - Trust & Growth
        secondary: '#4065B9',  // Blue - Professionalism
        accent: '#F20746',     // Pink - Modernity & Energy
        highlight: '#EAD476',  // Yellow - Optimism
        action: '#FD6433',     // Orange - Call to Action
        dark: '#2c3e50',
        light: '#f8f9fa',
      },
      fontFamily: {
        heading: ['Comfortaa', 'cursive'],
        body: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(0,0,0,0.08)',
        'hover': '0 15px 35px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
