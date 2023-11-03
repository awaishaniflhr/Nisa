import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Header from './Header';

const Settings = ({navigation}) => {
  const [switch1, setIsEnabled1] = useState(false);
  const [switch2, setIsEnabled2] = useState(false);

  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} text={'Settings'} color={'#5176C2'} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Accounts');
        }}
        style={styles.rowData}>
        <View style={styles.accountTitles}>
          <Image
            resizeMode="contain"
            style={styles.accountImg}
            source={require('../assets/acount.png')}
          />
          <View style={styles.accountDetail}>
            <Text style={styles.accountTitle}>Accounts</Text>
            <Text style={accountDescrip}>Manage your e-wallet accounts</Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          style={styles.accountImg}
          source={require('../assets/forwordArrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.rowData}>
        <View style={styles.subRowData}>
          <Image
            resizeMode="contain"
            style={styles.accountImg}
            source={require('../assets/password.png')}
          />
          <View style={styles.accountDetail}>
            <Text style={styles.accountTitle}>Password</Text>
            <Text style={accountDescrip}>Required password on startup </Text>
          </View>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#5176C2'}}
          thumbColor={switch1 ? '#f4f3f4' : '#f4f3f4'}
          onValueChange={toggleSwitch1}
          value={switch1}></Switch>
      </View>
      <View style={styles.rowData}>
        <View style={styles.subRowData}>
          <Image
            resizeMode="contain"
            style={styles.accountImg}
            source={require('../assets/thumb.png')}
          />
          <View style={styles.accountDetail}>
            <Text style={styles.accountTitle}>Fingerprint</Text>
            <Text style={accountDescrip}>Required fingerprint on startup</Text>
          </View>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#5176C2'}}
          thumbColor={switch2 ? '#f4f3f4' : '#f4f3f4'}
          onValueChange={toggleSwitch2}
          value={switch2}></Switch>
      </View>
      <TouchableOpacity style={styles.rowData}>
        <View style={styles.subRowData}>
          <Image
            resizeMode="contain"
            style={styles.accountImg}
            source={require('../assets/notification.png')}
          />
          <View style={styles.accountDetail}>
            <Text style={styles.accountTitle}>Notifications</Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          style={styles.accountImg}
          source={require('../assets/forwordArrow.png')}
        />
      </TouchableOpacity>
      <View style={styles.rowData}>
        <View style={styles.subRowData}>
          <Image
            resizeMode="contain"
            style={styles.accountImg}
            source={require('../assets/dell.png')}
          />
          <View style={styles.accountDetail}>
            <Text style={styles.accountTitle}>Delete Data</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('OthersApp')}
        style={styles.otherAppBtn}>
        <Text style={styles.otherAppBtnTxt}>Other Apps</Text>
        <View style={styles.fitnessLogo}>
          <Image
            resizeMode="contain"
            style={styles.fitnessLogoImg}
            source={require('../assets/f.png')}
          />
          <View>
            <Text style={styles.fitnessTxt}>Fitness Freak</Text>
            <Text style={[styles.fitnessTxt, {fontSize: 12}]}>
              Webevise Technologies
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  accountDetail: {marginLeft: 20},
  subRowData: {flexDirection: 'row', alignItems: 'center'},
  fitnessLogo: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  container: {flex: 1},
  icon: {
    height: 24,
    width: 24,
    marginRight: 50,
  },
  fitnessTxt: {color: 'grey', fontSize: 16, fontFamily: 'Poppins-Bold'},
  accountDescrip: {fontSize: 10, color: '#898E9A', fontFamily: 'Poppins-Bold'},
  accountTitle: {fontSize: 16, color: '#1A2337', fontFamily: 'Poppins-Bold'},
  accountImg: {height: 20, width: 20},
  rowData: {
    height: 60,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  fitnessLogoImg: {height: 40, width: 40, marginHorizontal: 20},
  otherAppBtnTxt: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginTop: 5,
    alignSelf: 'center',
  },
  otherAppBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 100,
    width: '100%',
    alignSelf: 'center',
    borderTopColor: '#DCDCDC',
    borderTopWidth: 1,
  },
  accountTitles: {flexDirection: 'row', alignItems: 'center'},
});
