import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, ButtonGroup, Icon, Input, Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import config from '../../IndraReactCommon/config'


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
        this.graphs = ["population graph, scatter plot, bar graph"];
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
        
        
        
        
        if(this.state.ready != true) return <View><Text>temp</Text></View>;
        else{

        return(
            <View>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    barStyle="light-content" // or directly
                    leftComponent={<Button
                                        icon={
                                            <Icon
                                                name="arrow-left"
                                                size={25}
                                                color='#1e90ff'
                                            />
                                        }
                                        title="Properties"
                                        onPress={() => this.props.navigation.goBack()}
                                        buttonStyle={styles.goBackButton}
                                        titleStyle={{color: '#1e90ff', fontSize: '18'}}
                                    />}
                    centerComponent={<Text style= {{ 
                                                color: 'black', 
                                                fontSize: 17, 
                                                //fontWeight: "bold", 
                                                marginTop: 'auto', 
                                                marginBottom: 14 
                                            }}>
                                            {this.state.modelName}
                                    </Text> }
                    rightComponent={<View style={styles.container}>
                                        <FontAwesome.Button
                                        onPress={() => alert("hello")}
                                        name="bars"
                                        color="#24A0ED"
                                        backgroundColor="transparent"
                                        marginLeft={10}
                                        />
                                    </View>
                                    }
                    containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    height: width*0.2
                }}
                />
                
                <Text style={styles.modelStatus}>Model Status:</Text>

                <View style={styles.modelStatusContainer}>
                    <ScrollView>
                        <Text style={styles.modelStatus}>{this.state.msg}</Text>
                    </ScrollView>
                </View>

                

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
        flexDirection: "row",
        margin: width*0.05,
        marginTop: height*0.5,
    },
    modelStatus: {
        marginTop: height*0.01,
        marginLeft: width*0.03,
    },
    modelStatusContainer: {
        borderRadius:2,
        borderColor:"grey", 
        borderWidth:3, 
        opacity:0.9, 
        height:height/3.5, 
        margin:width*0.02
    },
    goBackButton: {
        width: width*0.26,
        height: height*0.05,
        backgroundColor: 'transparent',
        marginBottom: 0,
        
    }


})
