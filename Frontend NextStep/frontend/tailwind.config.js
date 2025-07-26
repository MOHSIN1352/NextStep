// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your files
//   theme: {
//     extend: {
//       fontFamily: {
//         dynapuff: ["DynaPuff", "cursive"],
//         firacode: ["Fira Code", "monospace"],
//         ubuntumono: ["Ubuntu Sans Mono", "monospace"],
//         helvita: ["helvitaRegular", "sans-serif"],
//         helvitaLight: ["helvitaLight", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure Tailwind scans your files
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ["DynaPuff", "cursive"],
        firacode: ["Fira Code", "monospace"],
        ubuntumono: ["Ubuntu Sans Mono", "monospace"],
        helvita: ["HelvitaRegular", "sans-serif"], // Corrected name
        helvitaLight: ["HelvitaLight", "sans-serif"], // Corrected name
      },
    },
  },
  plugins: [],
};
