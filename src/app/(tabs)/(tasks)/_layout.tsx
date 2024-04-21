import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Color, Font } from '@/shared/tokens';

function getCurrentDate() {
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const date = new Date();
	return `${days[date.getDay()]}, ${date.getDate()}`;
}

export default function ProjectLayout() {
	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: styles.headerTitle,
			}}
		>
			<Stack.Screen
				name="home"
				options={{
					headerTitle: '',
					headerLeft: () => <Text style={styles.headerTitle}>{getCurrentDate()}</Text>,
				}}
			/>
			<Stack.Screen
				name="tasks"
				options={{
					headerTitle: 'Задачи',
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	headerTitle: {
		color: Color.primaryText,
		fontSize: Font.size.f18,
		fontFamily: Font.family.medium,
		marginLeft: 10,
	},
});
