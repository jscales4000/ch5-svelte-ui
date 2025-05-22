/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // Flowbite preset colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0C234B', // UA Blue
          800: '#075985',
          900: '#0c4a6e'
        },
        // UA brand colors
        ua: {
          blue: '#0C234B',
          red: '#AB0520',
          desertsand: '#F4EFE1',
          copper: '#8B6F4B',
          azurite: '#1E5288',
          oasis: '#378DBD',
          sage: '#7A9A01',
          turquoise: '#70B865',
          chili: '#E4391B',
          bloom: '#FF7B89',
          reef: '#D23153',
          cactus: '#5B6236'
        }
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms')
  ],
  darkMode: 'class'
}
