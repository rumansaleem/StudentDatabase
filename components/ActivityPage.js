import React, { Component } from 'react';
import {View, ToolbarAndroid, StyleSheet} from 'react-native';

export default class ActivityPage extends Component {
  render() {
    return (
      <View style={styles.main}>
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={ {uri: 'http://lorempixel.com/100/100'} }
          title="Student Database"
          actions={[{title: 'Exit'}]}
        />
        <View style={styles.container}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#808',
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
})