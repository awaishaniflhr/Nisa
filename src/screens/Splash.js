import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={{flex:1, backgroundColor:'brown',alignItems:'center', justifyContent:'center'}}>
        <StatusBar backgroundColor={'#fae951'} />
      <Text style={{color:'#fff',}}>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})