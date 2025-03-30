import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [
    alpinejs(),
    UnoCSS({
      injectReset: true,
    }),
  ],
});
