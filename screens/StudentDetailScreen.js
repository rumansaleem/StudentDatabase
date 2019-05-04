import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default class StudentDetailScreen extends Component {
  static navigationOptions = {
    title: 'Student Details'
  }
  constructor(props) {
    super(props);
    this.state = {
      student: props.navigation.getParam('student', {
        id: 1,
        name: 'Student Name',
        college: 'College Name',
        subject: 'Subject Title',
        latitude: 36.1223214,
        longitude: 77.23134143,
      })
    }
  }
  render() {
    const student = this.state.student;
    const location = {
      latitude: Number.parseFloat(student.latitude),
      longitude: Number.parseFloat(student.longitude),
    }
    return (
      <View style={styles.container}>
        <Text>Name: {student.name}</Text>
        <Text>College: {student.college}</Text>
        <Text>Subject: {student.subject}</Text>
        <Text>Locaton: {student.latitude}, {student.longitude} </Text>
        <View style={styles.mapContainer}>
          <MapView provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...location,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker coordinate={location} />
          </MapView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch'
  }
})