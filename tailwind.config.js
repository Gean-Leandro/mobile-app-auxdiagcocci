/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: "Roboto_400Regular",
        robotoBold: "Roboto_700Bold",
        robotoSerif: "RobotoSerif_400Regular",
        robotoSerifBold: "RobotoSerif_700Bold",
        inter: "Inter_400Regular",
        interBold: "Inter_700Bold",
      },
    },
  },
  plugins: [],
}