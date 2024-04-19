import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Color, Font } from '@/shared/tokens';
import RoundButton from '@/shared/RoundButton/RoundButton';
import PlusBlackIcon from '@/assets/icons/plus-black';

export default function ProjectLayout() {
	const router = useRouter();

	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTitleStyle: styles.headerTitle,
			}}
		>
			<Stack.Screen
				name="projects"
				options={{
					headerTitle: 'Проекты',
					headerRight: () => (
						<RoundButton onPress={() => router.push('/add-project')}>
							<PlusBlackIcon />
						</RoundButton>
					),
				}}
			/>
			<Stack.Screen name="[id]" />
		</Stack>
	);
}

const styles = StyleSheet.create({
	headerTitle: {
		color: Color.primaryText,
		fontSize: Font.size.f18,
		fontFamily: Font.family.medium,
	},
});
