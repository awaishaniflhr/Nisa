import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
const Header = ({navigation, text, color}) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => { navigation.goBack(); }}
        style={styles.header}>
        <View style={{width: '12%'}}>
          <Image
            resizeMode="contain"
            style={[styles.icon, {tintColor: color}]}
            source={require('../assets/backErrow.png')}
          />
        </View>
        <View style={styles.headerContainerTxt}>
          <Text
            style={[styles.headerTxt,{color: color,}]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
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
  headerContainerTxt:{width: '90%', alignItems: 'center'},
  headerTxt:{
    
    marginRight: 50,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
});