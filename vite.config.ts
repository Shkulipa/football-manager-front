import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePluginFonts } from 'vite-plugin-fonts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths({ root: './' }),
		VitePluginFonts({
			custom: {
				families: [
					{
						name: 'springwood',
						local: 'springwood',
						src: 'src/assets/styles/fonts/springwood/springwood.otf'
					}
				],
        display: 'auto',
        preload: true,
        injectTo: 'body',
			}
		})
	]
});
