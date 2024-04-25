import Button from '@/shared/Button/Button';
import Input from '@/shared/Input/Input';
import { Color, Gap } from '@/shared/tokens';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { Project, loadProjects } from '@/store/projects.slice';
import DatePicker from '@/shared/DatePicker/DatePicker';
import SelectPicker from '@/shared/SelectPicker/SelectPicker';
import { TaskBody, editTask, formatDate, getTaskById } from '@/store/tasks.slice';
import { useLocalSearchParams } from 'expo-router';

export default function EditTaskPage() {
	const { taskId: id } = useLocalSearchParams();
	const { task } = useSelector((state: RootState) => state.tasks);
	const { projects } = useSelector((state: RootState) => state.projects);
	const dispatch = useAppDispatch();

	const [name, setName] = useState<string>('');
	const [date, setDate] = useState<Date>(new Date());
	const [project, setProject] = useState<Project | undefined>(undefined);
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		dispatch(getTaskById(+id));
		dispatch(loadProjects());
	}, []);

	useEffect(() => {
		if (!task || !projects) return;
		setName(task.name);
		setDate(new Date(task.date));
		setProject(projects.find((project) => project.id === task.project.id));
		setDescription(task.description);
	}, [task, projects]);

	const update = () => {
		if (!name || !date || !project) {
			return;
		}
		const task: TaskBody = { name, date: formatDate(date), project, description };

		dispatch(editTask({ id: +id, task }));
	};

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				style={styles.fields}
				behavior={Platform.OS === 'ios' ? 'position' : undefined}
				contentContainerStyle={styles.iosPosition}
			>
				<Input label="Назваине" value={name} onChangeText={setName} />
				<DatePicker value={date} onChange={setDate} />
				<SelectPicker
					value={project}
					getKey={(project) => project.id}
					getLabel={(project) => project.name}
					getValue={(project) => project.id.toString()}
					onChange={setProject}
					options={projects}
					label="Проект"
				/>
				<Input
					label="Описание"
					multiline={true}
					style={styles.textArea}
					numberOfLines={7}
					textAlignVertical="top"
					value={description}
					onChangeText={setDescription}
				/>
			</KeyboardAvoidingView>
			<Button style={styles.button} onPress={update} title="Обновить" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingHorizontal: 24,
		paddingVertical: 30,
		justifyContent: 'space-between',
	},
	fields: {
		alignSelf: 'stretch',
		gap: Gap.g16,
		marginBottom: 'auto',
	},
	iosPosition: {
		gap: Gap.g16,
	},
	button: {
		width: 220,
		alignSelf: 'center',
	},
	textArea: {
		height: 146,
		paddingVertical: 20,
	},
});
