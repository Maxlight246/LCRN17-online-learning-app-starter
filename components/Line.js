import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const Line = ({lineStyle}) => {
  return (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: COLORS.gray20,
        ...lineStyle,
      }}
    />
  );
};

export default Line;
