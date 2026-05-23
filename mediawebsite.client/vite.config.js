import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/Account': {
                target: 'https://localhost:7073', // set to your backend HTTPS port
                changeOrigin: true,
                secure: false
            }
        }
    }
})