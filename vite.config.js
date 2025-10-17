import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        buy: resolve(__dirname, 'buy.html'),
        detailVoucher: resolve(__dirname, 'detail-voucher.html'),
        extendVoucher: resolve(__dirname, 'extend-voucher.html'),
        verification: resolve(__dirname, 'verification.html'),
      },
    },
  },
})
