import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AllCategories} from '../utilis/catData';

import Header from './Header';
import {useSelector} from 'react-redux';

const Catagories = ({navigation, route}) => {
  const {res} = route.params;
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const {userFormData, totalAmount, categoryList, expenceList, incomeList} =
    useSelector(state => state.root.user);

  const Response = () => {
    if (res == 'Expense') {
      setData(expenceList);
    } else {
      setData(incomeList);
    }
  };
  // console.log('responseeeee', res);
  useEffect(() => {
    Response();
    if (data !== null) {
      // console.log('daaaaaaaaaaaaaaaaa', data);
      const finalResults = data.filter(result => {
        return (
          result.category.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      });
      setData(finalResults);
    } else {
      console.log('errrrrrrrrrrrrroooooooooooooorrrrrrrrrrrr');
    }
  }, [search]);

  useEffect(() => {
    if (search === '') {
      Response();
    }
  }, [search]);

  const myCategories = ({item}) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddRecord', {cat: item.category, resource: res});
        }}
        style={styles.categoryCard}>
        <View style={styles.cardContainer}>
          <Image
            resizeMode="contain"
            style={styles.cardImg}
            source={{uri: item.image}}></Image>
          <Text style={styles.cardTxt}>{item.category}</Text>
        </View>

        <View>
          <Image
            resizeMode="contain"
            style={styles.forwardImg}
            source={require('../assets/forwordArrow.png')}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
  const onEndEditing = () => {
    if (search === '') {
      Response();
    }
  };

  const onSearch = text => {
    setSearch(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header navigation={navigation} text={'Categories'} color={'#233A6B'} />
      <View style={styles.category}>
        <Image
          style={styles.categoryImg}
          source={require('../assets/search.png')}
        />
        <TextInput
          placeholder="Search"
          color="black"
          placeholderTextColor={'#898E9A'}
          value={search}
          onChangeText={text => onSearch(text)}
          onEndEditing={onEndEditing}
          style={styles.searchTxt}></TextInput>
      </View>
      <View style={styles.allCategoriesView}>
        <Text style={styles.AllCategoriesTxt}>All Categories</Text>
      </View>
      <FlatList renderItem={myCategories} data={data} />
    </View>
  );
};

export default Catagories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {flexDirection: 'row'},
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  cardImg: {height: 30, width: 30, marginHorizontal: 20},
  icon: {
    height: 24,
    width: 24,
    marginRight: 20,
  },
  searchTxt: {width: '85%'},
  categoryImg: {height: 15, width: 15, marginRight: 5},
  cardTxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  category: {
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  allCategoriesView: {borderBottomColor: 'grey', borderBottomWidth: 1},
  AllCategoriesTxt: {
    color: '#233A6B',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 20,
    padding: 5,
  },
  forwardImg: {
    height: 16,
    width: 16,
    tintColor: '#898E9A',
    marginRight: 20,
  },
  categoryCard: {
    height: 60,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
