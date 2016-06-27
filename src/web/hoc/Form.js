import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import styles from '../styles'

const isFieldModified = (field) => {
  if (field.name) {
    if ((field.value || '') !== (field.initialValue || '')) {
      return true
    }
  } else { // => deep field (array or map) => recurse on each key
    for (const subfield in field) {
      if (isFieldModified(field[subfield])) {
        return true
      }
    }
  }
  return false
}

class Form extends Component {
  static propTypes = {
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
      if (isFieldModified(fields[field])) {
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
            {error && <FormattedMessage id={'error.' + error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

export default Form
