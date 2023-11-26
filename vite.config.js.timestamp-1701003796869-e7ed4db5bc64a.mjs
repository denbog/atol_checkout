// vite.config.js
import { defineConfig } from "file:///F:/website_layout/atol_checkout/node_modules/vite/dist/node/index.js";
import path from "path";
import vituum from "file:///F:/website_layout/atol_checkout/node_modules/vituum/src/index.js";
import twig from "file:///F:/website_layout/atol_checkout/node_modules/@vituum/vite-plugin-twig/index.js";
var vite_config_default = defineConfig({
  plugins: [
    vituum({
      pages: {
        dir: "./src/views",
        normalizeBasePath: true
      }
    }),
    twig({
      root: "./src"
    })
  ],
  base: "",
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ["node_modules"]
      }
    }
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: ["./src/views/**/*.{json,twig,html}"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx3ZWJzaXRlX2xheW91dFxcXFxhdG9sX2NoZWNrb3V0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFx3ZWJzaXRlX2xheW91dFxcXFxhdG9sX2NoZWNrb3V0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi93ZWJzaXRlX2xheW91dC9hdG9sX2NoZWNrb3V0L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHZpdHV1bSBmcm9tICd2aXR1dW0nXHJcbmltcG9ydCB0d2lnIGZyb20gJ0B2aXR1dW0vdml0ZS1wbHVnaW4tdHdpZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdml0dXVtKHtcclxuICAgICAgICAgICAgcGFnZXM6IHtcclxuXHRcdFx0XHRkaXI6ICcuL3NyYy92aWV3cycsXHJcbiAgICAgICAgICAgICAgICBub3JtYWxpemVCYXNlUGF0aDogdHJ1ZVxyXG5cdFx0XHR9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdHdpZyh7XHJcblx0XHRcdHJvb3Q6ICcuL3NyYycsXHJcblx0XHR9KVxyXG4gICAgXSxcclxuICAgIGJhc2U6ICcnLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMnKSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgICAgICAgaW5jbHVkZVBhdGhzOiBbJ25vZGVfbW9kdWxlcyddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGlucHV0OiBbJy4vc3JjL3ZpZXdzLyoqLyoue2pzb24sdHdpZyxodG1sfSddXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVIsU0FBUyxvQkFBb0I7QUFDbFQsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsT0FBTztBQUFBLFFBQ2YsS0FBSztBQUFBLFFBQ08sbUJBQW1CO0FBQUEsTUFDaEM7QUFBQSxJQUNLLENBQUM7QUFBQSxJQUNELEtBQUs7QUFBQSxNQUNWLE1BQU07QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNDO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxLQUFLO0FBQUEsSUFDMUM7QUFBQSxFQUNKO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNqQixNQUFNO0FBQUEsUUFDRixjQUFjLENBQUMsY0FBYztBQUFBLE1BQ2pDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxNQUNYLE9BQU8sQ0FBQyxtQ0FBbUM7QUFBQSxJQUMvQztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
