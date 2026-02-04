import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: "#d64c2d",
        orangeLight: "#ed9682",
        orangeDark: "#7d230f",
        green: "#2db777",
        greenLight: "#6fe8b0",
        greenDark: "#0f7d4e",
        charcoal: "#111",
        charcoalMid: "#2b2b2b",
        offWhite: "#CCCCCC",
        offWhiteLight: "#E5E5E5",
      },
    },
  },
  plugins: [],
}
export default config
