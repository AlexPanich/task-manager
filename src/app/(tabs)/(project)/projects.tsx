import SearchIcon from '@/assets/icons/search';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Input from '@/shared/Input/Input';
import { Color, Font, Gap } from '@/shared/tokens';
import { loadProjects } from '@/store/projects.slice';
import { RootState, useAppDispatch } from '@/store/store';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

export default function ProjectsPage() {
	const [search, setSearch] = useState<string>('');
	const { projects } = useSelector((state: RootState) => state.projects);
	const dispatch = useAppDispatch();
	const isFoucused = useIsFocused();

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(loadProjects(search));
	}, [search, isFoucused]);

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
					<ProjectCard key={project.id} {...project} />
				))}
			</ScrollView>
			<Link href={`/(tabs)/(project)/1`}>
				<Text>на 1</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingHorizontal: 24,
		paddingVertical: 30,
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
