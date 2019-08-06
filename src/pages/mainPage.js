import React, { Component } from 'react'
import { Text, StyleSheet, View, Linking, Platform } from 'react-native'

export default class mainPage extends Component {
    componentDidMount() { // B
        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }
    componentWillUnmount() { // C
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    handleOpenURL = (event) => { // D
        this.navigate(event.url);
    }
    navigate = (url) => { // E
        const { navigate } = this.props.navigation;
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];

        if (routeName === 'people') {
            navigate('Appa');
        };
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
