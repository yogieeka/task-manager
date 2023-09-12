import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Create a slice for the auth feature
// const taskSlice = createSlice({
//   name: 'task',
//   initialState: {
//     taskManager: [],
//     count: 2,
//   } as TaskState,
//   reducers: {
//     addTaskManager: (state, action) => {
//       // state.taskManager.push(action.payload?.task);
//       console.log('task' + JSON.stringify(state));
//       console.log('add task manager' + JSON.stringify(action.payload));
//     },
//     removeTaskManager: (state, action) => {
//       state.taskManager = state.taskManager.filter(
//         item => item !== action.payload,
//       );
//       console.log('remove task manager ' + action.payload);
//     },
//     updateTaskManager: (state, action) => {
//       state.taskManager = state.taskManager.filter(
//         item => item !== action.payload,
//       );
//       const { index, value } = action.payload;
//       if (index >= 0 && index < state.taskManager.length) {
//         state.taskManager[index] = value;
//       }
//       console.log('update task manager' + state.taskManager);
//     },
//   },
// });

const taskSlice = createSlice({
  name: 'task',
  initialState: { taskManager: [], count: 0 } as TaskState,
  reducers: {
    addTaskManager: (state, action: PayloadAction<any>) => {
      if (state.taskManager == null) {
        state.taskManager = [];
      }

      state.taskManager.push(action.payload);
      state.count++;

      console.log(JSON.stringify(action.payload));
    },
    updateTaskManager: (
      state,
      action: PayloadAction<{ index: number; value: any }>,
    ) => {
      const { index, value } = action.payload;
      if (index >= 0 && index < state.taskManager.length) {
        state.taskManager[index] = value;
      }
    },
    removeTaskManager: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      if (indexToRemove >= 0 && indexToRemove < state.taskManager.length) {
        state.taskManager.splice(indexToRemove, 1);
        state.count--;
      }
      if (state.taskManager.length == 0) {
        state.count = 0;
      }
    },
  },
});

export type TaskState = {
  taskManager: any[];
  count: number;
};

// Export the task slice actions
export const { addTaskManager, updateTaskManager, removeTaskManager } =
  taskSlice.actions;

// export default store;
export default taskSlice.reducer;
