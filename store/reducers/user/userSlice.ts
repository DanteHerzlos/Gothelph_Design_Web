import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/IUser";

interface userState {
  user: IUser;
  isAuth: boolean;
}

const initialState: userState = {
  user: {} as IUser,
  isAuth: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}
});

export const { } =
  userSlice.actions;

export default userSlice.reducer;



// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setIsAuth(state, action: PayloadAction<boolean>) {
//       state.isAuth = action.payload;
//     },
//     setIsLoading(state, action: PayloadAction<boolean>) {
//       state.isLoading = action.payload;
//     },
//     setRegistrationLoading(state, action: PayloadAction<boolean>) {
//       state.registrationLoading = action.payload;
//     },
//     setError(state, action: PayloadAction<string>) {
//       state.error = action.payload;
//     },
//     setUser(state, action: PayloadAction<IUser>) {
//       state.user = action.payload;
//     },
//   },
// });