import { StyleSheet, View } from 'react-native';
import { Color, Radius } from '../tokens';

export default function ProgressBar({ total, completed }: { total: number; completed: number }) {
	const percent = Math.round((completed / total) * 100);

	return (
		<View style={styles.bar}>
			<View
				style={[
					styles.progress,
					{ width: `${percent}%` },
					{ backgroundColor: total === completed ? Color.green : Color.primary },
				]}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	bar: {
		height: 8,
		backgroundColor: Color.secondary,
		borderRadius: Radius.r4,
	},
	progress: {
		height: '100%',
		borderRadius: Radius.r4,
	},
});
