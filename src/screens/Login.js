import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const Login = ({navigation}) => {
  const [selectedId, setSelectedId] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>NISA</Text>
        <Text style={styles.subTitle}>we guaranteed your handsome</Text>
      </View>
      <View
        style={{
          marginBottom: 150,
          // alignItems: 'center',
        }}>
        <View style={styles.usernameInputField}>
          <TextInput
            style={styles.inputText}
            placeholder="Zlatan Lukaku"
            placeholderTextColor="#CACACC"
          />
          <TouchableOpacity>
            <Image
              source={require('../assets/check.png')}
              style={{width: 20, height: 20}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.usernameInputField, {backgroundColor: '#F9F9FB'}]}>
          <TextInput
            style={[styles.inputText, {color: 'gray'}]}
            placeholder="Password"
            placeholderTextColor="#CACACC"
          />
          <TouchableOpacity>
            <Image
              source={require('../assets/view.png')}
              style={{width: 20, height: 20, tintColor: '#FF90BB'}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginRegisterBtns}>
        <TouchableOpacity
          style={styles.loginBtn}
        //   onPress={() => navigation.navigate('Signup')}
          >
          <Text style={styles.loginTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.registerTxt}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffc0cb',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleSection: {
    width: '100%',
    marginVertical: 50,
  },
  title: {
    fontSize: 48,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  subTitle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'normal',
  },
  usernameInputField: {
    flexDirection: 'row',
    width: 315,
    height: 65,
    marginTop: 25,
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputText: {
    width: 220,
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  forgotText: {
    color: '#000',
    fontSize: 16,
    marginTop: 30,
    marginStart: 20,
    fontWeight: '500',
  },
  loginRegisterBtns: {
    // position: 'absolute',
    // bottom:10,
    alignSelf: 'center',
  },
  loginBtn: {
    backgroundColor: '#fff',
    width: 315,
    height: 65,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  registerBtn: {
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  registerTxt: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    marginVertical: 30,
  },
});
