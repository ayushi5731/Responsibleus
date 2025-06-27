// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
//   content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


















/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",          // ← include your app/ folder
    "./components/**/*.{js,jsx,ts,tsx}",   // ← existing components folder
    // add any other folders where you use className, e.g.:
    // "./screens/**/*.{js,jsx,ts,tsx}",
    // "./features/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
