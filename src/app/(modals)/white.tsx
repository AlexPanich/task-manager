import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Color } from '@/shared/tokens';

export default function white() {
	return <View style={styles.container} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
	},
});
