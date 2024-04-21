import { Color, Font, Gap } from '@/shared/tokens';
import { RootState, useAppDispatch } from '@/store/store';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { searchProjects } from '@/store/projects.slice';
import ProjectCardHome from '@/components/ProjectCard/ProjectCardHome';
import { useEffect } from 'react';
import ArrosForwardBlueIcon from '@/assets/icons/arrow-forward-blue';
import { Link } from 'expo-router';
import TaskCard from '@/components/TaskCard/TaskCard';
import { getTasksNotDone } from '@/store/tasks.slice';

export default function HomePage() {
	const { search: projects } = useSelector((state: RootState) => state.projects);
	const { tasks } = useSelector((state: RootState) => state.tasks);
	const dispatch = useAppDispatch();
	const isFoucused = useIsFocused();

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(searchProjects(''));
		dispatch(getTasksNotDone());
	}, [isFoucused]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Мои проекты</Text>
			<View style={styles.projectListWrapper}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.projectList}
				>
					{projects.map((project) => (
						<ProjectCardHome key={project.id} {...project} />
					))}
				</ScrollView>
			</View>
			<View style={styles.tasksHeader}>
				<Text style={styles.tasksTite}>Задачи</Text>
				<Link href="/tasks">
					<ArrosForwardBlueIcon />
				</Link>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.taskList}>
				{tasks.map((task) => (
					<TaskCard {...task} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingTop: 30,
	},
	title: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
		marginBottom: 16,
		paddingHorizontal: 24,
	},
	projectListWrapper: {
		marginBottom: 40,
	},
	projectList: {
		gap: Gap.g12,
		paddingHorizontal: 24,
	},
	tasksHeader: {
		paddingHorizontal: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	tasksTite: {
		color: Color.primaryText,
		fontSize: Font.size.f18,
		fontFamily: Font.family.semibold,
		marginBottom: 20,
	},
	taskList: {
		gap: Gap.g19,
		paddingHorizontal: 24,
	},
});
