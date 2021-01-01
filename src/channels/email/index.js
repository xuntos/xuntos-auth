import path from 'path'
import { renderTemplateFile } from 'template-file'
import nodemailer from 'nodemailer'
import Channel from '../channel'
import config from '../../config'
import i18n from '../../i18n'
import logger from '../../../src/logger'

const getTemplatePath = filename => (path.join(config.templatesDirectory, 'authentication-code/email', filename))

export default class EmailChannel extends Channel {
  static _type = 'email'
  static regex = /^email:(?<key>[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?)$/

  static activated () {
    return config.channels.email.enabled
  }

  static getTransporter () {
    return nodemailer.createTransport(config.channels.email.smtp.uri)
  }

  async getSendMailOpts (authenticationRequest) {
    const bodyTemplateData = {
      yourAuthenticationCode: i18n.__({
        phrase: 'Your authentication code is:',
        locale: authenticationRequest.locale
      }),
      code: authenticationRequest.code,
      footerMsg: i18n.__({
        phrase: 'Use the authorization code to authenticate to the platform.',
        locale: authenticationRequest.locale
      })
    }
    return {
      from: config.channels.email.from,
      to: this.key,
      subject: i18n.__({
        phrase: 'Authentication Code',
        locale: authenticationRequest.locale
      }),
      text: await renderTemplateFile(
        getTemplatePath('body.txt'),
        bodyTemplateData
      ),
      html: await renderTemplateFile(
        getTemplatePath('body.html'),
        bodyTemplateData
      )
    }
  }

  async dispatchCode(authenticationRequest) {
    const sendMailOpts = await this.getSendMailOpts(authenticationRequest)
    const mailInfo = await EmailChannel.getTransporter().sendMail(sendMailOpts)
    logger.info(
      `mail sent with authentication code to authentication request ${authenticationRequest.uuid}`,
      { mailInfo }
    )
    return { success: true, mailInfo }
  }
}
