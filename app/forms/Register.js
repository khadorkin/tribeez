import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'
import {Link} from 'react-router'

import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import TextField from 'material-ui/lib/text-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'

import SelectField from './components/SelectField'
import CityField from './components/CityField'

import Captcha from './components/Captcha'

import currencies from '../resources/currencies'
import langs from '../resources/langs'
import {TRIBE_TYPES} from '../constants/product'

import styles from '../constants/styles'

import postRegister from '../actions/postRegister'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(postRegister)(event)
      .catch((errors) => {
        const field = Object.keys(errors)[0]
        if (field && field !== '_error') {
          const node = ReactDOM.findDOMNode(this.refs[field].refs.input)
          if (node) {
            if (node.nodeName === 'INPUT') {
              node.focus()
            } else {
              node.scrollIntoView()
            }
          }
        }
      })
    this.refs.captcha.reset()
  }

  render() {
    const {fields: {name, email, password, lang, tribe_name, tribe_type, city, currency, captcha}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle title="You" />
        <CardText>
          <TextField ref="name"
            style={styles.field}
            floatingLabelText="Your name"
            required={true}
            errorText={name.touched && name.error && <FormattedMessage id="error.name" />}
            {...name}
          />
          <TextField ref="email"
            style={styles.field}
            type="email"
            required={true}
            floatingLabelText="Email"
            errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + email.error} />}
            {...email}
          />
          <TextField ref="password"
            style={styles.field}
            type="password"
            required={true}
            floatingLabelText="Password"
            errorText={password.touched && password.error && <FormattedMessage id="error.login.password" />}
            {...password}
          />
          <SelectField ref="lang"
            style={styles.field}
            floatingLabelText="Language"
            errorText={lang.touched && lang.error && <FormattedMessage id="error.lang" />}
            {...lang}
          >
            {langItems}
          </SelectField>
        </CardText>
        <CardTitle title="Your tribe" />
        <CardText>
          <TextField ref="tribe_name"
            style={styles.field}
            floatingLabelText="Tribe name"
            required={true}
            errorText={tribe_name.touched && tribe_name.error && <FormattedMessage id="error.tribe_name" />}
            {...tribe_name}
          />
          <SelectField
            style={styles.field}
            floatingLabelText="Type"
            errorText={tribe_type.touched && tribe_type.error && <FormattedMessage id="error.tribe_type" />}
            {...tribe_type}
          >
            {typeItems}
          </SelectField>
          <CityField ref="city"
            style={styles.field}
            floatingLabelText="City"
            required={true}
            errorText={city.touched && city.error && <FormattedMessage id="error.city" />}
            {...city}
          />
          <SelectField
            style={styles.field}
            floatingLabelText="Currency"
            errorText={currency.touched && currency.error && <FormattedMessage id="error.currency" />}
            {...currency}
          >
            {currencyItems}
          </SelectField>
        </CardText>
        <CardActions style={styles.actions}>
          <Captcha ref="captcha"
            errorText={captcha.error && <FormattedMessage id="error.captcha" />}
            {...captcha}
          />
          <RaisedButton label="Register & create this tribe" type="submit" />
          <p className="error">
            {error && <FormattedMessage id={error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  initialValues: PropTypes.object,
}

const mapStateToProps = (state) => ({
  initialValues: {lang: state.app.lang},
})

export default reduxForm({
  form: 'register',
  fields: ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha'],
  returnRejectedSubmitPromise: true,
}, mapStateToProps)(RegisterForm)
