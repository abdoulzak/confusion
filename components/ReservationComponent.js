import React, { Component } from 'react';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Text, View, StyleSheet, Picker, Switch, Button, Modal, ScrollView, Alert, PanResponder } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Calendar from 'expo-calendar';

import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



var viewR;
const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx > 0 )
        return true;
    else
        return false;
}
const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
    },
    onPanResponderGrant: () => {
      viewR.rubberBand(1000).then(endState => 
          console.log(endState.finished ? 'finished' : 'cancelled')
        );
    },
    onPanResponderEnd: (e, gestureState) => {
        console.log("pan responder end", gestureState);
        if (recognizeDrag(gestureState))
            Alert.alert(
                'Add Favorite',
                'Are you sure you wish to add ' + dish.name + ' to favorite?',
                [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                ],
                { cancelable: false }
            );

        return true;
    }
})


class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    handleViewRef = ref => viewR = ref;

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    } 

    obtainCalendarPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show CALENDAR');
            }
        }
        return permission;
    };

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(
          each => each.source.name === 'Default'
        );
        return defaultCalendars[0].source;
    }
    
    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        
        const defaultCalendarSource =
        Platform.OS === 'ios'
            ? await getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };
            
            console.log("Calendar.DEFAULT.id");
            
        try {
            var eventi= await Calendar.createEventAsync("0" ,{
                startDate: Date.parse (date),
                endDate: Date.parse (date)+7200000,/* 2*60*60*1000 = 7 200 000 */
                title: "Con Fusion Table Reservation",                    
                location: "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
                timeZone: "Asia / Hong_Kong", 
                });
            console.log(eventi.toString);
        } catch (E) {
            console.log(E);
        }        
    };

    render() {
        return(
            <ScrollView>
            <Animatable.View ref={this.handleViewRef} animation="zoomIn" duration={2000} delay={1000}
                    {...panResponder.panHandlers}>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                    </View>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DatePicker
                        style={{flex: 2, marginRight: 20}}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    </View>
                    <View style={styles.formRow}>
                    <Button
                        onPress={() => {
                            Alert.alert(
                                ' Your Reservation OK ?',
                                ' Number of Guests: '+ this.state.guests + 
                                '\n Smoking?: ' + (this.state.smoking? 'Yes' : 'No') +
                                '\n Date and Time: '+ this.state.date,
                            [
                              {
                                text: 'Cancel',
                                onPress: () => this.resetForm(),
                                style: 'cancel',
                              },
                                { text: 'OK', onPress: () => {
                                        this.presentLocalNotification(this.state.date);
                                        this.addReservationToCalendar(this.state.date);
                                        this.resetForm(); 
                                    }
                                },
                            ],
                            { cancelable: false }
                          );
                        }}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;