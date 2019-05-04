import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            btnColor: props.buttonColor || '#808'
        }
    }

    render() {
        let DropdownMenu = this.state.isOpen ? (
            <View style={styles.dropdownMenu}>
                {this.props.children}
            </View>
        ) : null;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} 
                onPress={() => this.setState(state => ({isOpen: !state.isOpen}))}>
                    <Text style={styles.buttonText}>Click Me</Text>
                </TouchableOpacity>
                {DropdownMenu}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: { 
        justifyContent: 'center',
        backgroundColor: '#808', 
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    dropdownMenu: {

    }
})