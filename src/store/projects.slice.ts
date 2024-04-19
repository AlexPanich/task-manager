import { insert, select } from '@/DB/dataBase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';

export type CategoryName = 'Default' | 'Home' | 'Work' | 'Creation';
export type Category = { name: CategoryName; image: ImageSourcePropType };

export const categories: Category[] = [
	{ name: 'Default', image: require('../assets/images/default.png') },
	{ name: 'Home', image: require('../assets/images/home.png') },
	{ name: 'Work', image: require('../assets/images/work.png') },
	{ name: 'Creation', image: require('../assets/images/creation.png') },
];

export type Project = {
	id: number;
	category: Category;
	name: string;
	direction: string;
};

export type ProjectBody = Omit<Project, 'id'>;

type ProjectDB = {
	id: number;
	category: CategoryName;
	name: string;
	direction: string;
};

function mapFromDB(rows: ProjectDB[]): Project[] {
	return rows.map((r) => ({
		id: r.id,
		category: categories.find((c) => (c.name = r.category)) || categories[0],
		name: r.name,
		direction: r.direction,
	}));
}

export type ProjectsState = { projects: Project[] };

const initialState: ProjectsState = { projects: [] };

export const saveProject = createAsyncThunk('projects/save', async (project: ProjectBody) => {
	await insert('Projects', {
		category: project.category.name,
		name: project.name,
		direction: project.direction,
	});
});

export const loadProjects = createAsyncThunk('projects/load', async (search: string) => {
	const table = 'Projects';
	const where = search
		? [
				{ column: 'name', op: 'LIKE', value: search },
				{ column: 'direction', op: 'LIKE', value: search },
			]
		: undefined;
	const orderBy = { id: 'ASC' } as const;

	const rows = await select<ProjectDB>(table, undefined, where, orderBy);

	return mapFromDB(rows);
});

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadProjects.fulfilled, (state, action) => {
			if (action.payload) {
				state.projects = action.payload;
			}
		});
	},
});

export default projectsSlice.reducer;
export const projectsActions = projectsSlice.actions;
