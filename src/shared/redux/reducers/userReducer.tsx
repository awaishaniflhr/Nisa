import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  reg: false,
  user: null,
  password: null,
  authToken: null,
  isLoggedIn: false,
  userFormData: null,
  colorCode: '#19383A',
  totalAmount: 0,
  record: null,
  categoryList: null,
  incomeList: null,
  expenceList: null,
  complteHistoryData: null,
  file: null,
  img: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIncomeList: (state, action) => {
      state.incomeList = action.payload;
    },
    setCompleteHistoryData: (state, action) => {
      state.complteHistoryData = action.payload;
    },
    setExpenceList: (state, action) => {
      state.expenceList = action.payload;
    },
    setCategoriesList: (state, action) => {
      state.categoryList = action.payload;
    },
    setRecord: (state, action) => {
      state.record = action.payload;
    },
    setReg: (state, action) => {
      state.reg = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setColorCode: (state, action) => {
      state.colorCode = action.payload;
    },
    setUserFormData: (state, action) => {
      state.userFormData = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    signOut: state => {
      state.user = null;
      state.colorCode = '#19383A';
      state.authToken = null;
      state.isLoggedIn = false;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setImg: (state, action) => {
      state.img = action.payload;
    },
  },
});

export const {
  setReg,
  setUser,
  signOut,
  setPassword,
  setColorCode,
  setAuthToken,
  setIsLoggedIn,
  setUserFormData,
  setTotalAmount,
  setRecord,
  setCategoriesList,
  setExpenceList,
  setIncomeList,
  setCompleteHistoryData,
  setFile,
  setImg,
} = userReducer.actions;

export default userReducer.reducer;
