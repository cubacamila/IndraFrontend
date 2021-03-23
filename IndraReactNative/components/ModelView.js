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
        this.state = {modelParams: route.params.modelParams, modelID: route.params.modelID, ready: false}
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

            this.setState({models: temp})
            //console.log("#########", temp)
            
        })
        .catch(error => console.error(error));
        
        this.setState({ready: true});
    }

    updateModelId (modelId) {
        this.setState({modelId})
      }


    render(){

        var temp = <Text>loading...</Text>
        if(this.state.ready){
            temp = <Text>{this.state.models}</Text>
        }

        //const buttons = ['Population graph', 'Scatter plot', 'Bar graph', 'Model data', 'Source code']
        const { modelId } = this.state
        console.log("@@@@@@", this.state.models)
        var buttons = [];
        if (this.state.models != undefined) {
            var obj = JSON.parse(this.state.models);
            
            for(let i = 1; i < obj.length - 1; i++){
                buttons.push(obj[i].func)
            }
        }
        console.log("test2");
        
        


        return(
            <View>
                <ScrollView>
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
                    <Text>{temp}</Text>
                </ScrollView>
            </View>
        )
    }

}

export default ModelView

const styles = StyleSheet.create ({
    buttonContainer: {
        backgroundColor: '#f8f8f0'
    },
    buttonStyle: {
        width: width*0.3
    }
})