import { Color } from '@/shared/tokens';
import { StyleSheet, Text, View } from 'react-native';

export default function TasksPage() {
	return (
		<View style={styles.container}>
			<Text>TasksPage</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingTop: 30,
	},
});
