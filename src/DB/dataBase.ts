import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const dbName = 'mySQLiteDB.db';

let db: SQLite.SQLiteDatabase;

async function createDatabase() {
	db = SQLite.openDatabase(dbName);

	await db.transactionAsync(async (tx) => {
		await tx.executeSqlAsync(`
				CREATE TABLE IF NOT EXISTS projects (
					  id INTEGER PRIMARY KEY AUTOINCREMENT,
					  picture VARCHAR(50) NOT NULL CHECK (picture IN ('Home', 'Work', 'Creation', 'Default')),
					  name VARCHAR(50) NOT NULL,
					  direction VARCHAR(50) NOT NULL
				)
			`);
		await tx.executeSqlAsync(`
				CREATE TABLE IF NOT EXISTS tasks 
				(
					  id INTEGER PRIMARY KEY AUTOINCREMENT,
					  name VARCHAR(50) NOT NULL,
					  date DATE NOT NULL,
					  project_id INTEGER NOT NULL,
					  progress INTEGER NOT NULL CHECK (progress >=0 AND progress <= 100),
					  description TEXT,
					  FOREIGN KEY (project_id) REFERENCES Projects(id) ON DELETE CASCADE
				)
			`);
	});
}

async function loadDatabase() {
	const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

	const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
	if (!fileInfo.exists) {
		await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
			intermediates: true,
		});
		await createDatabase();
		console.log('База данных создана');
	} else {
		db = SQLite.openDatabase(dbName);
		console.log('База данных загружена');
		// FileSystem.deleteAsync(dbFilePath).then(() => console.log('База данных удалена'));
	}
}

export default function useLoadDB() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadDatabase()
			.then(() => setLoaded(true))
			.catch((err) => setError(`Ошибка подключения к базе данных: ${err.message}`));
	}, []);

	return [loaded, error] as const;
}

export function getDB() {
	if (!db) {
		throw Error('База данных не загружена');
	}
	return db;
}

export async function insertProject({
	picture,
	name,
	direction,
}: {
	picture: string;
	name: string;
	direction: string;
}) {
	const db = getDB();
	try {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(`INSERT INTO projects (picture, name, direction) VALUES (?, ?, ?)`, [
				picture,
				name,
				direction,
			]);
		});
		return null;
	} catch (error) {
		return error;
	}
}
export async function insertTask({
	name,
	date,
	project_id,
	description,
	progress,
}: {
	name: string;
	date: string;
	project_id: number;
	description: string;
	progress: number;
}) {
	const db = getDB();
	try {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(
				`INSERT INTO tasks (name, date, project_id, description, progress) VALUES (?, ?, ?, ?, ?)`,
				[name, date, project_id, description, progress],
			);
		});
	} catch (error) {
		console.log(error);
	}
}
export async function selectProjects<T>() {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(`SELECT * FROM projects ORDER BY id`, []);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}
export async function selectProjectsWithTasksBySearch<T>(search: string) {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				`
					SELECT p.*, COUNT(t.id) AS [total], COUNT(t2.id) AS [completed]
					FROM projects AS p
					LEFT JOIN tasks AS t
					ON p.id = t.project_id 
					LEFT JOIN tasks AS t2
					ON p.id = t2.project_id AND t.progress = 100 AND t.id = t2.id
					WHERE p.name LIKE '%${search}%'
					OR p.direction LIKE '%${search}%'
					GROUP BY p.id
					ORDER BY p.id DESC
				`,
			);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function selectProjectById<T>(id: number) {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(`SELECT * FROM projects WHERE projects.id = ?`, [id]);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function selectTasksByProjectId<T>(projectId: number) {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				`
					SELECT t.*, p.name AS [project_name], p.picture AS [project_picture], p.direction AS [project_direction]
					FROM tasks AS t
					LEFT JOIN projects AS p
					ON t.project_id = p.id
					WHERE t.project_id = ?
					ORDER BY t.date DESC
				`,
				[projectId],
			);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function selectTasksNotDone<T>() {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				`
					SELECT t.*, p.name AS [project_name], p.picture AS [project_picture], p.direction AS [project_direction]
					FROM tasks AS t
					LEFT JOIN projects AS p
					ON t.project_id = p.id
					WHERE t.progress < 100
					ORDER BY t.date DESC
				`,
			);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function selectTasksByDate<T>(date: string) {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				`
					SELECT t.*, p.name AS [project_name], p.picture AS [project_picture], p.direction AS [project_direction]
					FROM tasks AS t
					LEFT JOIN projects AS p
					ON t.project_id = p.id
					WHERE t.date = ?
					ORDER BY t.date DESC
				`,
				[date],
			);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function selectTaskById<T>(id: number) {
	const db = getDB();
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const result = await tx.executeSqlAsync(
				`
					SELECT t.*, p.name AS [project_name], p.picture AS [project_picture], p.direction AS [project_direction]
					FROM tasks AS t
					LEFT JOIN projects AS p
					ON t.project_id = p.id
					WHERE t.id = ?
					ORDER BY t.date DESC
				`,
				[id],
			);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}

export async function updateProject(
	id: number,
	{
		picture,
		name,
		direction,
	}: {
		picture: string;
		name: string;
		direction: string;
	},
) {
	const db = getDB();
	try {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(
				`UPDATE projects SET picture = ?, name = ?, direction = ? WHERE id = ?`,
				[picture, name, direction, id],
			);
		});
		return null;
	} catch (error) {
		return error;
	}
}

export async function updateTaskProgress(id: number, progress: number) {
	const db = getDB();
	try {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(`UPDATE tasks SET progress = ? WHERE id = ?`, [progress, id]);
		});
		return null;
	} catch (error) {
		return error;
	}
}
