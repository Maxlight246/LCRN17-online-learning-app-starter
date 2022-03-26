import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';

const CategoryCard = ({category, containerStyle, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        style={{
          height: 150,
          width: 200,
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'flex-end',
          ...containerStyle,
        }}
        source={category?.thumbnail}
        resizeMode="cover">
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            maxWidth: 120,
          }}
          numberOfLines={2}
          ellipsizeMode="tail">
          {category?.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;
