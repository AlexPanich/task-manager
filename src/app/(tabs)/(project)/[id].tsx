import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color } from '@/shared/tokens';
import { useLocalSearchParams } from 'expo-router';

export default function Project() {
	const { id } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<Text>Project {id}</Text>
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
