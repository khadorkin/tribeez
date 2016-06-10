import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles'

class Form extends Component {
  constructor(props) {
    super(props)
    this.modified = this.modified.bind(this)
  }

  componentDidMount() {
    if (this.props.setHook) {
      this.props.setHook(() => !this.props.submitting && this.modified())
    }
  }

  modified() {
    const {fields} = this.props
    for (const field in fields) {
      if ((fields[field].value || '') !== (fields[field].initialValue || '')) {
        return true
      }
    }
    return false
  }

  render() {
    const {title, subtitle, onSubmit, children, name, submitting, error} = this.props

    let header = null
    if (title || subtitle) {
      header = <CardTitle title={title} subtitle={subtitle} />
    }

    return (
      <form onSubmit={onSubmit}>
        {header}
        <CardText>
          {children}
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.' + name} />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

Form.propTypes = {
  // from parent component:
  setHook: PropTypes.func,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fields: PropTypes.object.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default Form
