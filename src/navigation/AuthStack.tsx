import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import LoginScreen from "../screens/LoginScreen"
import SignupScreen from "../screens/SignupScreen"


const Stack = createStackNavigator<AuthStackParamsList>()

export type AuthStackParamsList = {
  Login: undefined,
  Signup: undefined
}

const AuthStack = () => {
    return(
      <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    )
  }
  
  export default AuthStack