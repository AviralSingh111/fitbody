import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/navigation/AuthNavigator';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { black, lightPurple, limeGreen, white } from '@/utils/ColorSchema';
import { useState } from 'react';
import RemixIcon from 'react-native-remix-icon';
import googleIcon from '../../../assets/icons/googleIcon.png';
import fingerprintIcon from '../../../assets/icons/fingerprintIcon.png'
import { auth } from "@/config/firebase";
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateSubmission = () => {
        if (confirmPassword != password) {
            Toast.show({
                type: 'error',
                text1: 'Make Sure both the Passwords Entered Match',
                visibilityTime: 1500,
            });
        }
        else return true;
    }

    const handleSignUp = () => {
        if (validateSubmission()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    navigation.navigate('Login');
                })
                .catch((error) => {
                    Toast.show({
                        type: 'error',
                        text1: `${error?.message}`,
                        visibilityTime: 2000,
                    });
                });
        }
        else return
    };

    const handleBackToLogin = () => {
        navigation.navigate('Login');
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

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginHeaderContainer}>
                <View style={styles.loginHeader}>
                    <TouchableOpacity onPress={handleBackToLogin}>
                        <RemixIcon name="arrow-left-s-fill" size={30} color={`${limeGreen}`} />
                    </TouchableOpacity>
                    <Text style={styles.loginHeaderText}>Create Account</Text>
                </View>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>Let's Start</Text>
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.emailInputContainer} >
                        <Text style={styles.emailInputHeader}>Full name</Text>
                        <TextInput onChangeText={setName} style={styles.emailInput} />
                    </View>
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
                    </View>
                    <View style={styles.passwordInputContainer}>
                        <Text style={styles.passwordInputHeader}>Confirm Password</Text>
                        <View style={styles.passwordInputWrapper}>
                            <TextInput
                                onChangeText={setConfirmPassword}
                                style={styles.passwordInputWithIcon}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <RemixIcon
                                    name={showConfirmPassword ? "eye-line" : "eye-off-line"}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                        <Text style={styles.loginText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <View style={styles.footerTop}>
                        <Text style={styles.footerTopText}>or sign up with</Text>
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
                    <Text style={styles.alternateText1}>Already have an account ?</Text>
                    <TouchableOpacity onPress={handleBackToLogin}><Text style={styles.alternateText2}>Log In</Text></TouchableOpacity>
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
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20
    },
    loginHeaderText: {
        fontFamily: 'Poppins-Bold',
        color: `${limeGreen}`,
        fontWeight: 600,
        fontSize: 20,
        paddingLeft: 50
    },
    welcomeContainer: {
        display: "flex",
        alignItems: "center",
        gap: 15,
        marginTop: 20,
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
        marginTop: 15
    },
    loginButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
        marginTop: 15,
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
        marginTop: 25,
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

export default SignUp;