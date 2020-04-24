import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import ContactInfo from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DIshdetailComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } 
from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Button, Image, Text, View, Platform, ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements'; 
import {NetInfo} from "@react-native-community/netinfo";

import Reservation from './ReservationComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { render } from 'react-dom';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

/**************Drawer*******************/
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle={{ backgroundColor: '#D1C4E9', }} >
      <Drawer.Screen name="Login" component={LoginNavigator}
                      options={{
                        title: 'Login',
                        drawerLabel: 'Login',
                        drawerIcon: ({ tintColor, focused }) => (
                          <Icon
                            name='sign-in'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }} />
      <Drawer.Screen name="Home" component={HomeNavigator}
                      options={{
                        title: 'Home',
                        drawerLabel: 'Home',
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }}/> 
      <Drawer.Screen name="About Us" component={AboutNavigator}
                      options={{
                        title: 'About Us',
                        drawerLabel: 'About Us',
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }} />
      <Drawer.Screen name="Menu" component={MenuNavigator}
                      options={{
                        title: 'Menu',
                        drawerLabel: 'Menu',
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }} />
      <Drawer.Screen name="Contact Us" component={ContactInfoNavigator}
                      options={{
                        title: 'Contact Us',
                        drawerLabel: 'Contact Us',
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='address-card'
                            type='font-awesome'
                            size={22}
                            color={tintColor} />
                        ),
                      }} />
      <Drawer.Screen name="Reservation" component={ReservationNavigator}
                      options={{
                        title: 'Reserve Table',
                        drawerLabel: 'Reserve Table',
                        drawerIcon: ({ tintColor }) => (
                          <Icon
                            name='cutlery'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }} />
      <Drawer.Screen name="My Favorites" component={FavoritesNavigator}
                      options={{
                        title: 'My Favorites',
                        drawerLabel: 'My Favorites',
                        drawerIcon: ({ tintColor, focused }) => (
                          <Icon
                            name='heart'
                            type='font-awesome'
                            size={24}
                            color={tintColor} />
                        ),
                      }} />
      </Drawer.Navigator>
  );
}
/*********Custom Drawer***************/
function CustomDrawerContent(props) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('../assets/images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
  );
}

/**************Stack*******************/
const Stack = createStackNavigator();
function MenuNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerStyle:{
            backgroundColor: '#522DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerLeft: () => (
            <Icon
              size={24}
              name='menu'
              color='white'
              onPress={() => navigation.openDrawer()}/>
          ),
        }} />
        <Stack.Screen name="Dishdetail" component={DishDetail}
              options={{
                headerStyle:{
                  backgroundColor: '#522DA8'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  color: '#fff'
                },
              }}/>
    </Stack.Navigator>
  );
}


function FavoritesNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerStyle:{
            backgroundColor: '#522DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerLeft: () => (
            <Icon
              size={24}
              name='menu'
              color='white'
              onPress={() => navigation.openDrawer()}/>
          ),
        }} />
    </Stack.Navigator>
  );
}

function HomeNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle:{
            backgroundColor: '#522DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerLeft: () => (
            <Icon
              size={24}
              name='menu'
              color='white'
              onPress={() => navigation.openDrawer()}/>
          ),
        }} />
    </Stack.Navigator>
  );
}

function AboutNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About Us"
        component={About}
        options={{
          headerStyle:{
            backgroundColor: '#522DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerLeft: () => (
            <Icon
              size={24}
              name='menu'
              color='white'
              onPress={() => navigation.openDrawer()}/>
          ),
        }} />
    </Stack.Navigator>
  );
}

function ContactInfoNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact Us"
        component={ContactInfo}
        options={{
          headerStyle:{
            backgroundColor: '#522DA8'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff'
          },
          headerLeft: () => (
            <Icon
              size={24}
              name='menu'
              color='white'
              onPress={() => navigation.openDrawer()}/>
          ),
        }} />
    </Stack.Navigator>
  );
}

function ReservationNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reservation"
        component={Reservation}
        options={{
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"            
          },
          headerTintColor: "#fff",
          headerLeft: () => (
              <Icon name="menu" size={24}
                iconStyle={{ color: 'white' }} 
                onPress={ () => navigation.openDrawer() } />  
          ),
        }} />
    </Stack.Navigator>
  );
}

function LoginNavigator({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
              backgroundColor: "#512DA8"
          },
          headerTitleStyle: {
              color: "#fff"            
          },
          headerTintColor: "#fff",
          headerLeft: () => (
              <Icon name="menu" size={24}
                iconStyle={{ color: 'white' }} 
                onPress={ () => navigation.openDrawer() } />  
          ),
        }} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
      
    /*NetInfo.getConnectionInfo()
        .then((connectionInfo) => {
          /*console.log('Initial Network Connectivity Type: '
          + connectionInfo.type + ', effectiveType: ' + connectionInfo);
          *
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });
*/
    //NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    //NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  render(){
    return (
      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);