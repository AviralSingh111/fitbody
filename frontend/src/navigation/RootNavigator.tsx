import { NavigationContainer } from '@react-navigation/native';
import { useAuthState } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator'; 

export default function RootNavigator() {
  const { user, isLoading } = useAuthState();
  
  if (isLoading) {
    return null;
  }
  
  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}