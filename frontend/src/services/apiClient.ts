import Constants from 'expo-constants';
import { ApiCall, ApiResponse } from '@/types/api';
import { networkLogger } from './apiLogger';
import { logger } from '@/utils/logger';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8080';
    logger.info('API Client initialized with base URL:', this.baseUrl);
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const requestId = this.generateRequestId();
    const startTime = Date.now();
    const fullUrl = `${this.baseUrl}${endpoint}`;

    const apiCall: ApiCall = {
      id: requestId,
      timestamp: new Date().toISOString(),
      method: (options.method as any) || 'GET',
      url: endpoint,
      fullUrl,
      headers: this.prepareHeaders(options.headers),
      requestBody: options.body ? JSON.parse(options.body as string) : undefined,
      success: false,
    };

    try {
      logger.debug(`Starting API request: ${apiCall.method} ${fullUrl}`);

      const response = await fetch(fullUrl, {
        ...options,
        headers: apiCall.headers,
      });

      const duration = Date.now() - startTime;
      const responseText = await response.text();
      let responseBody;

      try {
        responseBody = JSON.parse(responseText);
      } catch {
        responseBody = responseText;
      }

      const success = response.ok;
      
      // Update API call with response data
      const completedApiCall: ApiCall = {
        ...apiCall,
        responseBody,
        statusCode: response.status,
        duration,
        success,
        error: success ? undefined : `HTTP ${response.status}: ${response.statusText}`,
      };

      // Log the completed call
      await networkLogger.logApiCall(completedApiCall);

      if (success) {
        logger.debug(`API request successful: ${apiCall.method} ${fullUrl} (${duration}ms)`);
        return {
          data: responseBody,
          status: response.status,
          success: true,
        };
      } else {
        logger.warn(`API request failed: ${apiCall.method} ${fullUrl} - ${response.status}`);
        return {
          data: responseBody,
          status: response.status,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
        };
      }
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Log the failed call
      const failedApiCall: ApiCall = {
        ...apiCall,
        duration,
        success: false,
        error: errorMessage,
      };

      await networkLogger.logApiCall(failedApiCall);
      
      logger.error(`API request error: ${apiCall.method} ${fullUrl}`, error);
      
      return {
        data: null,
        status: 0,
        success: false,
        error: errorMessage,
      };
    }
  }

  private prepareHeaders(headers?: HeadersInit): Record<string, string> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (headers) {
      return { ...defaultHeaders, ...Object.fromEntries(new Headers(headers)) };
    }

    return defaultHeaders;
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Convenience methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();