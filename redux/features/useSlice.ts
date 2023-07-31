import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface UserState {

    // token: string,
    isFirst: boolean,
    isLogin: boolean,
    user: {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        isDoctor: boolean,
        status: string,
        allergies: string[],
        createdAt: string,
        updatedAt: string,
    },


}

const initialState = {
    isFirst: true,
    isLogin: false,
    // user: {} as 
} as UserState

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutMutation: (state) => {
            state.isLogin = false
            state.isFirst = false
        },
        returningUser: (state) => {
            state.isFirst = false
        },
        verifyOTP: (state, action: PayloadAction<{ isLogin: boolean }>) => {
            state.isLogin = action.payload.isLogin
        },

        loginUserMutation: (state, action: PayloadAction<UserState>) => {
            state.isLogin = action.payload.isLogin,
                state.user = action.payload.user

        },
    },
})

// Action creators are generated for each case reducer function
export const { loginUserMutation, logoutMutation, verifyOTP, returningUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const UserState = (state: RootState) => state.user

export default userSlice.reducer