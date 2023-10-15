import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import auth from '@react-native-firebase/auth';
import {AUTH} from './context/ContextApi';

const Stack = createNativeStackNavigator();

const NavigatorApp = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const {setData} = useContext(AUTH);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // setData(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // unsubscribe on unmount
  }, []);
  useEffect(() => {
    setData(user);
  }, [user]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user != null ? (
          <Stack.Screen name="home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorApp;
