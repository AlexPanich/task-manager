import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { Color, Font } from '@/shared/tokens';
import PlusBlackIcon from '@/assets/icons/plus-black';
import RoundButton from '@/shared/RoundButton/RoundButton';
import ArrowBackIcon from '@/assets/icons/arrow-back';

function getCurrentDate() {
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const date = new Date();
	return `${days[date.getDay()]}, ${date.getDate()}`;
}

export default function TasksLayout() {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: styles.headerTitle,
				headerTitleAlign: 'center',
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
				name="index"
				options={{
					headerTitle: 'Задачи',
					headerLeft: () => (
						<RoundButton onPress={() => router.back()}>
							<ArrowBackIcon />
						</RoundButton>
					),
					headerRight: () => (
						<RoundButton onPress={() => router.push('/add-task')}>
							<PlusBlackIcon />
						</RoundButton>
					),
				}}
			/>
			<Stack.Screen
				name="[taskId]"
				options={{
					headerTitle: 'Задача',
					headerLeft: () => (
						<RoundButton onPress={() => router.back()}>
							<ArrowBackIcon />
						</RoundButton>
					),
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
