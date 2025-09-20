import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import { networkLogger } from '@/services/apiLogger';
import { ApiCall } from '@/types/api';
import Constants from 'expo-constants';

export const NetworkMonitor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<ApiCall[]>([]);
  const [selectedLog, setSelectedLog] = useState<ApiCall | null>(null);

  // Only show in development
  const isDev = Constants.expoConfig?.extra?.environment === 'development';

  useEffect(() => {
    if (!isDev) return;

    const interval = setInterval(async () => {
      const latestLogs = await networkLogger.getLogs();
      setLogs(latestLogs);
    }, 2000);

    return () => clearInterval(interval);
  }, [isDev]);

  if (!isDev) return null;

  const handleExportLogs = async () => {
    const exportData = await networkLogger.exportLogs();
    // In a real app, you might share this data or copy to clipboard
    Alert.alert('Logs Exported', 'Check console for exported data');
    console.log('Exported API Logs:', exportData);
  };

  const handleClearLogs = async () => {
    await networkLogger.clearLogs();
    setLogs([]);
    Alert.alert('Logs Cleared', 'All API logs have been cleared');
  };

  const renderLogItem = (log: ApiCall) => (
    <TouchableOpacity
      key={log.id}
      style={[styles.logItem, { backgroundColor: log.success ? '#e8f5e8' : '#ffeaea' }]}
      onPress={() => setSelectedLog(log)}
    >
      <View style={styles.logHeader}>
        <Text style={styles.method}>{log.method}</Text>
        <Text style={styles.status}>{log.statusCode || 'ERR'}</Text>
        <Text style={styles.duration}>{log.duration}ms</Text>
      </View>
      <Text style={styles.url} numberOfLines={1}>{log.url}</Text>
      <Text style={styles.timestamp}>{new Date(log.timestamp).toLocaleTimeString()}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Floating button to open monitor */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.floatingButtonText}>📡 {logs.length}</Text>
      </TouchableOpacity>

      {/* Monitor Modal */}
      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Network Monitor</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={handleExportLogs} style={styles.button}>
                <Text style={styles.buttonText}>Export</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleClearLogs} style={styles.button}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.logsList}>
            {logs.length === 0 ? (
              <Text style={styles.emptyText}>No API calls yet</Text>
            ) : (
              logs.map(renderLogItem)
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Log Detail Modal */}
      <Modal visible={!!selectedLog} animationType="fade" transparent>
        <View style={styles.detailModalContainer}>
          <View style={styles.detailModal}>
            <Text style={styles.detailTitle}>API Call Details</Text>
            {selectedLog && (
              <ScrollView>
                <Text style={styles.detailLabel}>URL:</Text>
                <Text style={styles.detailValue}>{selectedLog.fullUrl}</Text>
                
                <Text style={styles.detailLabel}>Method:</Text>
                <Text style={styles.detailValue}>{selectedLog.method}</Text>
                
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>{selectedLog.statusCode}</Text>
                
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{selectedLog.duration}ms</Text>
                
                {selectedLog.requestBody && (
                  <>
                    <Text style={styles.detailLabel}>Request Body:</Text>
                    <Text style={styles.detailValue}>{JSON.stringify(selectedLog.requestBody, null, 2)}</Text>
                  </>
                )}
                
                {selectedLog.responseBody && (
                  <>
                    <Text style={styles.detailLabel}>Response Body:</Text>
                    <Text style={styles.detailValue}>{JSON.stringify(selectedLog.responseBody, null, 2)}</Text>
                  </>
                )}
                
                {selectedLog.error && (
                  <>
                    <Text style={styles.detailLabel}>Error:</Text>
                    <Text style={styles.detailValue}>{selectedLog.error}</Text>
                  </>
                )}
              </ScrollView>
            )}
            <TouchableOpacity
              onPress={() => setSelectedLog(null)}
              style={styles.closeDetailButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 1000,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logsList: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 50,
  },
  logItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  method: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  status: {
    fontWeight: 'bold',
    color: '#34C759',
  },
  duration: {
    color: '#666',
    fontSize: 12,
  },
  url: {
    color: '#333',
    fontSize: 14,
    marginBottom: 2,
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
  detailModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailModal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    width: '90%',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailLabel: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: '#333',
  },
  detailValue: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    fontFamily: 'monospace',
    fontSize: 12,
  },
  closeDetailButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
});