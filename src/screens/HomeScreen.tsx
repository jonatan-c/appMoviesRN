/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {Dimensions, FlatList, ScrollView, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MoviePoster} from '../components/MoviePoster';
import {useMovies} from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import ImageColors from 'react-native-image-colors'
import { getImageColor } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const {width: windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {

  const { nowPlaying, popular,topRated,upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const {setMainColors} = useContext(GradientContext)


  const getPosterColors = async(index: number) => {
    const movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const [primary= 'green',secundary= 'orange'] =  await getImageColor(uri)
    
    setMainColors({primary, secundary});    

  }

  useEffect(() => {
    if(nowPlaying.length > 0){
      getPosterColors(0)
    }
  }, [nowPlaying])
  
  
  
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator color="red" size={100} />
      </View>
    );
  }

  return (
    <GradientBackground >

    <ScrollView>
      <View style={{marginTop: top + 10}}>
        {/* Carousel Principal */}
        <View
          style={{
            height: 440, //cambiar a 440
          }}>
          <Carousel
            data={nowPlaying}
            renderItem={({item}: any) => <MoviePoster movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
            onSnapToItem={index=>getPosterColors(index)}
          />
        </View>

        {/* Peliculas populares */}

        <HorizontalSlider title="Popular" movies={popular} />
        <HorizontalSlider title="Top Rated" movies={topRated} />
        <HorizontalSlider title="Upcoming" movies={upcoming} />


      </View>
    </ScrollView>
    
    
    </GradientBackground>
    
    
  );
};
