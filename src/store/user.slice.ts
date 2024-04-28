import { insertUser, selectUser } from '@/DB/dataBase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type User = {
	id: number;
	name: string;
	surname: string;
	password: string;
};

export type UserBody = Omit<User, 'id'>;

export type UserState = {
	user: User | null;
	loaded: boolean;
};

const initialState: UserState = {
	user: null,
	loaded: false,
};

export const saveUser = createAsyncThunk(
	'user/save',
	async ({ name, surname, password }: UserBody, { dispatch }) => {
		await insertUser({ name, surname, password });
		dispatch(getUser());
	},
);

export const getUser = createAsyncThunk('user/get', async () => {
	const rows = await selectUser<User>();
	return rows[0] || null;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload;
			state.loaded = true;
		});
	},
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
