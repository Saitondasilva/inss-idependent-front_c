import  {createSlice} from '@reduxjs/toolkit';

const initialState = {

    state: {
        isFetching: false,
    },
    user:{
  name:"finmap",
  isAuthenticated:false
},
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching : (state) => {
        state.state.isFetching = true;
  }, 
  }  
});

export const {
      setIsFetching,
    } = userSlice.actions;


export default userSlice.reducer;