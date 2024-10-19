import lineClamp from '@tailwindcss/line-clamp';
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
      backgroundImage: {
        'gradient-r': 'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(181,181,181,0.6419817927170868) 58%)',
        'gradient-l': 'linear-gradient(90deg, rgba(181,181,181,0.6419817927170868) 58%, rgba(255,255,255,1) 100%);',
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
