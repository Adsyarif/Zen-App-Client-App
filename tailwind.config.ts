import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      theme: {
        extend: {},
        colors: {
          darkGreen: "#055254",
          lightGreen: "#5FA09D",
          cream: "#F4E9B2",
          mocca: "#FAF6E3",
          leaf: "#22543D",
        },
      },
    },
  },
  plugins: [],
};
export default config;
