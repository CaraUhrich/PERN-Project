import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: sessionStorage.getItem('token') === null ?
        ''
        : JSON.parse(sessionStorage.getItem('token'))
}

const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        updateToken: (state, { payload }) => {
            state.token = payload
            sessionStorage.setItem('token', JSON.stringify(state.token))
        }
    }
})

export default tokenSlice.reducer
export const { updateToken } = tokenSlice.actions