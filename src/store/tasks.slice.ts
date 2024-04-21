import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PictureType, Project, pictures } from './projects.slice';
import { insertTask, selectTasksByProjectId, selectTasksNotDone } from '@/DB/dataBase';

export type Task = {
	id: number;
	name: string;
	date: string;
	project: Project;
	description: string;
	progress: number;
};

type TaskDB = {
	id: number;
	name: string;
	date: string;
	description: string;
	progress: number;
	project_id: number;
	project_name: string;
	project_picture: PictureType;
	project_direction: string;
};

export type TaskBody = Omit<Task, 'id' | 'progress'>;

export type TasksState = { tasks: Task[] };

const initialState: TasksState = { tasks: [] };

const fromDB = (rows: TaskDB[]): Task[] => {
	return rows.map((r) => ({
		id: r.id,
		name: r.name,
		date: r.date,
		project: {
			id: r.project_id,
			name: r.project_name,
			picture: pictures.find((p) => p.name === r.project_picture) || pictures[0],
			direction: r.project_direction,
		},
		description: r.description,
		progress: r.progress,
	}));
};

export const formatDate = (date: Date) =>
	`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const saveTask = createAsyncThunk('tasks/save', async (task: TaskBody) => {
	await insertTask({
		name: task.name,
		date: task.date,
		project_id: task.project.id,
		description: task.description,
		progress: 0,
	});
});

export const getTaskByProjectId = createAsyncThunk(
	'tasks/getByProjectId',
	async (projectId: number) => {
		const rows = await selectTasksByProjectId<TaskDB>(projectId);
		return fromDB(rows);
	},
);

export const getTasksNotDone = createAsyncThunk('tasks/getNotDone', async () => {
	const rows = await selectTasksNotDone<TaskDB>();
	return fromDB(rows);
});

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTaskByProjectId.fulfilled, (state, action) => {
			state.tasks = action.payload;
		});
		builder.addCase(getTasksNotDone.fulfilled, (state, action) => {
			state.tasks = action.payload;
		});
	},
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
