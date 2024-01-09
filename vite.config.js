import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import fs from 'fs';

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     https: {
//       key: fs.readFileSync('./.cert/key.pem'),
//       cert: fs.readFileSync('./.cert/cert.pem'),
//     },
//   },
//   plugins: [react()],
// });
