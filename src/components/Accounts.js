import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from './Header';

const Accounts = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} text={'Accounts'} color={'#5176C2'} />
      <View style={styles.rowData}>
        <View style={styles.subContainer}>
          <Image
            resizeMode="contain"
            style={styles.userImg}
            source={{
              uri: 'https://i.pinimg.com/236x/98/e3/44/98e344d51bb96837bf70ee8303854992.jpg',
            }}
          />
          <View style={styles.accountHolder}>
            <Text style={styles.userName}>Sahil sial</Text>
            <Text style={styles.userEmailAddress}>Sahil@gmai.com </Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          style={{height: 20, width: 20}}
          source={require('../assets/dell.png')}
        />
      </View>
      <View style={styles.rowData}>
        <View style={styles.subContainer}>
          <Image
            resizeMode="contain"
            style={styles.userImg}
            source={{
              uri: 'https://i.pinimg.com/236x/20/4a/78/204a789a19f8e97fcb2e65ffd554bfc7.jpg',
            }}
          />
          <View style={styles.accountHolder}>
            <Text style={styles.userName}>Sahil sial</Text>
            <Text style={[styles.userDetail, {fontSize: 10}]}>
              Sahil@gmai.com{' '}
            </Text>
          </View>
        </View>
        <Image
          resizeMode="contain"
          style={styles.dellImg}
          source={require('../assets/dell.png')}
        />
      </View>
      <TouchableOpacity style={styles.dellBtn}>
        <Text style={styles.addBtnTxt}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 50,
  },
  subContainer: {flexDirection: 'row', alignItems: 'center'},
  rowData: {
    height: 60,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // paddingHorizontal:10,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  userEmailAddress: {
    fontSize: 10,
    color: '#898E9A',
    fontFamily: 'Poppins-Bold',
  },
  userName: {fontSize: 16, color: '#1A2337', fontFamily: 'Poppins-Bold'},
  accountHolder: {marginLeft: 20},
  userImg: {height: 40, width: 40, borderRadius: 20},
  userDetail: {color: '#1A2337', fontFamily: 'Poppins-Bold'},
  dellImg: {height: 20, width: 20},
  dellBtn: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
    height: 60,
    width: '90%',
    backgroundColor: '#5176C2',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnTxt: {color: '#fff', fontSize: 16, fontFamily: 'Poppins-Bold'},
});
