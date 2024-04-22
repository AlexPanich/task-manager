export function getCountTaskText(count: number) {
	const remainer = count % 10;
	if (remainer === 1) {
		return `${count} задача`;
	}
	if (remainer > 1 && remainer < 5) {
		return `${count} задачи`;
	}
	return `${count} задач`;
}
