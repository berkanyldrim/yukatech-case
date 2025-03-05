import { createSystem, defaultConfig } from "@chakra-ui/react";

import { fonts } from "./font";

const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts,
    },
  },
});

export default customTheme;
