// vite.config.ts
import { vitePlugin as remix } from "file:///app/sample_remix_react/node_modules/@remix-run/dev/dist/index.js";
import { defineConfig } from "file:///app/sample_remix_react/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///app/sample_remix_react/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true
      }
    }),
    tsconfigPaths()
  ],
  server: {
    // proxy: {},
    watch: {
      usePolling: true
    },
    // NOTE:HTTPSサーバーを起動するための設定
    https: {
      key: "./certs/key.pem",
      cert: "./certs/cert.pem"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL3NhbXBsZV9yZW1peF9yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC9zYW1wbGVfcmVtaXhfcmVhY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2FwcC9zYW1wbGVfcmVtaXhfcmVhY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnQHJlbWl4LXJ1bi9ub2RlJyB7XHJcbiAgaW50ZXJmYWNlIEZ1dHVyZSB7XHJcbiAgICB2M19zaW5nbGVGZXRjaDogdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVtaXgoe1xyXG4gICAgICBmdXR1cmU6IHtcclxuICAgICAgICB2M19mZXRjaGVyUGVyc2lzdDogdHJ1ZSxcclxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcclxuICAgICAgICB2M190aHJvd0Fib3J0UmVhc29uOiB0cnVlLFxyXG4gICAgICAgIHYzX3NpbmdsZUZldGNoOiB0cnVlLFxyXG4gICAgICAgIHYzX2xhenlSb3V0ZURpc2NvdmVyeTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgdHNjb25maWdQYXRocygpLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyBwcm94eToge30sXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICB1c2VQb2xsaW5nOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIC8vIE5PVEU6SFRUUFNcdTMwQjVcdTMwRkNcdTMwRDBcdTMwRkNcdTMwOTJcdThENzdcdTUyRDVcdTMwNTlcdTMwOEJcdTMwNUZcdTMwODFcdTMwNkVcdThBMkRcdTVCOUFcclxuICAgIGh0dHBzOiB7XHJcbiAgICAgIGtleTogJy4vY2VydHMva2V5LnBlbScsXHJcbiAgICAgIGNlcnQ6ICcuL2NlcnRzL2NlcnQucGVtJyxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVAsU0FBUyxjQUFjLGFBQWE7QUFDM1IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFRMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsUUFDckIsZ0JBQWdCO0FBQUEsUUFDaEIsdUJBQXVCO0FBQUEsTUFDekI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsSUFDZDtBQUFBO0FBQUEsSUFFQSxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
