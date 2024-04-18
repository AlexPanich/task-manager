import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type Project = {
	image: ImageSourcePropType;
	name: string;
	direction: string;
};
export type ProjectsState = Project[];

const initialState: ProjectsState = [];

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, action: PayloadAction<Project>) => {
			state.push(action.payload);
		},
	},
});

export default projectsSlice.reducer;
export const projectsActions = projectsSlice.actions;
