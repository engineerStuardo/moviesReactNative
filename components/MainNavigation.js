import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Navbar from '../components/Navbar';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTransparent: true,
          headerBackVisible: false,
          headerTitle: () => <Navbar main={true} />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Detail}
        options={{
          headerTransparent: true,
          headerBackVisible: false,
          headerTitle: () => <Navbar />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
