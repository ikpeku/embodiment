import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface UserState {

    token: string,
    isFirst: boolean,
    isLogin: boolean,
    user: {
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        // isDoctor: boolean,
        avatar: string,
        status: string,
        allergies: string[],
        createdAt: string,
        updatedAt: string,
        role: string,
        // doctorId: string
    },


}

const initialState = {
    isFirst: true,
    isLogin: false,
    // user: {
    //     role: "isUser"
    // }
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

        updateUser: (state, action: PayloadAction<UserState["user"]>) => {
            state.user = action.payload

        },
        loginUserMutation: (state, action: PayloadAction<UserState>) => {
            state.isLogin = action.payload.isLogin,
                state.user = action.payload.user
            state.token = action.payload.token

        },
    },
})

// Action creators are generated for each case reducer function
export const { loginUserMutation, logoutMutation, verifyOTP, returningUser, updateUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const UserState = (state: RootState) => state.user

export default userSlice.reducer