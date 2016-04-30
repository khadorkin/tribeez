import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardText, CardActions} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import currencies from '../resources/currencies'
import {TRIBE_TYPES} from '../constants/product'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import submitTribe from '../actions/submitTribe'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class TribeForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setHook(() => !this.props.submitting && modified(this.props.fields))
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitTribe)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {tribe_name, tribe_type, city, currency}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="tribe_name"
            required={true}
            {...tribe_name}
          />
          <SelectField ref="tribe_type"
            {...tribe_type}
          >
            {typeItems}
          </SelectField>
          <CityField ref="city"
            required={true}
            {...city}
          />
          <SelectField ref="currency"
            {...currency}
          >
            {currencyItems}
          </SelectField>
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.tribe.' + this.props.type} />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

TribeForm.propTypes = {
  // from parent component:
  type: PropTypes.string.isRequired,
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  initialValues: PropTypes.object,
}

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    currency: state.member.tribe.currency,
  }
  if (ownProps.type === 'update') {
    initialValues.tribe_name = state.member.tribe.name
    initialValues.tribe_type = state.member.tribe.type
    initialValues.city = {
      name: state.member.tribe.city,
      country_code: state.member.tribe.country_code,
      place_id: state.member.tribe.place_id,
    }
    initialValues.id = state.member.tribe.id
  }
  return {
    initialValues,
  }
}

export default reduxForm({
  form: 'tribe',
  fields: ['id', 'tribe_name', 'tribe_type', 'city', 'currency'],
  returnRejectedSubmitPromise: true,
  validate: validator.tribe,
}, mapStateToProps)(TribeForm)
