import Button from '@/shared/Button/Button';
import PictureSelect from '@/components/PictureSelect/PictureSelect';
import Input from '@/shared/Input/Input';
import { Color, Gap } from '@/shared/tokens';
import { ProjectBody, editProject, getProjectById, pictures } from '@/store/projects.slice';
import { RootState, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function EditProjectPage() {
	const { id } = useLocalSearchParams();
	const [picture, setPicture] = useState(pictures[0]);
	const [name, setName] = useState<string>('');
	const [direction, setDirection] = useState<string>('');
	const dispatch = useAppDispatch();
	const { project } = useSelector((state: RootState) => state.projects);
	const isFoucused = useIsFocused();

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(getProjectById(+id));
	}, [id, isFoucused]);

	useEffect(() => {
		if (!project) return;

		setPicture(project.picture);
		setName(project.name);
		setDirection(project.direction);
	}, [project]);

	const update = () => {
		if (!name || !direction) {
			return;
		}
		const project: ProjectBody = { picture, name, direction };

		dispatch(editProject({ id: +id, project }));
	};

	if (!project) {
		return null;
	}

	return (
		<View style={styles.container}>
			<View>
				<PictureSelect
					items={pictures}
					value={picture}
					onSelect={(picture) => setPicture(picture)}
				/>
				<View style={styles.fields}>
					<Input label="Назваине" value={name} onChangeText={setName} />
					<Input label="Направление" value={direction} onChangeText={setDirection} />
				</View>
			</View>
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
		marginTop: 40,
		marginBottom: 'auto',
	},
	button: {
		width: '75%',
		alignSelf: 'center',
		marginBottom: 40,
	},
});
