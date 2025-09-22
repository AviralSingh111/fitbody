import { AuthStackParamList } from "@/navigation/AuthNavigator";
import { black, lightPurple, limeGreen, white } from "@/utils/ColorSchema"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native"
import fingerprintImg from '../../../assets/icons/fingerprintImg.png'
import { StyleSheet, Text, View } from "react-native"
import RemixIcon from "react-native-remix-icon"

type Props = NativeStackScreenProps<AuthStackParamList, 'Fingerprint'>;
const Fingerprint = ({ navigation }: Props) => {

  const handleSkip = () => {
     navigation.navigate('Login')
  }
  
  return (
    <View style={styles.forgotContainer}>
      <View style={styles.forgotPasswordHeader}>
        <TouchableOpacity>
          <RemixIcon name="arrow-left-s-fill" size={30} color={`${limeGreen}`} />
        </TouchableOpacity>
        <Text style={styles.forgotPasswordHeaderText}>Set Your Fingerprint</Text>
      </View>
      <View style={styles.forgotMessageContainer}>
        <Text style={styles.messageSubText}>Using your finger is definitely is the way to Go!!!</Text>
      </View>
      <View style={styles.inputContainer}>
      <Image source={fingerprintImg} width={182.1} height={235} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleSkip}>
          <Text style={styles.loginText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Continue</Text>
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
    width: '100%',
    marginTop: 20,
    backgroundColor: `${lightPurple}`,
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    padding: 30
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
    marginTop: 15,
    gap: 10
  },
  loginButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    height: 44,
    width: 170,
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

export default Fingerprint;