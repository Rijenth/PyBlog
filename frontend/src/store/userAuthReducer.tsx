import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    loginState: boolean;
    userId: number;
    admin: boolean;
}

const initialState: UserState = {
    loginState: false,
    userId: 0,
    admin: false
}

const userAuth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginState: (state, action: PayloadAction<boolean>) => {
            state.loginState = action.payload
        },
        setUserId: (state, action: PayloadAction<number>) => {
            state.userId = action.payload
        },
        setAdmin: (state, action: PayloadAction<boolean>) => {
            state.admin = action.payload
        }
    }
})
export const {setLoginState, setUserId, setAdmin} = userAuth.actions
export default userAuth