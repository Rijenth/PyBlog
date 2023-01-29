import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    loginState: boolean;
    userId: number;
}

const initialState: UserState = {
    loginState: false,
    userId: 0
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
        }
    }
})
export const {setLoginState, setUserId} = userAuth.actions
export default userAuth