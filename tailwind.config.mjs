/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    	extend: {}
    },
	plugins: [require("tailwindcss-animate"), daisyui],
	daisyui: {
		logs: false,
		themes: [
			{
				autumn: {
					...require("daisyui/src/theming/themes")["autumn"],	
					primary: "#9CAFAA",
					secondary: "#D6DAC8",
					accent: "#EFBC9B",
					neutral: "#FBF3D5",
				},
				luxury: {
					...require("daisyui/src/theming/themes")["luxury"],	
				}
			}
		],
		styled: true,
	  },
}
