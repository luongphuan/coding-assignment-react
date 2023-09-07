import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '@acme/shared-models';

type initialStateType = {
    users: User[];
};

const initialState: initialStateType = {
    users: []
};

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        }
    }
})

export const { setUsers } = ticketSlice.actions

export default ticketSlice.reducer