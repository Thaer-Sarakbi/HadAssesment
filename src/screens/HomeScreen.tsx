import React, { useEffect, useState } from 'react';
import { FlatList, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getTasks } from '../redux/taskSlice';
import Card from '../components/Cards';
import { Colors } from '../assets/Colors';
import { Task, User } from '../types/types';

interface TasksState {
  tasks: {
    data: Array<Task>,
    task: Task,
    status: string,
    error: string
  },
  auth: {user: User}
}

const HomeScreen = () => {
  const [isFetching, setIsFetching] = useState(false)

  const tasks = useSelector((state: TasksState) => state.tasks.data)
  const status = useSelector((state: TasksState) => state.tasks.status)

  const dispatch = useDispatch<AppDispatch>()

  const onRefresh = () => {
    setIsFetching(true)
    dispatch(getTasks())
    setIsFetching(false)
  }

  useEffect(() => {
    dispatch(getTasks())
  },[])
 
  if(status === 'loading'){
    return (
      <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        {/* <AnimatedLottieView source={require('../assets/loading.json')} autoPlay loop /> */}
      </View>
    )
  } else if(status === 'succeeded'){
    return (
      <View style={{ flex: 1, paddingBottom: 65 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Tasks</Text>
          </View>
          <View >
            <FlatList
              keyExtractor={(item) => item?.id.toString()}
              data={tasks}
              renderItem={({item}) => {
                const data = item
                  return(
                    <TouchableOpacity>
                      <Card item={item} />
                    </TouchableOpacity>
                  )
                } 
              }
              onRefresh= {() => onRefresh()}
              refreshing={isFetching}
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.main,
    paddingHorizontal: 10,
    height: 60,
    paddingBottom: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25
  }
})

export default HomeScreen;