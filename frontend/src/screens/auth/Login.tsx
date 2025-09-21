import { black, lightPurple, limeGreen, white } from "@/utils/ColorSchema";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import googleIcon from '../../../assets/icons/googleIcon.png';
import fingerprintIcon from '../../../assets/icons/fingerprintIcon.png'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import Toast from "react-native-toast-message";
import RemixIcon from "react-native-remix-icon";

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;
const Login = ({ navigation }: Props) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: `${error?.message}`,
          visibilityTime: 1500,
        });
      });
  };
  const handleGoogleSignIn = () => {
    Toast.show({
      type: 'error',
      text1: 'Google implement nahi hua abhi',
      visibilityTime: 1500,
    });
  }
  const handleFingerprintSignIn = () => {
    Toast.show({
      type: 'error',
      text1: 'Abhi Implement nahi hua fingerprint',
      visibilityTime: 1500,
    });
  }
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUpNavigation = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginHeaderContainer}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginHeaderText}>Log In</Text>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeSubText}>This is your gateway for an amazing transformation Journey and changing your physical and mental health to become the best version of yourself</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.emailInputContainer} >
            <Text style={styles.emailInputHeader}>Email</Text>
            <TextInput onChangeText={setEmail} style={styles.emailInput} />
          </View>
          <View style={styles.passwordInputContainer}>
            <Text style={styles.passwordInputHeader}>Password</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                onChangeText={setPassword}
                style={styles.passwordInputWithIcon}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <RemixIcon
                  name={showPassword ? "eye-line" : "eye-off-line"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.footerTop}>
            <Text style={styles.footerTopText}>or sign in with</Text>
          </View>
          <View style={styles.footerBottom}>
            <TouchableOpacity onPress={handleGoogleSignIn}>
              <Image source={googleIcon} width={20} height={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFingerprintSignIn}>
              <Image source={fingerprintIcon} width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.alternateOption}>
          <Text style={styles.alternateText1}>Don't have an account ?</Text>
          <TouchableOpacity onPress={handleSignUpNavigation}><Text style={styles.alternateText2}>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: `${black}`,
    height: '100%',
    paddingTop: 60,
    paddingBottom: 60,
    display: 'flex',
    alignItems: 'center',
  },
  loginHeaderContainer: {
    width: '100%',
  },
  loginHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  loginHeaderText: {
    fontFamily: 'Poppins-Bold',
    color: `${limeGreen}`,
    fontWeight: 600,
    fontSize: 20,
  },
  welcomeContainer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    fontSize: 20,
    color: `${white}`
  },
  welcomeSubText: {
    textAlign: 'center',
    color: `${white}`,
    fontFamily: 'LeagueSpartan-Light'
  },
  inputContainer: {
    marginTop: 40,
    backgroundColor: `${lightPurple}`,
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    padding: 20
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
    color: `${black}`
  },
  forgotPasswordText: {
    textAlign: 'right',
    paddingTop: 4,
    fontFamily: 'Poppins-Medium',
    fontWeight: 600,
    fontSize: 12
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    height: 44,
    width: 180,
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
  footerContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 20
  },
  footerTop: {

  },
  footerTopText: {
    fontFamily: 'LeagueSpartan-Light',
    fontWeight: 300,
    fontSize: 14,
    color: `${white}`
  },
  footerBottom: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  alternateOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    flexDirection: 'row',
    gap: 5
  },
  alternateText1: {
    fontFamily: 'LeagueSpartan-Light',
    fontWeight: 300,
    fontSize: 14,
    color: `${white}`
  },
  alternateText2: {
    fontFamily: 'LeagueSpartan-Light',
    fontWeight: 300,
    fontSize: 14,
    color: `${limeGreen}`
  },
  passwordInputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInputWithIcon: {
    backgroundColor: `${white}`,
    borderRadius: 15,
    fontSize: 12,
    paddingLeft: 12,
    paddingRight: 45,
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    padding: 5,
  }

});

export default Login;
