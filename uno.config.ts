import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
} from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        "meteor-icons": () =>
          import("@iconify-json/meteor-icons/icons.json").then(
            (i) => i.default,
          ),
      },
    }),
    presetWind3(),
    presetTypography(),
  ],
});
