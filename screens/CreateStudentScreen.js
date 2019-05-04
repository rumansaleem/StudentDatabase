import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import db from '../database/SQLiteDB';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default class CreateStudentForm extends Component {
  static navigationOptions = {
    title: 'Add Student'
  }
  
  constructor(props) {
    super(props);
    this.setName = this.setName.bind(this)
    this.setCollege = this.setCollege.bind(this)
    this.setSubject = this.setSubject.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.saveStudent = this.saveStudent.bind(this)
    this.state = {
      form: {
        name: '',
        college: '',
        subject: '',
        location: { latitude: 28.6141452, longitude: 77.2152198 },
      },
    }
  }

  setName(name) {
    this.setState(state => ({
      form: {...state.form, name}
    }));
  }
  setCollege(college) {
    this.setState(state => ({
      form: { ...state.form, college } 
    }));
  }
  setSubject(subject) {
    this.setState(state => ({ 
      form: { ...state.form, subject } 
    }));
  }
  setLocation({latitude, longitude}) {
    this.setState(state =>({ 
      form: { ...state.form, location: {latitude, longitude}} 
    }));
  }
  async saveStudent() {
    const { 
      name, 
      college, 
      subject, 
      location: {latitude, longitude}
    } = this.state.form;

    await db.executeSql(
      `INSERT INTO STUDENTS(
        name, college, subject, latitude, longitude
      ) VALUES (
        ?, ?, ?, ?, ?
      )`,
      [name, college, subject, latitude, longitude],
      () => this.props.navigation.navigate('ViewStudents')
    );

    this.setState({
      form: {
        name: '',
        college: '',
        subject: '',
        location: { latitude, longitude} 
      } 
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="John Doe"
            value={this.state.form.name}
            onChangeText={this.setName}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.inputLabel}>College</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g. Institute of Technology"
            value={this.state.form.college}
            onChangeText={this.setCollege}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.inputLabel}>Subject</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g. Computer Science"
            value={this.state.form.subject}
            onChangeText={this.setSubject}
          />
        </View>
        <View style={styles.mapContainer}>
          <View style={styles.field}>
            <Text style={[styles.inputLabel]}>
              Pick a Location
            </Text>
            <Text style={styles.inputField}>
              lat: {this.state.form.location.latitude}, 
              long:{this.state.form.location.longitude}
            </Text>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ... this.state.form.location,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            onPress={({nativeEvent}) => this.setLocation(nativeEvent.coordinate)}
          >
            <Marker draggable
              coordinate={this.state.form.location}
              onDragEnd={({nativeEvent}) => this.setLocation(nativeEvent.coordinate)}
            />
          </MapView>
        </View>
        <TouchableHighlight style={styles.button} onPress={this.saveStudent}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  field: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputLabel: {
    color: '#121'
  },
  inputField: {
    flex: 1,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch'
  },
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: '#808',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
})