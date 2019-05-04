import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';

import db from '../database/SQLiteDB';

export default class CreateStudentScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create Student',
    headerRight: (
      <TouchableNativeFeedback 
        onPress={() => navigation.navigate('CreateStudent')}
        background={TouchableNativeFeedback.Ripple()}>
        <View style={{
          marginRight: 10,
          backgroundColor: '#fff',
          padding: 5,
          borderRadius: 3,
        }}>
          <Text style={{ fontWeight: 'bold' }}>New</Text>
        </View>
      </TouchableNativeFeedback>
    ),
  })
  
  constructor(props) {
    super(props);
    this.search = this.search.bind(this)
    this.setSearchString = this.setSearchString.bind(this)
    this.state = {
      search: '',
      loading: false,
      data: [],
    }
  }

  componentDidMount() {
    this.search();
  }

  setSearchString(search) {
    this.setState({search});
  }
  
  search() {
    const searchString = this.state.search;
    this.setState(() => ({loading: true}));
    db.executeSql(
      "SELECT * FROM students WHERE name LIKE ?",
      [`${searchString}%`],
      result => {
        const data = new Array(result.rows.length).fill(null).map(
          (_, index) => result.rows.item(index)
        );
        this.setState({data, loading: false})
      }
    )
  }
  
  render() {
    renderSeperator = () =>  <View style={{ height: 1, backgroundColor: '#cdcded'}}></View>;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          style="{styles.list}"
          keyExtractor={(item) => item.id.toString() }
          ListHeaderComponent={
            <View style={[styles.row]}>
              <TextInput
                placeholder="Search..."
                underlineColorAndroid="#808"
                style={[styles.expand, styles.input]}
                value={this.state.search}
                onChangeText={this.setSearchString}
              />
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple()}
                onPress={this.search}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Search</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          }
          ItemSeparatorComponent={renderSeperator}
          onRefresh={this.search}
          refreshing={this.state.loading}
          renderItem={ ({item}) => (
            <TouchableNativeFeedback 
              onPress={() => this.props.navigation.navigate('StudentDetails', {student: item})}
              background={TouchableNativeFeedback.Ripple()}>
              <View style={styles.listItem}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.mutedText}>{item.college}</Text>
              </View>
            </TouchableNativeFeedback>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  expand: {
    flex: 1
  },
  input: {
    paddingHorizontal: 5,
    marginRight: 10,
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listItem: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#808',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 25,
    color: '#121',
  }
})