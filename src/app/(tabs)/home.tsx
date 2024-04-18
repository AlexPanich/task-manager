import { Color } from '@/shared/tokens';
import { StyleSheet, Text, View } from 'react-native';

export default function HomePage() {
	return (
		<View style={styles.container}>
			<Text>HomePage</Text>
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
