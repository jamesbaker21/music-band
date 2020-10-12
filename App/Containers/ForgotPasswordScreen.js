import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity, Platform, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import { Images, Colors } from '../Themes'
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BottomButton from '../Components/BottomButton'

// Styles
import styles from './Styles/ForgotPasswordScreenStyle'
import RoundedInput from '../Components/RoundedInput'
import { Actions, ActionConst } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Validator from '../Lib/Validator'
import Api from '../Services/Api'
import Loading from 'react-native-loader-overlay'
import { showError, showAlert } from '../Lib/MessageBar'

const api = Api.create()

class ForgotPasswordScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      errors: null
    }
  }

  onSendEmailPress () {
    const { email } = this.state
    let rules = {
      email: 'required|email'
    }
    let validation = new Validator({ email }, rules)
    validation.setAttributeNames({
      email: I18n.t('email')
    })
    if (validation.fails()) {
      this.setState({ errors: validation.errors })
      return false
    }
    this.setState({ errors: null })
    this.onSendEmail()
  }

  async onSendEmail () {
    const { email } = this.state
    const loader = Loading.show({ size: 15, backgroundColor: Colors.cloud })
    const response = await api.forgotPassword(email)
    __DEV__ && console.log('Forgot password response', response)
    Loading.hide(loader)
    if (response.ok) {
      showAlert({message: I18n.t('emailHasSentPleaseCheckYourInbox')})
      Actions.pop()
    } else {
      showError(response.data)
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={Actions.pop}>
                <Image source={Images.back} style={styles.icon} />
              </TouchableOpacity>
              <View style={styles.centered}>
                <Image source={Images.logo} style={styles.logo} />
              </View>

              <View style={styles.middleSection} >
                <RoundedInput
                  value={this.state.email}
                  placeholder={I18n.t('email')}
                  icon={Images.iconMail}
                  onChangeText={text => this.setState({ email: text })}
                  error={this.state.errors && this.state.errors.first('email')}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  keyboardType={'email-address'}
                />
              </View>

              <BottomButton text={I18n.t('sendEmail')} onPress={() => this.onSendEmailPress()} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
