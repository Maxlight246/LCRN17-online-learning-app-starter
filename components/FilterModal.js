import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {TextButton, Line} from '../components';
import {COLORS, FONTS, SIZES, icons, constants} from '../constants';

const FilterModal = ({filterModalSharedValue2, filterModalSharedValue1}) => {
  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1],
      ),
      transform: [{translateY: filterModalSharedValue1.value}],
    };
  });

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1],
      ),
    };
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1],
      ),
      transform: [{translateY: filterModalSharedValue2.value}],
    };
  });

  return (
    //  Main Container
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
          backgroundColor: 'red',
        },
        filterModalContainerAnimatedStyle,
      ]}>
      {/* Background Container */}
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBgAnimatedStyle,
        ]}></Animated.View>
    </Animated.View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
