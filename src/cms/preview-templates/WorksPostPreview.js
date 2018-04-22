import React from 'react'
import PropTypes from 'prop-types'
import { WorksPostTemplate } from '../../templates/works-post'

const WorksPostPreview = ({ entry, widgetFor }) => (
  <WorksPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

worksPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default worksPostPreview
