import SearchIcon from '@/assets/icons/search';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Input from '@/shared/Input/Input';
import { Color, Font, Gap } from '@/shared/tokens';
import { removeProject, searchProjects } from '@/store/projects.slice';
import { RootState, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export default function ProjectsPage() {
	const [search, setSearch] = useState<string>('');
	const { search: projects } = useSelector((state: RootState) => state.projects);
	const dispatch = useAppDispatch();
	const isFoucused = useIsFocused();

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(searchProjects(search));
	}, [search, isFoucused]);

	const deleteProject = (id: number) => {
		dispatch(removeProject(id));
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchWrapper}>
				<Input
					icon={<SearchIcon />}
					placeholder="Найти"
					style={styles.search}
					onChangeText={setSearch}
					value={search}
				/>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
				{projects.map((project) => (
					<ProjectCard key={project.id} {...project} onRemove={() => deleteProject(project.id)} />
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
	searchWrapper: {
		marginBottom: 30,
	},
	search: {
		height: 48,
		fontSize: Font.size.f14,
		fontFamily: Font.family.medium,
	},
	list: {
		gap: Gap.g19,
	},
});
