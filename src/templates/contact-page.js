// Form submission handled by netlify
// https://www.netlify.com/docs/form-handling/

import React from 'react'
import PropTypes from 'prop-types'
import Content, { HTMLContent } from '../components/Content'

export const ContactPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              <form name="contact" data-netlify="true" netlify-honeypot="text">
                <p class="hidden">
                  <input name="text" />
                </p>
                <p>
                  <label>
                    Name <input type="text" name="name" />
                  </label>
                </p>
                <p>
                  <label>
                    Email <input type="email" name="email" />
                  </label>
                </p>
                <p>
                  <label>
                    Message <textarea rows="10" cols="50" name="message" />
                  </label>
                </p>
                <p>
                  <button type="submit">Send</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ContactPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const ContactPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <ContactPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
}

ContactPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`
