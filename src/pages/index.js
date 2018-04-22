import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import _ from 'lodash'

export default class IndexPage extends React.Component {
  renderItemsGrid() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return _.flatMap(
      _.chunk(posts, 2),
      (postsRow, i) => (
        <div key={`row-${i}`} className="columns">
          {postsRow.map(({ node: post }) => (
            <div
              className="column is-6"
              key={post.id}
            >
                <Link className="content has-text-primary" to={post.fields.slug}>
                  <div className="card">

                    <div className="card-image">
                      <figure className="image">
                        <div style={{ backgroundImage: `url(${post.frontmatter.image})`, backgroundSize: 'cover', height: '22em' }} />
                      </figure>
                    </div>
                      <p className="subtitle">{post.frontmatter.title}</p>
                  </div>
                </Link>
            </div>
          ))}
        </div>
      )
    )
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            {/*<h1 className="has-text-weight-bold is-size-2">Latest Stories</h1>*/}
          </div>
          {this.renderItemsGrid()}
        </div>
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter:  { templateKey: { eq: "works-post" }}}
    ) {
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
            image
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
