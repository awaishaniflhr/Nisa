import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';


import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Routes = () => {
  const {isLogin} = useSelector(state => state.root.user);
  return (
    <SafeAreaProvider>
       <AuthStack /> 
    </SafeAreaProvider>
  );
};

export default Routes;
