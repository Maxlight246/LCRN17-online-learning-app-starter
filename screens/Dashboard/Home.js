import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {COLORS, FONTS, SIZES, icons, images, dummyData} from '../../constants';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  Line,
} from '../../components';

const Home = () => {
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
          marginTop: Platform.OS === 'ios' ? 40 : 0,
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h2}}>Hello, ByProgrammers</Text>
          <Text style={{...FONTS.body3, color: COLORS.gray50}}>
            Thursday, 9th Sept 2021
          </Text>
        </View>
        <IconButton
          icon={icons.notification}
          iconStyle={{tintColor: COLORS.black}}
        />
      </View>
    );
  };

  const renderStartLearning = () => {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'flex-start',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{borderRadius: SIZES.radius}}>
        <View>
          <Text style={{color: COLORS.white, ...FONTS.body2}}>HOW TO</Text>
          <Text style={{color: COLORS.white, ...FONTS.h2}}>
            Make your brand more visible with our checklist{' '}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
              marginTop: SIZES.radius,
            }}>
            By Scott Harris
          </Text>
        </View>
        <Image
          source={images.start_learning}
          style={{width: '100%', height: 110, marginTop: SIZES.padding}}
        />
        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{color: COLORS.black}}
        />
      </ImageBackground>
    );
  };

  const renderCourse = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Course"
        keyExtractor={item => `Course-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: SIZES.padding}}
        renderItem={({item, index}) => {
          return (
            <VerticalCourseCard
              course={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index == dummyData.courses_list_1.length - 1
                    ? SIZES.padding
                    : 0,
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Header */}
      {renderHeader()}
      {/* Content */}
      <ScrollView
        // bounces={false}
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}>
        {renderStartLearning()}
        {renderCourse()}
        <Line lineStyle={{marginVertical: SIZES.padding}} />
      </ScrollView>
    </View>
  );
};

export default Home;
