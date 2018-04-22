// Form submission handled by netlify
// https://www.netlify.com/docs/form-handling/

// TODO make it work better
// https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/
// https://github.com/imorente/gatsby-netlify-form-example/blob/master/src/pages/contact.js

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
                <div className="field hidden">
                  <input name="text" />
                </div>

                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input" type="text" />
                  </div>
                </div>


                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input className="input" type="email" />
                  </div>
                </div>


                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea className="textarea"></textarea>
                  </div>
                </div>


                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link">Submit</button>
                  </div>
                </div>
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
