import * as LocalAuthentication from 'expo-local-authentication';

export const CheckBiometricSupport = async () => {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
  
  console.log('Compatible:', compatible);
  console.log('Enrolled:', enrolled);
  console.log('Supported types:', supportedTypes);
  
  return compatible && enrolled;
};