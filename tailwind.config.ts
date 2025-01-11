import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
  			xs: '375px',
  			xsm: '450px',
  			ssm: '540px',
  			sm: '640px',
  			sml: '700px',
  			md: '768px',
  			smd: '800px',
  			mdl: '890px',
  			lg: '1024px',
  			lgl: '1130px',
  			lgll: '1190px',
  			xlg: '1250px',
  			xl: '1300px',
  			xxl: '1420',
  			'2xl': '1650px'
  		},
    },
  },
  plugins: [],
} satisfies Config;
