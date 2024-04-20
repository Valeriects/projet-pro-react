import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: true, // rend le serveur initialisé par vite disponible sur le réseau local
    // port: 9500, // modification du port par défaut (5173)
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        // target: "http://localhost:9000",
        changeOrigin: true,
      }
    }
  }
})
