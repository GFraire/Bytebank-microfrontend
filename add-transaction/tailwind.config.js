// Este arquivo deve ser alterado somente em /tailwind-config/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Escaneia todos os arquivos TS/JS no src
    './public/index.html', // Inclui o index.html, se usado
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      colors: {
        primary: "#004D61",
        secondary: "#FF5031",
        background: "#E4EDE3",
        error: "#BF1313",
        green: "#47A138",
        "green-light": "#E4EDE3",
        "green-btn": "#16A34A", // acessibility improvement
        white: "#F5F5F5",
        "gray-300": "#CBCBCB",
        "gray-500": "#444444",
        "gray-600": "#8B8B8B",
        "gray-700": "#767676",
      },
      screens: {
        tablet: { max: '1080px' },
        mobile: { max: '620px' },
      },
      fontSize: {
        "heading-sm": "1.9375rem", // 31px
        "display-xl": "1.75rem", // 28px
        "display-lg": "1.5625rem", // 25px
        "display-md": "1.25rem", // 20px
        subtitle: "1.125rem", // 18px
        body: "1rem", // 16px
        "caption ": "0.875rem", // 14px
        "caption-sm ": "0.8125rem", // 13px
      }
    },
  },
  plugins: [],
};