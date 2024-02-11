/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  safelist: [
    'bg-red-400',
    'bg-red-600',
    'bg-red-700',
    'bg-red-800',
    'bg-orange-400',
    'bg-orange-600',
    'bg-orange-700',
    'bg-orange-800',
    'bg-yellow-400',
    'bg-yellow-600',
    'bg-yellow-700',
    'bg-yellow-800',
    'bg-green-400',
    'bg-green-600',
    'bg-green-700',
    'bg-green-800',
    'bg-blue-400',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-cyan-400',
    'bg-cyan-600',
    'bg-cyan-700',
    'bg-cyan-800',
    'bg-violet-700',
    'bg-violet-600',
    'bg-violet-800',
    'bg-violet-400',
    'hover:bg-red-400',
    'bg-neutral-600'
  ],
  theme: {
    extend: {
      boxShadow: {
        'nodir': '0 0 20px 5px rgba(0, 0, 0, 0.2)',
        'below': '0 8px 8px 2px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

