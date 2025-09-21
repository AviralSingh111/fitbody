import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { black, lightPurple, limeGreen, white } from "@/utils/ColorSchema"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { TouchableOpacity } from "react-native"
import { TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native"
import RemixIcon from "react-native-remix-icon"
import Toast from 'react-native-toast-message'; 

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;
const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const auth = getAuth();
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Reset Email Sent!',
        text2: 'Please check your email and spam folder to reset your password',
        visibilityTime: 3000, 
      });
      setTimeout(()=>{
        navigation.navigate('Login');
      },3000)
    })
    .catch((error) => {
      const errorMessage = error.message;
      Toast.show({
        type: 'error',
        text1: `${errorMessage}`,
        visibilityTime: 2000, 
      });
    });
  }
  return (
    <View style={styles.forgotContainer}>
      <View style={styles.forgotPasswordHeader}>
        <TouchableOpacity onPress={handleBackToLogin}>
          <RemixIcon name="arrow-left-s-fill" size={30} color={`${limeGreen}`} />
        </TouchableOpacity>
        <Text style={styles.forgotPasswordHeaderText}>Forgotten Password</Text>
      </View>
      <View style={styles.forgotMessageContainer}>
        <Text style={styles.messageText}>Forgot Password ?</Text>
        <Text style={styles.messageSubText}>Don't Worry!! Happens to the best of Us, just reset and get back to the game.</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.emailInputContainer} >
          <Text style={styles.emailInputHeader}>Email</Text>
          <TextInput onChangeText={setEmail} style={styles.emailInput} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleForgotPassword}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  forgotContainer: {
    backgroundColor: `${black}`,
    height: '100%',
    paddingTop: 60,
    paddingBottom: 60,
    display: 'flex',
    alignItems: 'center',
  },
  forgotPasswordHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20
  },
  forgotPasswordHeaderText: {
    fontFamily: 'Poppins-Bold',
    color: `${limeGreen}`,
    fontWeight: 600,
    fontSize: 20,
    paddingLeft: 40
  },
  forgotMessageContainer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  messageText: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    fontSize: 20,
    color: `${white}`
  },
  messageSubText: {
    textAlign: 'center',
    color: `${white}`,
    fontFamily: 'LeagueSpartan-Light'
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: `${lightPurple}`,
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    padding: 15
  },
  emailInputContainer: {
    display: 'flex',
    width: 310,
    gap: 4,
  },
  emailInputHeader: {
    fontFamily: 'LeagueSpartan-Regular',
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 10
  },
  emailInput: {
    backgroundColor: `${white}`,
    borderRadius: 15,
    fontSize: 12,
    paddingLeft: 12,
    fontFamily: 'Poppins-Regular',
    color: `${black}`
  },
  passwordInputContainer: {
    display: 'flex',
    width: 310,
    gap: 4
  },
  passwordInputHeader: {
    fontFamily: 'LeagueSpartan-Regular',
    fontWeight: 500,
    fontSize: 16,
    paddingLeft: 10
  },
  passwordInput: {
    backgroundColor: `${white}`,
    borderRadius: 15,
    fontSize: 12,
    paddingLeft: 12,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    height: 44,
    width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 180,
    borderColor: `${white}`,
    borderWidth: 0.5
  },
  loginText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: `${white}`
  },
})

export default ForgotPassword