import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/screens/auth/Login';
import SignUp from '@/screens/auth/SignUp';
import ForgotPassword from '@/screens/auth/ForgotPassword';
import Fingerprint from '@/screens/auth/FingerPrint';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Fingerprint: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Fingerprint" component={Fingerprint} />
    </Stack.Navigator>
  );
}