/** @type {import('next').NextConfig} */

// this is only used when deploying to production
const nextConfigProd = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: '/pages/174A/ammos-smallsat-toolkit-configurator/',
  basePath: '/pages/174A/ammos-smallsat-toolkit-configurator',
  images: {
    loader: 'akamai',
    path: '',
  }
}

// this is for testing in the dev environment; this should be the default
const nextConfigDev = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  }
}

// switch between nextConfigDev and nextConfigProd 
// switch to prod when deploying to github pages, then always switch back to dev (or undo, just make sure not to commit 'module.exports = nextConfigProd')
// after switching, do 'yarn build' then 'yarn next dev'
module.exports = nextConfigDev
