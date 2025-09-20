import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiCall } from '@/types/api';
import { logger } from '@/utils/logger';

class NetworkLogger {
  private readonly STORAGE_KEY = 'api_logs';
  private readonly MAX_LOGS = 200;

  async logApiCall(apiCall: ApiCall): Promise<void> {
    try {
      // Log to console for immediate debugging
      logger.debug('API Call:', {
        method: apiCall.method,
        url: apiCall.url,
        status: apiCall.statusCode,
        duration: apiCall.duration,
      });

      // Save to local storage
      const existingLogs = await this.getLogs();
      const updatedLogs = [apiCall, ...existingLogs].slice(0, this.MAX_LOGS);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedLogs));

      // Send to backend for shared visibility (optional)
      await this.sendLogToBackend(apiCall);
    } catch (error) {
      logger.error('Failed to log API call:', error);
    }
  }

  async getLogs(): Promise<ApiCall[]> {
    try {
      const logs = await AsyncStorage.getItem(this.STORAGE_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      logger.error('Failed to retrieve logs:', error);
      return [];
    }
  }

  async clearLogs(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
      logger.info('API logs cleared');
    } catch (error) {
      logger.error('Failed to clear logs:', error);
    }
  }

  private async sendLogToBackend(apiCall: ApiCall): Promise<void> {
    try {
      // Only send in development environment
      if (Constants.expoConfig?.extra?.environment !== 'development') {
        return;
      }

      const backendUrl = Constants.expoConfig?.extra?.apiUrl;
      if (!backendUrl) return;

      await fetch(`${backendUrl}/api/debug/frontend-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiCall),
      });
    } catch (error) {
      // Silently fail - logging shouldn't break the app
    }
  }

  async exportLogs(): Promise<string> {
    const logs = await this.getLogs();
    return JSON.stringify(logs, null, 2);
  }
}

export const networkLogger = new NetworkLogger();