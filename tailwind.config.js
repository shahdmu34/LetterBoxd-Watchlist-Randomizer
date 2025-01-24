/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors:{
        custom:{
          lightbg: '#F9F8F4', //main background 
          brGreen: '#AAFFAA',
          
        }
      },
      fontFamily:{
        BreeSerif:["Bree Serif", "serif"],

      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
}

