/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import {StackScreenProps} from '@react-navigation/stack'
import React from 'react'
import { Dimensions, StyleSheet, Image, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'

import { MovieDetails } from '../components/MovieDetails';
import { useMovieDetails } from '../hooks/useMovieDetails';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{};


export const DetailScreen = ({route,navigation}:Props) => {

  const movie = route.params  
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const {isLoading,cast, movieFull} =  useMovieDetails(movie.id)
  

  
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size={30} color="grey" style={{marginTop: 20}} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}

      {/* Boton volver */}
      <TouchableOpacity style={styles.backBotton}
        onPress={()=>navigation.pop()}
      >
        <Icon color="white" name="arrow-back-outline" size={60} />
      </TouchableOpacity>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight + 0.7,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10
  },
  imageBorder:{
    flex:1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,

  },
  marginContainer :{
    marginHorizontal:20,
  },
  subTitle: {
    fontSize:16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backBotton : {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    top: 30,
    left: 5,
  }
});