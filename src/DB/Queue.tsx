export default class Queue<T extends () => Promise<void>> {
	private queue: T[] = [];
	private lock = false;

	add(task: T) {
		this.queue.push(task);
		if (!this.lock) {
			this.lock = true;
			this.run();
		}
	}

	run = async () => {
		const nextTask = this.queue.shift();
		if (nextTask) {
			await nextTask();
		}

		if (this.queue.length) {
			this.run();
		} else {
			this.lock = false;
		}
	};
}
