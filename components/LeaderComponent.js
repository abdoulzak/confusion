import React, { Component } from 'react';
import { LEADERS } from '../shared/leaders';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'; 

class Leader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }

    static navigationOptions = {
        title: 'Leader'
    };

    render(){
        const renderLeaderItem = ({item, index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    /*leftAvatar={{ source: { uri: "../assets/images/alberto.png" } }}*/
                    leftAvatar={{ source: { uri: "../assets/images/alberto.png" } }}
                />
            );
        }

        return (
            
                <FlatList 
                    data={this.state.leaders}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()}
                    />
        );        
    }

}


export default Leader;