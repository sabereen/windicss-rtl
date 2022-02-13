# A RTL Plugin for WindiCSS

It supports classes like `ms-3`, `me-2.1`, `-ms-4`, `ps-$myvar`, `pe-50vh`, `start-5`, `end-1/2` ...

## Setup:
in **windi.config.js**:
```js
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  plugins: [
    require('windicss-rtl'),
  ]
})
```
