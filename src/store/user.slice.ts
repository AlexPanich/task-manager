import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserState = {
	name: string;
	surname: string;
};

const initialState = {
	name: '',
	surname: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setSurname: (state, action: PayloadAction<string>) => {
			state.surname = action.payload;
		},
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
