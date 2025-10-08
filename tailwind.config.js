/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts}"],
    theme: {
      extend: {
        borderRadius: { 'card': 'var(--radius)' },
      },
    },
    plugins: [],
  }
  