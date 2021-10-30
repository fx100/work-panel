import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: [
      'index.html',
      'src/**/*.tsx',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ],
  },
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
        spacing: 'margin, padding',
        size: 'margin, padding, width, height',
      },
    },
  },
})
