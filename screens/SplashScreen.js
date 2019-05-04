import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar } from 'react-native';
export default class SplashScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome!'
  }
  componentDidMount() {
    setTimeout(()=> this.props.navigation.navigate('ViewStudents'))
  }
  render() {
    return(
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Image source={{ uri: 'http://lorempixel.com/200/200' }} style={styles.image}/>
        <Text style={styles.header}>Student's Database</Text>
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#808'
    },
    image: {
      borderRadius: 5,
      margin: 20,
      width: 200,
      height: 200
    },  
    header: {
      fontSize: 24,
      color: '#faf',    
    }
  })