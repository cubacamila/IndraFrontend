import React, { Component } from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'
import config from '../config'
import { ScrollView } from 'react-native-gesture-handler';


class ModelView extends Component {
    constructor(props) {
        super(props);
        const { route, navigation } = this.props
        this.state = {modelParams: route.params.modelParams, modelID: route.params.modelID, ready: false}
        this.props_url = config.PROPS_URL;
        this.menu_url = config.MENU_URL;
    }

    async componentDidMount(){
        console.log("modelParam:", this.state.modelParams)
        let params = axios
        .put(`${this.props_url}${this.state.modelID}`, this.state.modelParams)
        .then((response) => {
            //console.log("Response header:", response.header, "\n\n")
            
            var temp = response.data
            this.setState({execKey: temp.exec_key})
            return axios.get(`${this.menu_url}${this.state.execKey}`)
        })
        .then((response) => {
            //console.log("Response header:", response.header, "\n\n")
            
            var temp = JSON.stringify(response.data)
            console.log(temp)
            this.setState({choices: temp})
            
        })
        .catch(error => console.error(error));
        
        this.setState({ready: true});
    }

    render(){

        var temp = <Text>loading...</Text>
        if(this.state.ready){
            temp = <Text>{this.state.choices}</Text>
        }
        return(
            <View>
                <ScrollView>
                    <Text>{temp}</Text>
                </ScrollView>
            </View>
        )
    }

}

export default ModelView