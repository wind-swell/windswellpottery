const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    const pages = posts.map(edge => {
      const id = edge.node.id
      return createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    // Iterate through each post, putting all found tags into `tags`
    // Eliminate duplicate tags
    const tags = [...posts
      .reduce((memo, edge) => {
        (_.get(edge, `node.frontmatter.tags`) || []).forEach(tag => memo.add(tag))
        return memo
      }, new Set())]

    const tagPages = tags.map(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      return createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })


    return Promise.all([...pages, ...tagPages])
  })
}

exports.onCreateNode = ({
  node,
  getNode,
  loadNodeContent,
  boundActionCreators,
}) => {
  const { createNodeField } = boundActionCreators

  const { frontmatter } = node
  if (frontmatter) {
    const { image } = frontmatter
    if (image) {
      if (image.indexOf('/img') === 0) {
        frontmatter.image = path.relative(
          path.dirname(node.fileAbsolutePath),
          path.join(__dirname, '/static/', image)
        )
      }
    }
  }

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
