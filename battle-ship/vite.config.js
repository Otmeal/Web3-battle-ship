import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
resolve: {
    alias: {
      // 提供瀏覽器兼容版本或者使用空實現
      'crypto': 'crypto-browserify',
      'http': 'stream-http',
      'https': 'https-browserify',
      'zlib': 'browserify-zlib'
    }
}})
