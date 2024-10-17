import type { Config } from "tailwindcss";
const lineClamp = require('@tailwindcss/line-clamp');
// import lineClamp from '@tailwindcss/line-line-clamp';

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        primary: "#E0E0E0",
        secondary: "#CE2225",
        third: "#D8D8D8",
        transparentmenu: "rgba(0, 0, 0, 0.60)",
      },
      fontSize: {
        '10xl': '10.5rem',
      },
    },
  },
  plugins: [
    lineClamp
  ],
};

// module.exports = {
//   // ...
//   plugins: [lineClamp],
// };
// export default config;
