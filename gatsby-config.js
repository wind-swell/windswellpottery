module.exports = {
  siteMetadata: {
    title: 'Wind Swell',
  },
  plugins: [
    'gatsby-plugin-lodash',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
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
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [],
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
