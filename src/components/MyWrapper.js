import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';

const MyWrapper = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MyWrapper;

const styles = StyleSheet.create({
  container:{flex: 1},
});
