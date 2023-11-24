import { createSlice } from '@reduxjs/toolkit'
//TODO config default avatar url
export const defaultAvatarUrl = 'https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67'
export const UserInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        token: '',
        info: {},
    },
    reducers: {
        initToken: (state) => {
            const token = localStorage.getItem('token')
            console.log('token', token)
            if (token) {
                state.token = token

                const info = JSON.parse(atob(token.split('.')[1]))
                state.info = {
                    ...info,
                    avatarUrl: info.avatarUrl ? `http://localhost:8000${info.avatarUrl}` : defaultAvatarUrl,
                }
            }
        },
        setToken: (state, action) => {
            const token = action.payload
            localStorage.setItem('token', token)
            state.token = token
            const info = JSON.parse(atob(token.split('.')[1]))
            state.info = {
                ...info,
                avatarUrl: info.avatarUrl ? `http://localhost:8000${info.avatarUrl}` : defaultAvatarUrl,
            }
        },
        removeToken: (state) => {
            state.token = ''
            localStorage.removeItem('token')
            state.info = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { initToken, setToken, removeToken } = UserInfoSlice.actions

export default UserInfoSlice.reducer
