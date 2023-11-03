import {StyleSheet, Text, View} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

import React from 'react';

const MyDonutChart = ({available, income, expense}) => {
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  // Yellow
  const groceries = available;
  // red
  const bills = expense;
  // blue
  const regular = income;
  const total = groceries + bills;

  const groceriesPercentage = (groceries / total) * 20;
  const billsPercentage = (bills / total) * 20;
  const regularPercentage = (regular / total) * 50;

  const groceriesStrokeDashoffset =
    circleCircumference - (circleCircumference * groceriesPercentage) / 50;
  const billsStrokeDashoffset =
    circleCircumference - (circleCircumference * billsPercentage) / 50;
  const regularStrokeDashoffset =
    circleCircumference - (circleCircumference * regularPercentage) / 50;

  const groceriesAngle = (groceries / total) * 360;
  const billsAngle = (bills / total) * 360;
  const regularAngle = groceriesAngle - billsAngle;
  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="200" width="200" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="40"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#FFB841"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={groceriesStrokeDashoffset}
                  rotation={billsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#EC4747"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={billsStrokeDashoffset}
                  rotation={groceriesAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#5176C2"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={regularStrokeDashoffset}
                  rotation={regularAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )}
          </G>
        </Svg>
        <Text
          style={{
            fontSize: 11,
            color: '#BFC0C2',
            position: 'absolute',
            top: 70,
            fontFamily: 'Poppins-SemiBold'
          }}>
          Available Balance
        </Text>
        <Text style={styles.label}>Rs {available}</Text>
      </View>
    </View>
  );
};

export default MyDonutChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#263238',
    fontSize: 24,
  },
});
