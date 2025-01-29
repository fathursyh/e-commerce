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
				light: {
					...require("daisyui/src/theming/themes")["light"],	
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],	
				}
			}
		],
		styled: true,
	  },
}
