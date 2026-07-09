import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    base: '/react_todo_app/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
