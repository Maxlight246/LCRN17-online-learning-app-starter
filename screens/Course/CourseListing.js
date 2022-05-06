import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';

import {IconButton, HorizontalCourseCard, Line} from '../../components';

import {COLORS, FONTS, SIZES, images, icons, dummyData} from '../../constants';

const CourseListing = ({navigation, route}) => {
  const {category, sharedElementPrefix} = route.params;

  const headerSharedValue = useSharedValue(80);

  const backHandler = () => {
    headerSharedValue.value = withTiming(80, {
      duration: 100,
    });
    navigation.goBack();
  };
  const renderHeader = () => {
    headerSharedValue.value = withDelay(
      500,
      withTiming(0, {
        duration: 500,
      }),
    );
    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: headerSharedValue.value}],
      };
    });

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: 250,
          overflow: 'hidden',
        }}>
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{width: '100%', height: '100%', borderBottomLeftRadius: 60}}
          />
        </SharedElement>

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 70,
            left: 30,
          }}>
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}>
            <Text
              style={{
                position: 'absolute',
                color: COLORS.white,
                ...FONTS.h1,
              }}>
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        <Animated.View style={headerFadeAnimatedStyle}>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              backHandler();
            }}
          />
        </Animated.View>

        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimatedStyle,
            headerTranslateAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()}
    </View>
  );
};

CourseListing.sharedElements = (route, otherRoute, showing) => {
  const {category, sharedElementPrefix} = route.params;
  return [
    {
      id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
    },
  ];
};

export default CourseListing;

const styles = StyleSheet.create({});
