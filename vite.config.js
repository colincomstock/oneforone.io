import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Ensure all JS files have .js extension
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Ensure proper module format
        format: 'es',
        exports: 'named'
      }
    }
  },
  base: './', // Ensures assets work with relative paths
  esbuild: {
    // Ensure JSX is transformed properly
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Force target to ensure compatibility
    target: 'es2020'
  },
  resolve: {
    // Ensure proper extension resolution
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
})
