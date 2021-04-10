import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';
import axios from 'axios';
import config from '../../IndraReactCommon/config'
import { ScrollView } from 'react-native-gesture-handler';
import RunModelButton from './RunModelButton';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props;
        this.state = {modelParams: route.params.modelParams, modelID: route.params.modelID, modelName: route.params.modelName, selectedModel: 0, ready: false, modelWorking: true};
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
        this.run_url = config.RUN_URL;
        this.updateModelId = this.updateModelId.bind(this);
        this.modelExist = this.modelWorking.bind(this);
    }

    async componentDidMount(){
        var temp;
        let params = axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            temp = response.data
            this.setState({env: temp, execKey: temp.exec_key});
            return axios.get(`${this.menu_url}`);
        })
        .then((response) => {
            console.log(response.data[0]);
            temp = JSON.stringify(response.data);
            
            this.setState({models: temp, ready: true});
            //console.log("active:", response.data[0].active, response.data[1].active, response.data[2].active, response.data[3].active, response.data[4].active, response.data[5].active, response.data[6].active)
            if (response.data[1].active === false) this.setState({modelWorking: false});
        })
        .catch(error => console.error(error));
        this.setState({ready: true});
        
    }

    updateModelId (modelId) {
        this.setState({selectedModel: modelId});
        this.modelWorking(modelId);
      }

    modelWorking (modelId) {
        var obj = JSON.parse(this.state.models);
        //console.log("active?", obj[modelId+1].active, obj[modelId+1].func);
        //console.log("active status:", obj[0].active, obj[1].active, obj[2].active, obj[3].active, obj[4].active, obj[5].active, obj[6].active, "\n");
        if (obj[modelId+1].active === false) this.setState({modelWorking: false});
        else this.setState({modelWorking: true});
    }

    sendNumPeriods = async () => {

    }

    handleRunPeriod = (e) => {

    }


    render(){
        //console.log("find model name:", this.state.modelParams);
        var temp = <Text>loading...</Text>
        
        var buttons = [];
        if (this.state.models != undefined) {
            var obj = JSON.parse(this.state.models);
            for(let i = 2; i < 7; i++){
                //console.log("i:", i);
                buttons.push(obj[i].func);
                //console.log("adding func:", obj[i].func);
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
                        onPress={i => {
                            this.updateModelId(i);
                            this.modelWorking(i);
                          }}
                        selectedIndex={this.state.selectedModel}
                        buttons={buttons}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.buttonStyle}
                        width={width*1.5}
                    />


                
                </ScrollView>
                    <Text>SelectedId:{this.state.selectedModel+2}</Text>
                    <Text>ModelWorking:{String(this.state.modelWorking)}</Text>
                    <Text>{"\n"}</Text>
                    
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