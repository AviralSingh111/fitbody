export interface ApiCall {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  fullUrl: string;
  headers: Record<string, string>;
  requestBody?: any;
  responseBody?: any;
  statusCode?: number;
  duration?: number;
  error?: string;
  success: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  success: boolean;
  error?: string;
}