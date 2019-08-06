import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView} from 'react-native'
const cheerio = require('cheerio-without-node-native');
export default class htmlCrawling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            veri: []
        }
    }
    componentDidMount = () => {
        this.htmlData();
    };

    async htmlData(page = 1) {
        const searchUrl = `https://m.imdb.com/chart/moviemeter?ref_=m_nv_mpm`;
        const response = await fetch(searchUrl, {
            method: 'get',
        });
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);
        let veriler = [];
        $("#chart-content > div").map((_, div) => {
            veriler.push($(`h4`, div).text()+'\n imdp puanı: '+$(`p > span.imdb-rating`, div).text())
        })
        this.setState({ veri: veriler });
        //#chart-content > div:nth-child(2) > div:nth-child(1) > div > a > span > p > span.imdb-rating
        //#chart-content > div:nth-child(2) > div:nth-child(1) > div > a > span > h4
    }
    render() {
        return (
            <View>
                <Text>gelen: </Text>
                <ScrollView>
                    {this.state.veri.map((val, key) => {
                        return <Text>{val}</Text>
                    })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
