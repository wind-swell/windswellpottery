const autoprefixer = require('autoprefixer');
const pixrem = require('pixrem');

module.exports = {
  siteMetadata: {
    title: 'Wind Swell',
  },
  plugins: [
    'gatsby-plugin-lodash',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // gatsby-remark-relative-images must
          // go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              // Set the name option to the same
              // name you set for gatsby-source-filesystem
              name: 'images',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-postcss-sass',
      options: {
        postCssPlugins: [
          pixrem(),
          autoprefixer({
            browsers: ['last 2 versions']
          }),
        ],
        precision: 8,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
      // options: {
      //   headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
      //   allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
      //   mergeSecurityHeaders: true, // boolean to turn off the default security headers
      //   mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
      //   mergeCachingHeaders: true, // boolean to turn off the default caching headers
      //   transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      //   generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      // },
    },
  ],
}
