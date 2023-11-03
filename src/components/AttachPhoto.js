import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {CameraOptions, ImageLibraryOptions, Callback} from './type';
import {useState} from 'react';
const AttachPhoto = ({selected}) => {
  const [file, seFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleCamera = async () => {
    setModalVisible(false);
    const result = await launchCamera((CameraOptions, Callback));
    console.log(result.assets[0]?.uri);
    seFile(result.assets[0]?.uri);
    setModalVisible(false);
  };
  const handleImage = async () => {
    setModalVisible(false);
    const result = await launchImageLibrary((CameraOptions, Callback));
    console.log(result.assets[0]?.uri);
    seFile(result.assets[0]?.uri);
    setModalVisible(false);
  };

  useEffect(() => {
    requestCameraPermission;
  });

  return (
    <View>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>
              <TouchableOpacity
                onPress={() => handleCamera()}
                style={{
                  height: 40,
                  marginTop: 30,
                  width: '60%',
                  backgroundColor:
                    selected == 'Expense' ? '#5176C2' : '#FFB841',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text style={styles.textStyle}>Take Photo</Text>
              </TouchableOpacity>
              <Text style={[styles.textStyle, {marginVertical: 5}]}>Or</Text>
              <TouchableOpacity
                onPress={() => handleImage()}
                style={{
                  height: 40,
                  width: '60%',
                  backgroundColor:
                    selected == 'Expense' ? '#5176C2' : '#FFB841',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text style={styles.textStyle}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderWidth: 1,
                  position: 'absolute',
                  bottom: 20,
                  justifyContent: 'center',
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        style={styles.rowData}
        onPress={() => setModalVisible()}>
        <View style={styles.itemView}>
          <Image
            resizeMode="contain"
            style={styles.iconCam}
            source={require('../assets/cam.png')}
          />
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.cattex}>Attach photo</Text>
            {/* <Text
              numberOfLines={1}
              style={[
                styles.cattex,
                {width: 150, fontSize: 11, marginLeft: 10, color: 'green'},
              ]}>
              {file}
            </Text> */}
          </View>
        </View>
        <Image
          source={{uri: file}}
          style={{
            height: 40,
            width: 40,
            borderWidth: 1,
          }}
        />
        <Image
          resizeMode="contain"
          style={{height: 16, width: 16}}
          source={require('../assets/forwordArrow.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AttachPhoto;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  rowData: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  itemView: {flexDirection: 'row', alignItems: 'center'},
  doneBtn: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
  },
  iconCam: {height: 20, width: 20},
  cattex: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Poppins-Medium',
  },
  modalView: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width - 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
  },
  centeredView: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  textStyle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
});
