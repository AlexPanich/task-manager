import { Color } from '@/shared/tokens';
import { StyleSheet, Text, View } from 'react-native';

export default function ProjectsPage() {
	return (
		<View style={styles.container}>
			<Text>ProjectsPage</Text>
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
