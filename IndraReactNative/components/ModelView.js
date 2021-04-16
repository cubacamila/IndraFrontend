import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Button, ButtonGroup, Input } from 'react-native-elements';
import axios from 'axios';
import config from '../../IndraReactCommon/config'
import { ScrollView } from 'react-native-gesture-handler';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props;
        this.state = {modelParams: route.params.modelParams, 
                      modelID: route.params.modelID, 
                      modelName: route.params.modelName, 
                      selectedModel: 0, 
                      periodNum: 10,
                      ready: false, 
                      runModelLoading: false,
                      modelWorking: true};
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
        this.run_url = config.RUN_URL;
        this.updateModelId = this.updateModelId.bind(this);
        this.modelExist = this.modelWorking.bind(this);
        this.handleRunPeriod = this.handleRunPeriod.bind(this);
        this.sendNumPeriods = this.sendNumPeriods.bind(this);
    }

    async componentDidMount(){
        var temp;
        let params = axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            temp = response.data
            console.log("set env:", temp);
            this.setState({env: temp, execKey: temp.exec_key});
            return axios.get(`${this.menu_url}`);
        })
        .then((response) => {
            //console.log(response.data[0]);
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
        
        const { periodNum, env } = this.state;
        this.setState({ runModelLoading: true });
        console.log("In sendNumPeriods\n")
        console.log("env:", env);
        let res = await axios.put(
            `${this.run_url}${periodNum}`,
            env
          );
        console.log("RUN FOR 10 PERIODS:\n\n\n", await res.data);
        this.setState({
            runResult: res.data,
            runModelLoading: false,
            msg: res.data.user.user_msgs,
          });
    }

    handleRunPeriod = (n) => {
        this.setState({
            periodNum: n,
          });
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
                    <Text>{"\n"}</Text>
                    <View style={styles.rowRun}>
                    
                    <Button
                        title="run"
                        onPress={ this.sendNumPeriods }
                        buttonStyle={styles.runButton}
                    />
                    
                    <Text style={styles.runText}>model for</Text>
                    <Input
                        type="INT"
                        placeholder="10"
                        onChangeText={ (n) => this.handleRunPeriod(n) }
                        containerStyle={styles.input}
                    />
                    <Text style={styles.runText}>periods.</Text>
                    </View>
                    <Text style={styles.modelStatus}>Model Status:{"\n"}{this.state.msg}</Text>
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
    },
    input: {
        width: width*0.25
    },
    runButton: {
        backgroundColor: '#00b300',
        height: height*0.045,
        width: width*0.2,
        //size: 15,
        margin: height*0.005,
        marginLeft: width*0.026,
    },
    runText: {
        fontSize: width*0.04,
        marginTop: height* 0.015,
    },
    rowRun: {
        flex: 1,
        flexDirection: "row",
    },
    modelStatus: {
        marginLeft: width*0.03,
    }

})