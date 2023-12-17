import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firestore from '@react-native-firebase/firestore'
import { tasks } from '../types/types';

interface MyState {
  data: Array<tasks>
  status: string,
  error: string | undefined
}

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  let tasksList: tasks[] = []
  
   await firestore()
  .collection('tasks')
  .orderBy('creationDate', "desc")
  .get()
  .then(querySnapshot => { 
    querySnapshot.docs.forEach((documentSnapshot) => {
      documentSnapshot.data().id = documentSnapshot.id
      tasksList.push(documentSnapshot.data() as tasks)
    })
  });
  
  return tasksList
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: [],
    status: '',
    error: undefined
  } as MyState,
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