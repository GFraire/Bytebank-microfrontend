/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004D61",
        secondary: "#FF5031",
        background: "#E4EDE3",
        error: "#BF1313",
        green: "#47A138",
        "green-light": "#E4EDE3",
        white: "#F5F5F5",
        "gray-300": "#CBCBCB",
        "gray-500": "#444444",
        "gray-600": "#8B8B8B",
        "gray-700": "#767676",
      },
    },
  },
  plugins: [],
}

