import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Img from "gatsby-image";
import StackGrid, { transitions, easings } from "react-stack-grid";
import _ from 'lodash'

const transition = transitions.fade;

export default class IndexPage extends React.Component {
  renderItemsGrid() {
      const { data } = this.props
      const { edges: posts } = data.allMarkdownRemark

      const items = posts.map(({ node: post }) => (
        <Link className="content has-text-primary" to={post.fields.slug}>
          <figure
            key={post.id}
            className="image"
          >
            <Img sizes={post.frontmatter.image.childImageSharp.sizes} />
            <figcaption>{post.frontmatter.title}</figcaption>
          </figure>
        </Link>
      ))

      return (
        <StackGrid
          monitorImagesLoaded
          columnWidth={400}
          duration={700}
          gutterWidth={15}
          gutterHeight={15}
          easing={easings.cubicOut}
          appearDelay={70}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
        >
          {items}
        </StackGrid>
      )
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <div className="container">

        </div>
          {this.renderItemsGrid()}
      </section>
    )
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
                sizes(maxWidth: 700) {
                  ...GatsbyImageSharpSizes_noBase64
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
