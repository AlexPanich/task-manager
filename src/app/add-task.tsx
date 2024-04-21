import Button from '@/shared/Button/Button';
import Input from '@/shared/Input/Input';
import { Color, Gap } from '@/shared/tokens';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { Project, loadProjects } from '@/store/projects.slice';
import DatePicker from '@/shared/DatePicker/DatePicker';
import SelectPicker from '@/shared/SelectPicker/SelectPicker';
import { TaskBody, formatDate, saveTask } from '@/store/tasks.slice';

export default function AddTaskPage() {
	const insets = useSafeAreaInsets();

	const { projects } = useSelector((state: RootState) => state.projects);
	const dispatch = useAppDispatch();

	const [name, setName] = useState<string>('');
	const [date, setDate] = useState<Date>(new Date());
	const [project, setProject] = useState<Project | undefined>(undefined);
	const [description, setDescription] = useState<string>('');

	useEffect(() => {
		dispatch(loadProjects());
	}, []);

	const addTask = () => {
		if (!name || !date || !project) {
			return;
		}
		const task: TaskBody = { name, date: formatDate(date), project, description };

		dispatch(saveTask(task));
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
			<Button
				style={[styles.button, { bottom: insets.bottom + 30 }]}
				onPress={addTask}
				title="Сохранить"
			/>
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
		marginTop: 40,
		marginBottom: 'auto',
	},
	iosPosition: {
		gap: Gap.g16,
	},
	button: {
		width: 220,
		alignSelf: 'center',
		position: 'absolute',
	},
	textArea: {
		height: 146,
		paddingVertical: 20,
	},
});
