import React, { Component } from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Button, ButtonGroup } from 'react-native-elements';
import axios from 'axios'
import config from '../config'
import { ScrollView } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props
        this.state = {modelParams: route.params.modelParams, modelID: route.params.modelID, modelName: route.params.modelName, ready: false}
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
        this.modelId = 1;
        this.updateModelId = this.updateModelId.bind(this)
    }

    async componentDidMount(){
        let params = axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            var temp = response.data
            this.setState({execKey: temp.exec_key})
            return axios.get(`${this.menu_url}${this.state.execKey}`)
        })
        .then((response) => {
            var temp = JSON.stringify(response.data)
            this.setState({models: temp, ready: true})
        })
        .catch(error => console.error(error));
        
        this.setState({ready: true});
    }

    updateModelId (modelId) {
        this.setState({modelId})
      }


    render(){
        //console.log("find model name:", this.state.modelParams);
        var temp = <Text>loading...</Text>

        const { modelId } = this.state
        
        var buttons = [];
        if (this.state.models != undefined) {
            var obj = JSON.parse(this.state.models);
            
            for(let i = 1; i < obj.length - 1; i++){
                buttons.push(obj[i].func)
            }
        }
        
        
        
        
        if(this.state.ready != true) return <View><Text>temp</Text></View>;
        else{

        return(
            <View>
                <ScrollView>
                    {/*
                    <View style={{padding: 5}}>
                        <Text style={styles.titleText}>
                            {this.state.modelName}
                        </Text>
                    </View>
                    */}
                <ScrollView 
                    
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled = { true }
                    horizontal='true' 
                    contentInset={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: width*0.55,
                    }}
                    >
                        
                    <ButtonGroup
                        onPress={this.updateModelId}
                        selectedIndex={modelId}
                        buttons={buttons}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        width={width*1.5}
                    />


                
                </ScrollView>
                    <Text>{this.state.models}</Text>
                </ScrollView>
            </View>
        )}
    }

}

export default ModelView

const styles = StyleSheet.create ({
    /*titleText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'Arial'
    },*/
    buttonContainer: {
        backgroundColor: '#f8f8f0'
    },
    buttonStyle: {
        width: width*0.3
    }

})