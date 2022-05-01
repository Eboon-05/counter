import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			includeAssets: [
				'robots.txt'
			],
			manifest: {
				name: 'Counter',
				short_name: 'Counter',
				description: 'Just a counter',
				theme_color: '#000000',
				icons: [
					{
						src: 'maskable_icon_x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
				start_url: '/',
				background_color: '#0f00e4'
			},
			strategies: 'injectManifest'
		})
	],
	build: {
		manifest: true
	}
})
