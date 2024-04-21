import {
	insertProject,
	selectProjects,
	selectProjectsWithTasksBySearch,
	selectProjectById,
} from '@/DB/dataBase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type PictureType = 'Default' | 'Home' | 'Work' | 'Creation';
export type Picture = { name: PictureType; image: ImageSourcePropType };

export const pictures: Picture[] = [
	{ name: 'Default', image: require('../assets/images/default.png') },
	{ name: 'Home', image: require('../assets/images/home.png') },
	{ name: 'Work', image: require('../assets/images/work.png') },
	{ name: 'Creation', image: require('../assets/images/creation.png') },
];

export type Project = {
	id: number;
	picture: Picture;
	name: string;
	direction: string;
};

export type ProjectBody = Omit<Project, 'id'>;

type ProjectDB = {
	id: number;
	picture: PictureType;
	name: string;
	direction: string;
};

type TaskInfo = { total: number; completed: number };

export type ProjectSearch = Project & TaskInfo;
type ProjectSearchDB = ProjectDB & TaskInfo;

function mapFromDB(rows: ProjectDB[]): Project[] {
	return rows.map((r) => ({
		id: r.id,
		picture: pictures.find((c) => c.name === r.picture) || pictures[0],
		name: r.name,
		direction: r.direction,
	}));
}

function mapFromDBwithTaskInfo(rows: ProjectSearchDB[]): ProjectSearch[] {
	return rows.map((r) => ({
		id: r.id,
		picture: pictures.find((c) => c.name === r.picture) || pictures[0],
		name: r.name,
		direction: r.direction,
		total: r.total,
		completed: r.completed,
	}));
}

export type ProjectsState = {
	projects: Project[];
	search: ProjectSearch[];
	project: Project | null;
};

const initialState: ProjectsState = { projects: [], search: [], project: null };

export const saveProject = createAsyncThunk('projects/save', async (project: ProjectBody) => {
	await insertProject({
		picture: project.picture.name,
		name: project.name,
		direction: project.direction,
	});
});

export const loadProjects = createAsyncThunk('projects/load', async () => {
	const rows = await selectProjects<ProjectDB>();
	return mapFromDB(rows);
});

export const searchProjects = createAsyncThunk('projects/search', async (search: string) => {
	const rows = await selectProjectsWithTasksBySearch<ProjectSearchDB>(search.trim());
	return mapFromDBwithTaskInfo(rows);
});

export const getProjectById = createAsyncThunk('projects/getById', async (id: number) => {
	const rows = await selectProjectById<ProjectDB>(id);
	return mapFromDB(rows)[0];
});

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadProjects.fulfilled, (state, action) => {
			state.projects = action.payload;
		});
		builder.addCase(searchProjects.fulfilled, (state, action) => {
			state.search = action.payload;
		});
		builder.addCase(getProjectById.fulfilled, (state, action) => {
			state.project = action.payload;
		});
	},
});

export default projectsSlice.reducer;
export const projectsActions = projectsSlice.actions;
