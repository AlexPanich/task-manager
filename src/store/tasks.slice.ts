import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PictureType, Project, pictures } from './projects.slice';
import {
	deleteTask,
	insertTask,
	selectTaskById,
	selectTasksByDate,
	selectTasksByProjectId,
	selectTasksNotDone,
	updateTask,
	updateTaskProgress,
} from '@/DB/dataBase';

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

export type TasksState = { tasks: Task[]; task: Task | null };

const initialState: TasksState = { tasks: [], task: null };

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

export const getTasksByDate = createAsyncThunk('tasks/getByDate', async (date: string) => {
	const rows = await selectTasksByDate<TaskDB>(date);
	return fromDB(rows);
});

export const getTaskById = createAsyncThunk('tasks/getById', async (id: number) => {
	const rows = await selectTaskById<TaskDB>(id);
	return fromDB(rows)[0];
});

export const setTaskProgress = createAsyncThunk(
	'tasks/setProgress',
	async ({ id, progress }: { id: number; progress: number }) => {
		await updateTaskProgress(id, progress);
	},
);

export const editTask = createAsyncThunk(
	'tasks/edit',
	async ({ id, task }: { id: number; task: TaskBody }) => {
		await updateTask(id, {
			name: task.name,
			date: task.date,
			project_id: task.project.id,
			description: task.description,
		});
	},
);

export const removeTask = createAsyncThunk('tasks/delete', async (id: number) => {
	await deleteTask(id);
	return id;
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
		builder.addCase(getTasksByDate.fulfilled, (state, action) => {
			state.tasks = action.payload;
		});
		builder.addCase(getTaskById.fulfilled, (state, action) => {
			state.task = action.payload;
		});
		builder.addCase(removeTask.fulfilled, (state, action) => {
			state.tasks.filter((task) => task.id !== action.payload);
		});
	},
});

export default tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
