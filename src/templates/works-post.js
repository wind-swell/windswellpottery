import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase, get } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from "gatsby-image";
import Content, { HTMLContent } from '../components/Content'

const getImageSizes = (node = {}) => get(node, 'childImageSharp.sizes', {})

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

  // <Img imgStyle={{ display: 'none' }} sizes={image.childImageSharp.sizes} onLoad={function(...args) {
  //   console.log(args, this)
  // }}/>

  const sizes = getImageSizes(image)

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        {image && <figure className="image">
          <div className="work-image" style={{
            backgroundImage: `url(${sizes.src})`,
            height: sizes.aspectRatio < 1
              ? `700px`
              : '500px',
            // paddingBottom: `${image.childImageSharp.sizes.aspectRatio * 10}%`
          }} />
        </figure>}

        <div className="work-info">
          <h1 className="title is-5 has-text-weight-bold is-bold-light">
            {title}
          </h1>
          <p className="subtitle is-5">{description}</p>
          <PostContent content={content} className="content is-size-5" />
          <Link to="/">Return</Link>
        </div>

      </div>
    </section>
  )
}

WorksPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      sizes: PropTypes.object
    })
  }),
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.node,
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
