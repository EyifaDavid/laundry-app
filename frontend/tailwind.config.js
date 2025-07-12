/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","node_modules/flowbite-react/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xsm: '950px',      // your custom small desktop range
        xlg: '1039px',     // custom large end of the range
      },
    },
  },
  plugins: [import("flowbite/plugin")],
};
