import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { Color, Font, Gap } from '@/shared/tokens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { RootState, useAppDispatch } from '@/store/store';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getProjectById } from '@/store/projects.slice';
import { getTaskByProjectId, removeTask } from '@/store/tasks.slice';
import ProgressBar from '@/shared/ProgressBar/ProgressBar';
import TaskCard from '@/components/TaskCard/TaskCard';
import RoundButton from '@/shared/RoundButton/RoundButton';
import EditBlackIcon from '@/assets/icons/edit-black';
import { getCountTaskText } from '@/shared/functions';

export default function Project() {
	const { projectId: id } = useLocalSearchParams();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isFoucused = useIsFocused();
	const { project } = useSelector((state: RootState) => state.projects);
	const { tasks } = useSelector((state: RootState) => state.tasks);
	const completed = useMemo(() => {
		return tasks.reduce((sum, task) => {
			if (task.progress === 100) {
				sum++;
			}
			return sum;
		}, 0);
	}, [tasks]);

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(getProjectById(+id));
		if (Platform.OS === 'android') {
			setTimeout(() => {
				dispatch(getTaskByProjectId(+id));
			}, 1000);
		} else {
			dispatch(getTaskByProjectId(+id));
		}
	}, [id, isFoucused]);

	const deleteTask = (id: number) => {
		dispatch(removeTask(id));
	};

	if (!project) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerRight: () => (
						<RoundButton onPress={() => router.push(`/project/edit-project/${id}`)}>
							<EditBlackIcon />
						</RoundButton>
					),
				}}
			/>
			<Image source={project.picture.image} style={styles.image} />
			<Text style={styles.title}>{project.name}</Text>
			<Text style={styles.countTasks}>{getCountTaskText(tasks.length)}</Text>
			<View style={styles.progressBarWrapper}>
				<ProgressBar total={tasks.length} completed={completed} />
			</View>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
				{tasks.map((task) => (
					<TaskCard key={task.id} onRemove={() => deleteTask(task.id)} {...task} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingHorizontal: 24,
		paddingTop: 30,
	},
	image: {
		height: 100,
		width: 100,
		alignSelf: 'center',
		marginBottom: 37,
	},
	title: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
		textAlign: 'center',
		marginBottom: 2,
	},
	countTasks: {
		color: Color.gray,
		fontSize: Font.size.f14,
		fontFamily: Font.family.regular,
		textAlign: 'center',
		marginBottom: 22,
	},
	progressBarWrapper: {
		marginBottom: 32,
	},
	list: {
		gap: Gap.g19,
	},
});
