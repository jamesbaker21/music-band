import { MessageBarManager } from 'react-native-message-bar'
import I18n from 'react-native-i18n'

export const showError = data => {
  const message = data && data.message
    ? data.message
    : I18n.t('cannotConnectToServer')

  MessageBarManager.showAlert({
    viewTopInset: 15,
    title: I18n.t('musicBands'),
    message: message,
    alertType: 'error'
  })
}

export const showAlert = data => {
  const { message } = data
  MessageBarManager.showAlert({
    viewTopInset: 15,
    title: I18n.t('musicBands'),
    message: message,
    alertType: 'aler'
  })
}
