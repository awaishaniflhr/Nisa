import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const BottomButton = () => {
  return (
    <View>
         <TouchableOpacity style={styles.btnBottom}>
<Text style={styles.btnBottomTxt}>
Save
</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomButton

const styles = StyleSheet.create({
  btnBottom:{  position: 'absolute',
  margin: 16,
  right: 0,
  bottom: 20,
  height:60,
  width:'90%',
  backgroundColor:'#5176C2',
  alignSelf:'center',
  borderRadius:10,
  marginTop:100,
  justifyContent:'center',
  alignItems:'center'
},
btnBottomTxt:{
  color:'#fff',
  fontSize:16,
  fontWeight:'bold'
},
})