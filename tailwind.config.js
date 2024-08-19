/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      boxShadow: {
        'searchBox': '0px 1px 2px rgba(46, 45, 55, 0.12)',
      },
      colors: {
        pageBg: '#ecedf2',
      },
    },
  },
  plugins: [],
}

