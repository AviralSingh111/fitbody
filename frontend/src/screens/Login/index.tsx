import { black, limeGreen, white } from "@/utils/ColorSchema";
import ArrowIcon from "assets/icons/ArrowIcon";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

const Login = () => {
  const [password,setPassword] = useState('');
  const [email, setEmail] = useState('')
const handleSignUp = () => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log('User created:', user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error:', errorMessage);
  });
};
console.log(`component re-render`);
   return (
    <View style={styles.loginContainer}>
     <View style={styles.loginHeaderContainer}>
        {/* <ArrowIcon/> */}
      <Text style={styles.loginHeaderText}>Login</Text>
      <TextInput onChangeText={setEmail} style={styles.emailInput}/>
      <TextInput onChangeText={setPassword} style={styles.passwordInput}/>
      <Button onPress={handleSignUp} title="Sign up karle" color={`blue`} style={styles.passwordInput}/>
     </View> 
    </View>
   )
}

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: `${black}`,
    height: '100%',
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 60,
    display: 'flex',
    alignItems:'center'
  },
  loginHeaderContainer : {
  },
  loginHeaderText: {
    fontFamily: 'Poppins-Bold',
    color:`${limeGreen}`
  },
  emailInput : {
    backgroundColor: `${white}`,
    display: 'flex',
    width: 180,
    marginTop: 20
  },
  passwordInput : {
    backgroundColor: `${white}`,
    display: 'flex',
    width: 180,
    marginTop: 20
  }
});