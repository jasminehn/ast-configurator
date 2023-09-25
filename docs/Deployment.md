# Deployment

1. `cd app && yarn build`
2. `yarn next export`

This creates an `out` directory within `app`. The contents of this directory can then be hosted somewhere. If you want to, you can even use GitHub Pages to create a developer preview, but it requires changes to the `next.config.js` before build and export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: '/pages/174A/ammos-smallsat-toolkit-configurator/',
  basePath: '/pages/174A/ammos-smallsat-toolkit-configurator'
}

module.exports = nextConfig
```

The `assetPrefix` and `basePath` are needed because GitHub Pages does not serve from the root path. If deploying onto root path (ex. `cloud.ammos.nasa.gov`) these parameters aren't needed.

Note: you will also need to add a special `.nojekyll` file to the `out/` directory before deploying to GitHub pages to prevent GitHub from attempting to render the content with Jekyll.

What I use to quickly deploy to pages: `yarn gh-pages -d out -b gh-pages`
