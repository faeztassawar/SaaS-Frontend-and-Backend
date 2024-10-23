import { DM_Sans, Orbitron } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primaryTem2: '#800000',
				bgTemp2 :'#ecf1d8'
			},
			fontFamily: {
				chillax: ["var(--font-chil)"],
				rose: ["var(--font-rose)"],
				Orbitron: ["var(--font-ob)"],
				DM_Sans: ["var(--font-dm)"]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
