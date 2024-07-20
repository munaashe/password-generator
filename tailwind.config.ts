import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "green": "#A4FFAF",
        "red": "#F64A4A",
        "orange": "#FB7C58",
        "yellow": "#F8CD64",
        "black": "#18171F",
        "gray-1": "#E6E5EA",
        "gray-2": "#817D92",
        "gray-3": "#24232C",
      }
    },
  },
  plugins: [],
};
export default config;
