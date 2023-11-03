import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {earningList, spendList} from '../utilis/data';
import {ScrollView} from 'react-native-virtualized-view';
const Width = Dimensions.get('window').width;

const MyCategories = ({item}) => (
  <TouchableOpacity style={styles.categoryList}>
    <Image style={styles.categoryIcons} source={item.icons} />
    <View
      style={styles.items}>
      <Text style={styles.itemTxt}>{item.names}</Text>
      <Text style={styles.itemTxt}>{item.rate}</Text>
    </View>
  </TouchableOpacity>
);

const EarningSpendList = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View
          style={styles.itemContainer}>
          <View
            style={styles.itemTitle}>
          </View>
          <Text style={styles.earningTitle}>
            Earning
          </Text>
        </View>
        <FlatList
          data={earningList}
          numColumns={1}
          renderItem={MyCategories}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
        <View
          style={styles.spendTxtContainer}>
          <View
            style={styles.spendTxtView}></View>
          <Text style={styles.spenTxt}>
            Spend
          </Text>
        </View>
        <FlatList
          data={spendList}
          numColumns={1}
          renderItem={MyCategories}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default EarningSpendList;

const styles = StyleSheet.create({
  container: {},
  categoryList: {
    height: 60,
    borderWidth: 0.5,
    borderColor: '#5176C2',
    width: Width - 20,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  itemTitle:{
    backgroundColor: '#5176C2',
    borderRadius: 25,
    height: 15,
    width: 15,
    margin: 15,
  },
  itemContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
  },
  earningTitle:{fontSize: 22,  fontFamily: 'Poppins-SemiBold', color: '#5176C2'},
  items:{
    width: Width - 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTxt:{color: '#000', fontFamily: 'Poppins'},
  categoryIcons:{height: 20, width: 20, margin: 20},
  spenTxt:{fontSize: 22, fontFamily: 'Poppins-SemiBold', color: '#FFB841'},
  spendTxtView:{
    backgroundColor: '#FFB841',
    borderRadius: 25,
    height: 15,
    width: 15,
    marginHorizontal: 15,
  },
  spendTxtContainer:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
  },
});