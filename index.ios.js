/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIOS,
    Image,
} from 'react-native';


var CarDatas = require('./Car.json');


var  ListSectionsDemo = React.createClass({

    getInitialState(){

        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        return {
            dataSource: new ListView.DataSource({
                getSectionData: getSectionData,
                getRowData: getRowData,
                rowHasChanged: (r1, r2)=>r1 !== r2,
                sectionHeaderHasChanged: (s1, s2)=>s1 !== s2,
            })
        };
    },


    componentDidMount(){
        this.loadDataFromJson();
    },

    loadDataFromJson(){
        var jsonData = CarDatas.data;
        var dataBlob = {}, sectionIDs = [], rowIDs = [], carDatas = [];
        for (var i = 0; i < jsonData.length; i++) {

            //处理组数据
            sectionIDs.push(i);
            dataBlob[i] = jsonData[i].title;

            //处理行数据
            carDatas = jsonData[i].cars;
            rowIDs[i] = [];
            for (var j = 0; j < carDatas.length; j++) {
                rowIDs[i].push(j)
                dataBlob[i + ':' + j] = carDatas[j];
            }
        };
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        });
    },

    render(){
        return (
            <View>
                <View style={styles.headerViewStyle}>
                    <Text style={{fontSize:15, color:'white'}}>setMyGo品牌</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </View>
        )
    },

    renderRow(rowData){
        return(
            <TouchableOpacity activeOpacity={0.1}>
                <View style={styles.rowStyle}>
                    <Image source={{uri:rowData.icon}} style={styles.rowImageStyle}/>
                    <Text style={{marginLeft:5}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    },

    renderSectionHeader(sectionData,sectionID){
        return(
            <View style={styles.sectionHeaderStyle}>
                <Text style={{marginLeft:5, color:'red'}}>{sectionData}</Text>
            </View>
        );
    },


});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerViewStyle:{
        height:64,
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center',
    },

    rowStyle:{
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        borderBottomWidth:0.5,
        borderBottomColor:'#e8e8e8'

    },

    rowImageStyle:{
        width:70,
        height:70
    },

    sectionHeaderStyle:{
        backgroundColor:'#e8e8e8',
        height:20,
        justifyContent:'center'
    },

});

AppRegistry.registerComponent('ListSectionsDemo', () => ListSectionsDemo);
