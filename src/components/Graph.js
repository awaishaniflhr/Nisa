import { ActivityIndicator, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
const Graph = ({ set, navigation }) => {
  const [dayArray, setDayArray] = useState([]);
  const [weekDay, setWeekDay] = useState([]);
  const [myIncomeArry, setMyIncomeArry] = useState([]);
  const [myExpenseArry, setMyExpenseArry] = useState([]);
  const [flag, setflag] = useState(true);

  const {
    complteHistoryData,
  } = useSelector(state => state.root.user);

  const myDate = async () => {
    let tempArray = [];
    let date = new Date();
    for (let i = 0; i <= 6; i++) {
      let dateTocompare = null;
      if (i == 0) {
        date = date;
      } else {
        date = moment(date).subtract(1, 'day');
      }
      dateTocompare = date.toISOString().substring(0, 10);
      tempArray.push(dateTocompare);
    }
    setDayArray(tempArray.reverse());
  }


  useEffect(() => {
    myDate();
  }, []);

  const myWeek = async () => {
    let myday = [];
    for (var c = 0; c <= 6; c++) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat'];
      const d = new Date(dayArray[c]);
      let day = days[d.getDay()];
      myday.push(day)
    }
    setWeekDay(myday)
  }

  useEffect(() => {
    myWeek();
  }, [dayArray])

  const handdleGraph = async () => {
    let myIncom = [];
    for (var i = 0; i <= 6; i++) {
      let date = new Date();
      const data = await complteHistoryData
        .filter(item => item.resource == 'Income' && item.date == dayArray[i])
        .map(({ amount }) => ({ amount }));
      const sum = await data.reduce(function (prev, current) {
        return prev + +current.amount;
      }, 0);
      myIncom.push(sum)
      date = moment(date).subtract(1, 'day');
    }
    setMyIncomeArry(myIncom);
    let myExpense = [];
    for (var i = 0; i <= 6; i++) {
      let date = new Date();
      const data = await complteHistoryData
        .filter(item => item.resource == 'Expense' && item.date == dayArray[i])
        .map(({ amount }) => ({ amount }));
      const sum = await data.reduce(function (prev, current) {
        return prev + +current.amount;
      }, 0);
      myExpense.push(sum)
      date = moment(date).subtract(1, 'day');
    }
    setMyExpenseArry(myExpense);
    setflag(false);
  };

  useEffect(() => {
    if (!flag) {
      handdleGraph();
    }
  }, [flag]);

  useEffect(() => {
    setflag(false)
  }, [set])

  const income = {
    labels: weekDay,
    datasets: [
      {
        data: myIncomeArry,
        strokeWidth: 2, // optional
      },
    ],
  };

  const expense = {
    labels: weekDay,
    datasets: [
      {
        data: myExpenseArry,
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) =>
      set == 'Expense'
        ? `rgba(81, 118, 194, ${opacity})`
        : `rgba(255, 184, 65, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    decimalPlaces: 0,
    useShadowColorFromDataset: false, // optional
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: set == 'Expense' ? '#5176C2' : '#FFB841',
    },
  };

  return (
    <View style={{ height: 280, paddingVertical: 10 }}>
      <LineChart
        style={{ marginRight: 10 }}
        // yAxisLabel="K"
        // yAxisSuffix="Rs"
        // yAxisInterval={4}
        // yAxisLabel="Rs."
        fromZero={false}
        data={set == 'Expense' ? expense : income}
        width={screenWidth - 20}
        height={256}
        chartConfig={chartConfig}
        withVerticalLines={false}
        withShadow={false}
        bezier
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({});
