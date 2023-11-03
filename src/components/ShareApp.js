import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {primary} from '../utilis/colors';

const ShareApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
      }}>
      <Text
        style={{color: 'white', fontSize: 16, fontFamily: 'Poppins-Regular'}}>
        coming soon!
      </Text>
    </View>
  );
};

export default ShareApp;

const styles = StyleSheet.create({});
