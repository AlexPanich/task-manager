import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

const dbName = 'mySQLiteDB.db';

let db: SQLite.SQLiteDatabase;

async function createDatabase() {
	db = SQLite.openDatabase(dbName);

	await db.transactionAsync(async (tx) => {
		await tx.executeSqlAsync(`
				CREATE TABLE IF NOT EXISTS Projects 
				(
					  id INTEGER PRIMARY KEY AUTOINCREMENT,
					  category TEXT NOT NULL CHECK (category IN ('Home', 'Work', 'Creation', 'Default')),
					  name TEXT NOT NULL,
					  direction TEXT NOT NULL,
					  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
	} else {
		db = SQLite.openDatabase(dbName);
	}
}

export default function useLoadDB() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	loadDatabase()
		.then(() => setLoaded(true))
		.catch((err) => setError(`Ошибка подключения к базе данных: ${err.message}`));

	return [loaded, error];
}

export function getDB() {
	if (!db) {
		throw Error('База данных не загружена');
	}
	return db;
}

export async function insert(table: string, values: Record<string, string | number>) {
	const db = getDB();
	try {
		await db.transactionAsync(async (tx) => {
			await tx.executeSqlAsync(
				`INSERT INTO ${table} (${Object.keys(values).join(', ')}) VALUES (?, ?, ?)`,
				Object.values(values),
			);
		});
	} catch (error) {
		console.log(error);
	}
}

export async function select<T>(
	table: string,
	columns?: string[],
	orderBy?: Record<string, 'ASC' | 'DESC'>,
) {
	let rows: T[] = [];
	try {
		await db.transactionAsync(async (tx) => {
			const sql = `SELECT ${columns ? columns.join(', ') : '*'} FROM ${table} ${
				orderBy
					? 'ORDER BY ' +
						Object.entries(orderBy)
							.map(([k, v]) => `${k} ${v}`)
							.join(', ')
					: ''
			}`;
			const result = await tx.executeSqlAsync(sql, []);
			rows = result.rows as T[];
		}, true);
	} catch (error) {
		console.log(error);
	}
	return rows;
}
