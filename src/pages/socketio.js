import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import io from 'socket.io-client';
import { Text, Block } from '../components/';
export default class socketio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainColor: '#fff'
        }
    }

    componentDidMount() {
        this.io = io.connect('http://b4d36fc7.ngrok.io', {
            timeout: 10000
        });
        //this.io.emit('gps','123124123');
        this.io.on('color', color => {
            this.setState({ mainColor: color })
        })
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.state.mainColor }} >
                <Block flex={false} row middle   >
                    <Block flex={false} right style={{borderWidth: 1,}}>
                        <Text> textInComponent </Text>
                    </Block>
                </Block>
                <Block flex={false} height={50}  row middle    >
                    <Block flex={false} right width={400} style={{borderWidth: 1,}}>
                        <Text tertiary size={20} > textInComponent </Text>
                    </Block>
                </Block>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
