import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, Font, Gap } from '@/shared/tokens';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import RoundButton from '@/shared/RoundButton/RoundButton';
import EditBlackIcon from '@/assets/icons/edit-black';
import Slider from '@react-native-community/slider';
import Button from '@/shared/Button/Button';
import { useIsFocused } from '@react-navigation/native';
import { RootState, useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { getTaskById, setTaskProgress } from '@/store/tasks.slice';

export default function TaskPage() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const dispatch = useAppDispatch();
	const { task } = useSelector((state: RootState) => state.tasks);
	const isFoucused = useIsFocused();
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		if (!isFoucused) {
			return;
		}
		dispatch(getTaskById(+id));
	}, [id, isFoucused]);

	useEffect(() => {
		if (!task) return;
		setProgress(task.progress);
	}, [task]);

	const update = () => {
		dispatch(setTaskProgress({ id: +id, progress }));
	};

	if (!task) {
		return;
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					headerRight: () => (
						<RoundButton onPress={() => router.push(`/home`)}>
							<EditBlackIcon />
						</RoundButton>
					),
				}}
			/>
			<View>
				<View style={styles.info}>
					<Text style={styles.name}>{task.name}</Text>
					<Text style={styles.date}>{new Date(task.date).toLocaleDateString()}</Text>
					<Text style={styles.description}>{task.description}</Text>
				</View>
				<View style={styles.progressSection}>
					<Text style={styles.progressTitle}>Прогресс</Text>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={100}
						minimumTrackTintColor={Color.primary}
						maximumTrackTintColor={Color.secondary}
						onValueChange={setProgress}
						step={1}
						thumbTintColor={Color.primary}
						value={progress}
					/>
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
		paddingTop: 30,
		justifyContent: 'space-between',
	},
	info: {
		marginBottom: 54,
	},
	name: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
		textAlign: 'center',
		marginBottom: 4,
	},
	date: {
		color: Color.gray,
		fontSize: Font.size.f14,
		fontFamily: Font.family.regular,
		textAlign: 'center',
		marginBottom: 32,
	},
	description: {
		color: Color.gray,
		fontSize: Font.size.f16,
		fontFamily: Font.family.regular,
	},
	progressSection: {
		gap: Gap.g26,
	},
	progressTitle: {
		color: Color.primaryText,
		fontSize: Font.size.f18,
		fontFamily: Font.family.semibold,
	},
	slider: {},
	button: {
		width: '75%',
		alignSelf: 'center',
		marginBottom: 40,
	},
});
