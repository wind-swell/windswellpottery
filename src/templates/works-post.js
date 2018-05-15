import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from "gatsby-image";
import Content, { HTMLContent } from '../components/Content'

export const WorksPostTemplate = ({
  content,
  contentComponent,
  description,
  image,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">

            {image && image.childImageSharp.sizes && <figure className="image">
              <Img sizes={image.childImageSharp.sizes} />
            </figure>}

            <h1 className="title is-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p className="subtitle is-4">{description}</p>

            <PostContent content={content} className="content is-size-5" />

            <Link to="/">Return</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

WorksPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  image: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}

const WorksPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <WorksPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      image={post.frontmatter.image}
      description={post.frontmatter.description}
      helmet={<Helmet title={`${post.frontmatter.title} | Works`} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  )
}

WorksPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default WorksPost

export const pageQuery = graphql`
  query WorksPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        image {
          id
          prettySize
          size
          childImageSharp {
            sizes(maxWidth: 800) {
              ...GatsbyImageSharpSizes_withWebp_noBase64
            }
          }
        }
        title
        description
        tags
      }
    }
  }
`
