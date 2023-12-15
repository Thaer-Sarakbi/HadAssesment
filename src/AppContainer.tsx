import React, { useEffect, useState } from 'react';
import AuthStack from './navigation/AuthStack';
import { firebase } from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from 'react-redux';
import { User } from './types/types';
import { setUser } from './redux/authSlice';
import BottomNavigator from './navigation/BottomNavigator';
import { AppDispatch } from './redux/store';

const AppContainer = () => {
  const [user, setCurrentUser] = useState()
  console.log(user)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => {
        dispatch(setUser(u))
        setCurrentUser(u)
    })
  },[])


  if(user){
    return(
      <BottomNavigator/>
    ) 
  } else {
    return(
      <AuthStack />
    )
  }
}
  
export default AppContainer