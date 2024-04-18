import Button from '@/shared/Button/Button';
import ImageSelect from '@/shared/ImageSelect/ImageSelect';
import Input from '@/shared/Input/Input';
import { Color, Gap } from '@/shared/tokens';
import { projectsActions } from '@/store/projects.slice';
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const images: ImageSourcePropType[] = [
	require('../assets/images/home.png'),
	require('../assets/images/work.png'),
	require('../assets/images/creation.png'),
];

export default function AddProjectPage() {
	const [image, setImage] = useState(images[0]);
	const [name, setName] = useState<string>('');
	const [direction, setDirection] = useState<string>('');
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();

	const addProject = () => {
		dispatch(projectsActions.addProject({ image, name, direction }));
	};

	return (
		<View style={styles.container}>
			<View>
				<ImageSelect items={images} value={image} onSelect={(image) => setImage(image)} />
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
