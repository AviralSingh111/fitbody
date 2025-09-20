import { logger as rnLogger } from 'react-native-logs';
import Constants from 'expo-constants';

const isDev = Constants.expoConfig?.extra?.environment === 'development';

export const logger = rnLogger.createLogger({
  severity: isDev ? rnLogger.consoleTransport.LogLevel.Debug : rnLogger.consoleTransport.LogLevel.Error,
  transport: rnLogger.consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
});