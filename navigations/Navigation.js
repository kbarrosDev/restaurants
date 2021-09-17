import React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Restaurants from '../screens/restaurants/Restaurants'
import Account from '../screens/account/Account'

import Favorites from '../screens/Favorites'
import TopRestaurants from '../screens/TopRestaurants'
import Search from '../screens/Search'
import { Icon } from 'react-native-elements'
import AccountStack from './AccountStack'
import RestaurantsStack from './RestaurantsStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {

    // const screenOptions = (route, color) => {
    //     let iconName 
    //     switch (route.name) {
    //         case "restaurants":
    //             iconName = "compass-outline"
    //             break;
    //         case "favorities":
    //             iconName = "heart-outline"
    //             break;
    //         case "top-restaurants":
    //             iconName = "star-outline"
    //             break;
    //         case "search":
    //             iconName = "magnify"
    //             break;
    //         case "account":
    //             iconName = "home-outline"
    //             break;
    //     }
    //     return (
    //         <Icon
    //             type="material-community"
    //             name={iconName}
    //             size={22}
    //             color={color}
    //         />
    //     )
    // }
    const screenOptions = (  route ,color, size ) => {
          let iconName;

          switch (route.name) {
                    case "restaurants":
                        iconName = "compass-outline"
                        break;
                    case "favorities":
                        iconName = "heart-outline"
                        break;
                    case "top-restaurants":
                        iconName = "star-outline"
                        break;
                    case "search":
                        iconName = "magnify"
                        break;
                    case "account":
                        iconName = "home-outline"
                        break;
                }

          // You can return any component that you like here!
          //return <Ionicons name={iconName} size={size} color={color} />;
              return (
                <Icon
                    type="material-community"
                    name={iconName}
                    size={size}
                    color={color}
            />
            )
        }
    //     const secondStack = () => { //Import the other screens you use!
    //         return(
    //          <Stack.Navigator>
    //             <Stack.Screen name="login" component={Login} />
    //          </Stack.Navigator>
    //       )
    //    }
      
    return (
       <NavigationContainer>
            <Tab.Navigator 
                initialRouteName="restaurants"
                tabBarOptions={{
                    // tabBarActiveTintColor: '#442484',
                    // tabBarInactiveTintColor: '#a17dc3'
                    inactiveTintColor:"#e49348",
                    activeTintColor:"#be2f0c",
                    
                }}   
                screenOptions={({route }) => ({
                    
                    tabBarIcon: ({color}) => screenOptions (route,color,22),
                    

                }) } 
                
            >
                <Tab.Screen 
                    name = "restaurants"
                    component = {RestaurantsStack}
                    options={{title: '',tabBarLabel: 'Pedidos',headerShown: false}}
                    
                />
                <Tab.Screen 
                    name = "favorities"
                    component = {Favorites}
                    options={{title: "Promociones"}}
                />
                <Tab.Screen 
                    name = "top-restaurants"
                    component = {TopRestaurants}
                    options={{title: "Top 5"}}
                />
                <Tab.Screen 
                    name = "search"
                    component = {Search}
                    options={{title: "Buscar"}}
                    
                />
                <Tab.Screen 
                    name = "account"
                    component = {AccountStack}
                    options={{title: '',tabBarLabel: 'Cuenta',headerShown: false}}
                />
               
               
            </Tab.Navigator>
           
            
       </NavigationContainer>
       
       
    )

}
