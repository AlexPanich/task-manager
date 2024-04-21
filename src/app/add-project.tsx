import Button from '@/shared/Button/Button';
import PictureSelect from '@/components/PictureSelect/PictureSelect';
import Input from '@/shared/Input/Input';
import { Color, Gap } from '@/shared/tokens';
import { ProjectBody, pictures, saveProject } from '@/store/projects.slice';
import { useAppDispatch } from '@/store/store';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AddProjectPage() {
	const [picture, setPicture] = useState(pictures[0]);
	const [name, setName] = useState<string>('');
	const [direction, setDirection] = useState<string>('');
	const insets = useSafeAreaInsets();
	const dispatch = useAppDispatch();

	const addProject = () => {
		if (!name || !direction) {
			return;
		}
		const project: ProjectBody = { picture, name, direction };

		dispatch(saveProject(project));
	};

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
			<Button
				style={[styles.button, { marginBottom: insets.bottom }]}
				onPress={addProject}
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
	button: {
		width: '75%',
		alignSelf: 'center',
		marginTop: 60,
	},
});
