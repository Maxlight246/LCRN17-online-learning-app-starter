import React from 'react';
import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {TextButton, CategoryCard} from '../../components';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  dummyData,
  constants,
} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const Search = () => {
  const navigation = useNavigation();
  const scrollViewRef = React.useRef(null);
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const renderTopSearch = () => {
    return (
      <View style={{marginTop: SIZES.padding}}>
        <Text style={{marginHorizontal: SIZES.padding, ...FONTS.h2}}>
          Top Searchs
        </Text>

        <FlatList
          horizontal
          data={dummyData.top_searches}
          listKey="TopSearchs"
          keyExtractor={item => `TopSearchs-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <TextButton
              label={item.label}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.top_searches.length - 1
                    ? SIZES.padding
                    : 0,
                padding: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.gray10,
              }}
              labelStyle={{
                color: COLORS.gray50,
                ...FONTS.h3,
              }}
            />
          )}
        />
      </View>
    );
  };

  const renderBrowseCategories = () => {
    return (
      <View style={{marginTop: SIZES.padding}}>
        <Text style={{marginHorizontal: SIZES.padding, ...FONTS.h2}}>
          Browse Categories
        </Text>
        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listKey="BrowseCategories"
          keyExtractor={item => `BrowseCategories-${item.id}`}
          contentContainerStyle={{marginTop: SIZES.radius}}
          renderItem={({item, index}) => (
            <CategoryCard
              sharedElementPrefix="Search"
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
              }}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Search',
                })
              }
            />
          )}
        />
      </View>
    );
  };

  const renderSearchBar = () => {
    const inputRange = [0, 50];

    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [50, 0],
          Extrapolate.CLAMP,
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 50,
          },
          searchBarAnimatedStyle,
        ]}>
        <Shadow>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              width: SIZES.width - SIZES.padding * 2,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
            }}>
            <Image
              source={icons.search}
              style={{width: 20, height: 20, tintColor: COLORS.gray40}}
            />
            <TextInput
              style={{flex: 1, marginLeft: SIZES.base, ...FONTS.h4}}
              value=""
              placeholder="Search for Topics"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{marginTop: 100, paddingBottom: 300}}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        onScrollEndDrag={event => {
          if (
            event.nativeEvent.contentOffset.y > 10 &&
            event.nativeEvent.contentOffset.y < 50
          ) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 60,
              animated: true,
            });
          }
          if (event.nativeEvent.contentOffset.y < 10) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 0,
              animated: true,
            });
          }
        }}>
        {renderTopSearch()}
        {renderBrowseCategories()}
      </Animated.ScrollView>
      {/* {renderSearchBar()} */}
    </View>
  );
};

export default Search;
