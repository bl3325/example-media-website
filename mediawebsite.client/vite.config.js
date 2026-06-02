import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/Account': {
                target: 'https://localhost:7073',
                changeOrigin: true,
                secure: false
            },
            '/api': {
                target: 'https://localhost:7073',
                changeOrigin: true,
                secure: false
            }
        }
    }
})