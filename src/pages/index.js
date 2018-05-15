import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from "gatsby-image";
import _ from 'lodash'

// stack grid breaks SSR
let StackGrid = null
if (typeof window !== `undefined`) {
  StackGrid = require("react-stack-grid").default;
}

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    // Custom server render
    if (typeof window == `undefined`) {
      const items = posts.slice(0, 4).map(({ node: post }) => (
        <Link key={post.id} to={post.fields.slug}>
          <figure className="image">
          <Img sizes={post.frontmatter.image.childImageSharp.sizes} />
            <figcaption>{post.frontmatter.title}</figcaption>
          </figure>
        </Link>
      ))

      return (
        <div style={{ visibility: 'hidden' }}>
          {items}
        </div>
      )
    }

    const items = posts.map(({ node: post }) => (
      <Link key={post.id} className="content has-text-primary" to={post.fields.slug}>
        <figure className="image">
          <Img alt={post.frontmatter.title} sizes={post.frontmatter.image.childImageSharp.sizes} />
        </figure>
      </Link>
    ))

    return (
      <StackGrid
        monitorImagesLoaded
        columnWidth={400}
        duration={0}
        gutterWidth={15}
        gutterHeight={15}
      >
        {items}
      </StackGrid>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {frontmatter: {templateKey: {eq: "works-post"}}}) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            image {
              id
              prettySize
              size
              childImageSharp {
                sizes(maxWidth: 500) {
                  ...GatsbyImageSharpSizes_withWebp_noBase64
                }
              }
            }
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
