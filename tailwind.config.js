/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        logo: [
          'Merienda', 'cursive'
        ],
        general: [
          'Poppins', 'sans-serif'
        ]
      },
      boxShadow: {
        'extra': '0px 0px 28px 0px rgb(184, 162, 162)',
      },
      duration: {
        fast: "1s",
        normal: "3s",
        slow: "5s",
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-glitch"),
  ],
}

