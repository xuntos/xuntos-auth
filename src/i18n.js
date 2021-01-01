import { I18n } from 'i18n'
import logger from './logger'
import config from './config'

export default new I18n({
  defaultLocale: 'en',
  locales: ['en', 'pt-BR'],
  directory: config.i18n.localeDirectory,
  logDebugFn: logger.debug,
  logWarnFn: logger.warn,
  logErrorFn: logger.error
})
