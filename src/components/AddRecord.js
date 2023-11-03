import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  Pressable,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MyWrapper from './MyWrapper';
import {addRecordValidationSchema} from '../shared/exporter';
import {Formik} from 'formik';
import {addRecord, updateAmount} from '../shared/services/AppServices';
import {toastMessage} from '../shared/utils/constants';
import {setTotalAmount, store} from '../shared/redux';
import {primary} from '../utilis/colors';
import AttachPhoto from './AttachPhoto';
import {ScrollView} from 'react-native-virtualized-view';
const AddRecord = ({navigation, route}) => {
  const {cat, resource} = route.params;
  const [selected, setSelected] = useState(resource);
  const [datePicker, setDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dt, setDt] = useState(new Date().toISOString().substring(0, 10));

  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US'));
  const {userFormData, totalAmount} = useSelector(state => state.root.user);
  const total = totalAmount[0]?.amount;
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Cash', value: 'cash'},
    {label: 'Account', value: 'account'},
  ]);
  function showDatePicker() {
    setDatePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    setDt(value.toISOString().substring(0, 10));
    setTime(value.toLocaleTimeString('en-US'));
    setDatePicker(false);
  }
  const handleRecord = async values => {
    setLoading(true);
    const id = userFormData.data._id;
    const obj = {
      user_id: id,
      cat: cat,
      amount: values.amount,
      time: time,
      date: dt,
      paymentType: value,
      resource: selected,
      decs: values.decs,
    };
    if (resource == 'Expense' ? total >= values.amount : values.amount) {
      await addRecord(obj)
        .then(async ({data}) => {
          if (data.success == true) {
            const obj2 =
              resource == 'Expense'
                ? {amount: parseInt(total) - parseInt(values.amount)}
                : {amount: parseInt(total) + parseInt(values.amount)};
            await updateAmount(id, obj2).then(({data}) => {
              store.dispatch(setTotalAmount(data.data));
              navigation.replace('MyTabs');
            });
          }
        })
        .catch(err => {
          toastMessage('error', err?.response?.data?.message);
        })
        .finally(() => setLoading(false));
    } else {
      ToastAndroid.showWithGravity(
        'Your balance is insufficient',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }
  return (
    <Formik
      initialValues={{
        amount: '',
        paymentType: '',
        decs: '',
        location: '',
      }}
      validateOnMount={true}
      validationSchema={addRecordValidationSchema}
      onSubmit={values => {
        handleRecord(values);
      }}>
      {({
        values,
        errors,
        touched,
        handleChange,
        isSubmitting,
        handleSubmit,
        isValid,
        dirty,
        setFieldValue,
      }) => (
        <View
          style={{
            height: Dimensions.get('window').height,
            backgroundColor: '#fff',
          }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={selected == 'Expense' ? '#5176C2' : '#FFB841'}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View
                style={[
                  styles.modalView,
                  {
                    backgroundColor:
                      selected == 'Expense' ? '#5176C2' : '#FFB841',
                  },
                ]}>
                <TouchableOpacity
                  style={styles.subContainer}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.card}>
            <View
              style={[
                styles.dashbordcard,
                {
                  backgroundColor:
                    selected == 'Expense' ? '#5176C2' : '#FFB841',
                },
              ]}>
              <View style={styles.headerSection}>
                <Text style={styles.headerSecTxt}>Add Record</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text
                    style={[
                      styles.headerSecTxt,
                      {
                        fontSize: 18,
                      },
                    ]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.btnBackground}>
                <TouchableOpacity
                  onPress={() => setSelected('Expense')}
                  style={[
                    styles.btnContainer,
                    {
                      backgroundColor:
                        total == 0
                          ? '#a9a9a9'
                          : 'white' && selected == 'Expense'
                          ? '#5176C2'
                          : '#fff',
                    },
                  ]}
                  disabled={total == 0 ? true : false}>
                  <Text
                    style={[
                      styles.expenseBtn,
                      {
                        color: selected == 'Expense' ? 'black' : 'black',
                      },
                    ]}>
                    Expense
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelected('Income')}
                  style={[
                    styles.incomeBtn,
                    {
                      backgroundColor:
                        selected == 'Income' ? '#FFB841' : '#FCFCFC',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.incomeBtnTxt,
                      {
                        color: selected == 'Income' ? 'black' : 'black',
                      },
                    ]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>
              {total == 0 ? (
                <Text style={styles.sufficientBalance}>
                  *Insufficient Balance*
                </Text>
              ) : null}
              <View style={styles.priceContainer}>
                <Text style={styles.pricetxt}>PKR</Text>
                <Text style={styles.priceAmount}>
                  {selected == 'Expense' ? total : total}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.rowData, {marginTop: 5}]}>
            <Text style={styles.generalTxt}>Generals</Text>
          </View>
          <View style={styles.rowData}>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={styles.itemImg}
                source={require('../assets/money.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Amount</Text>
              </View>
            </View>
            <View style={styles.generalItem}>
              <TextInput
                style={[
                  styles.inputField,
                  {borderColor: !isValid ? 'red' : 'gray'},
                ]}
                placeholderTextColor={!isValid ? 'red' : 'gray'}
                placeholder={'Enter Amount'}
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handleChange('amount')}
                value={values.amount}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.rowData}
            onPress={() => {
              navigation.navigate('Catagories', {res: selected});
            }}>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={styles.itemImg}
                source={require('../assets/cat1.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Category</Text>
              </View>
            </View>
            <View style={styles.generalItem}>
              <Text
                style={[
                  styles.categoryReqTxt,
                  {
                    color: cat ? 'grey' : 'red',
                  },
                ]}>
                {cat != null ? cat : 'Required'}
              </Text>
              <Image
                resizeMode="contain"
                style={styles.forwardIcon}
                source={require('../assets/forwordArrow.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowData} onPress={showDatePicker}>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={styles.itemImg}
                source={require('../assets/datetime.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Date & Time</Text>
              </View>
              {datePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  timeZoneOffsetInMinutes={60}
                  minuteInterval={1}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onDateSelected}
                  style={styles.datePicker}
                />
              )}
            </View>
            <View style={styles.generalItem}>
              <Text style={styles.date}>{date.toLocaleDateString()}</Text>
              <Image
                resizeMode="contain"
                style={styles.forwardIcon}
                source={require('../assets/forwordArrow.png')}
              />
            </View>
          </TouchableOpacity>

          <View style={[styles.rowData, {marginTop: 5}]}>
            <Text style={styles.moreDetail}>More Detail</Text>
          </View>
          <TouchableOpacity
            style={styles.rowData}
            onPress={() =>
              navigation.navigate('Note', {selected: selected, cat: cat})
            }>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={styles.itemIcon}
                source={require('../assets/note.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Note</Text>
              </View>
            </View>
            <Image
              resizeMode="contain"
              style={styles.forwardIcon}
              source={require('../assets/forwordArrow.png')}
            />
          </TouchableOpacity>

          <View style={styles.rowData}>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={{height: 20, width: 20}}
                source={require('../assets/location.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Add location</Text>
              </View>
            </View>
            <View style={styles.generalItem}>
              <TextInput
                style={styles.itemLocation}
                placeholderTextColor={'gray'}
                placeholder={'Enter Location '}
                onChangeText={handleChange('location')}
                value={values.location}
              />
            </View>
          </View>
          <AttachPhoto selected={selected} />
          <View style={styles.rowData}>
            <View style={styles.generalItem}>
              <Image
                resizeMode="contain"
                style={styles.itemIcon}
                source={require('../assets/payment.png')}
              />
              <View style={styles.itemView}>
                <Text style={styles.cattex}>Payment type</Text>
              </View>
            </View>
            <View style={styles.generalItem}>
              <DropDownPicker
                style={styles.dropDown}
                disableBorderRadius={true}
                containerStyle={{
                  width: 150,
                }}
                listParentContainerStyle={[
                  styles.listItem,
                  {
                    borderColor: selected == 'Income' ? '#FFB841' : primary,
                  },
                ]}
                listItemLabelStyle={{
                  color: '#000',
                }}
                translation={{
                  PLACEHOLDER: 'Select Type',
                }}
                placeholderStyle={styles.PlaceHolderTxt}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View>
          </View>
          <TouchableOpacity
            disabled={!(isValid && dirty)}
            onPress={() => handleSubmit()}
            style={[
              styles.saveBtn,
              {
                backgroundColor: !isValid
                  ? 'gray'
                  : selected == 'Expense'
                  ? '#5176C2'
                  : '#FFB841',
              },
            ]}>
            <Text style={styles.textStyle}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AddRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sufficientBalance: {
    alignSelf: 'flex-start',
    top: 2,
    fontSize: 14,
    marginLeft: 30,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    height: 200,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  PlaceHolderTxt: {
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',
  },
  itemLocation: {
    width: 130,
    fontSize: 14,
    borderColor: 'gray',
    fontFamily: 'Poppins-SemiBold',
    padding: 0,
    color: '#000',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  dropDown: {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    width: 150,
  },
  saveBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 20,
  },
  moreDetail: {
    color: '#233A6B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
  },
  forwardIcon: {height: 16, width: 16},
  subContainer: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
  },
  itemView: {marginLeft: 20},
  itemImg: {height: 24, width: 24},
  expenseBtn: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  itemIcon: {height: 20, width: 20, tintColor: '#5176C2'},
  categoryReqTxt: {fontSize: 16, fontFamily: 'Poppins-Medium', marginRight: 20},
  inputField: {
    borderBottomWidth: 1,
    width: 100,
    fontSize: 14,

    fontFamily: 'Poppins-Medium',
    // marginRight: 10,
    padding: 0,
    color: '#000',
  },
  generalTxt: {
    color: '#233A6B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
  },
  incomeBtn: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeBtnTxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  btnBackground: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerSection: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PlaceHolderTxt: {
    color: 'grey',
    fontFamily: 'Poppins-SemiBold',
  },
  itemLocation: {
    width: 130,
    fontSize: 14,
    borderColor: 'gray',
    fontFamily: 'Poppins-SemiBold',
    padding: 0,
    color: '#000',
  },
  listItem: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
  },
  dropDown: {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    width: 150,
  },
  saveBtn: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    color: 'grey',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 20,
  },
  moreDetail: {
    color: '#233A6B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
  },
  forwardIcon: {height: 16, width: 16},
  subContainer: {
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
  },
  itemView: {marginLeft: 20},
  itemImg: {height: 24, width: 24},
  expenseBtn: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  itemIcon: {height: 20, width: 20, tintColor: '#5176C2'},
  categoryReqTxt: {fontSize: 16, fontFamily: 'Poppins-Medium', marginRight: 20},
  inputField: {
    borderBottomWidth: 1,
    width: 100,
    fontSize: 14,

    fontFamily: 'Poppins-Medium',
    // marginRight: 10,
    padding: 0,
    color: '#000',
  },
  generalTxt: {
    color: '#233A6B',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginLeft: 20,
  },
  incomeBtn: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incomeBtnTxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  btnBackground: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerSection: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashbordcard: {
    height: '100%',
    width: '100%',
  },
  priceAmount: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#F8F8F8',
  },
  headerSecTxt: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  priceAmount: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#F8F8F8',
  },
  headerSecTxt: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
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
  pricetxt: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  pricetxt: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  cattex: {
    fontSize: 16,
    color: 'grey',
    fontFamily: 'Poppins-Medium',
  },
  generalItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
  modalView: {
    margin: 20,
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width - 40,
    borderRadius: 20,
    borderWidth: 2,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  textStyle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  btnContainer: {
    height: 40,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnContainer: {
    height: 40,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
