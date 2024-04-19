import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user.slice';
import projectsSlice from './projects.slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	reducer: {
		user: userSlice,
		projects: projectsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
