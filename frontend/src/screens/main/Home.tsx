import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import workunderProgress from '../../../assets/workUnderProgress.jpeg';
import { black, limeGreen, white } from "@/utils/ColorSchema";
import { getAuth, signOut } from "firebase/auth";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "@/navigation/MainNavigator";

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

const Home = ({ navigation }: Props) => {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      Toast.show({
        type: 'success',
        text1: 'Signed Out',
        visibilityTime: 1500,
      });
    }).catch((error) => {
      Toast.show({
        type: 'error',
        text1: `${error?.message}`,
        visibilityTime: 1500,
      });
    });
  }
    return(
        <View style={styles.homeContainer}>
          <Image source={workunderProgress} width={100} height={100} />
          <Text style={styles.workUnderProgressText}>Work Under Progress! Will Finish Soon</Text>
          <TouchableOpacity onPress={handleSignOut}><Text style={styles.signOutText}>Sign Out</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  homeContainer:{
    backgroundColor: `${black}`,
    height: '100%',
    paddingTop: 60,
    paddingBottom: 60,
    display: 'flex',
    alignItems: 'center',
  },
  workUnderProgressText:{
    marginTop: 30,
    color: `${white}`,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    fontSize: 18,
  },
  signOutText:{
    marginTop: 30,
    color: `${limeGreen}`,
    fontFamily: 'Poppins-Bold',
    fontWeight: 700,
    fontSize: 18,
  }
})


export default Home