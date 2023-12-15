import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { tasks } from '../types/types';

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {

  const tasksList = await firestore()
  .collection('tasks')
  .orderBy('creationDate', "desc")
  .get()
  .then(querySnapshot => { 
    return querySnapshot.docs
  });
  
  return tasksList
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
    status: '',
    error: undefined
  } as tasks,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.data = payload
      })
      .addCase(getTasks.rejected, (state, action) => {
        console.log(action)
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default tasksSlice