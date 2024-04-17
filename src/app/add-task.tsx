import { Color } from '@/shared/tokens';
import { StyleSheet, Text, View } from 'react-native';

export default function AddTaskPage() {
	return (
		<View style={styles.container}>
			<Text>AddTaskPage</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
