import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";



export const registerUserThunk=async(url,user,thunkAPI)=>{
    try {
        const res=await customFetch.post(url,user);
        return res.data
        }
        catch (error) {
       return thunkAPI.rejectWithValue(error.response.data.msg)
      }
};

export const loginUserThunk=async(url,user,thunkAPI)=>{
    try{
        const res=await customFetch.post(url,user);
        return res.data;
      }
      catch(error){
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
};

export const updateUserThunk=async(url,user,thunkAPI)=>{
    try {
        const resp=await customFetch.patch(url,user);

        return resp.data;
        
      } catch (error) {
        //If there is error related to 401, logout the user...
        return checkForUnauthorizedResponse(error,thunkAPI);
      }
};

export const clearStoreThunk=async(message,thunkAPI)=>{
    
  try {
    //logout
    thunkAPI.dispatch(logoutUser(message));

     //clear jobs
     thunkAPI.dispatch(clearAllJobsState());

     //clear store
     thunkAPI.dispatch(clearValues());
     return Promise.resolve();

  } catch (error) {
     return Promise.reject();
  }
}


