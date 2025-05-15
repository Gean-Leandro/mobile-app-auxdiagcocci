/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mygray: {
          900: "#1B1A1A",
          800: "#3A3A3A",
          700: "#5B5B5B",
          600: "#8A8A8A",
          500: "#AFAFAF",
          400: "#CECECE",
          300: "#E2E2E2",
          200: "#F0F0F0",
        },
      },
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