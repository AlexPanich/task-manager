import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Color, Font, Gap } from '@/shared/tokens';
import Input from '@/shared/Input/Input';
import Button from '@/shared/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { userActions } from '@/store/user.slice';

export default function CreateAccountPage() {
	const insets = useSafeAreaInsets();
	const { name, surname } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();

	const setName = (text: string) => {
		dispatch(userActions.setName(text));
	};

	const setSurname = (text: string) => {
		dispatch(userActions.setSurname(text));
	};

	return (
		<View style={[styles.wrapper, { paddingTop: insets.top }]}>
			<Text style={styles.title}>Добро пожаловать!</Text>
			<Text style={styles.text}>Чтобы продолжить, заполните начальную информацию о вас?</Text>
			<View style={styles.fields}>
				<Input placeholder="Ваше имя" value={name} onChangeText={setName} />
				<Input placeholder="Ваша фамилия" value={surname} onChangeText={setSurname} />
			</View>
			<Button title="Начать" />
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: Color.white,
		paddingHorizontal: 24,
	},
	title: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
		marginBottom: 10,
	},
	text: {
		color: Color.secondaryText,
		fontSize: Font.size.f14,
		fontFamily: Font.family.regular,
		lineHeight: Font.size.f14 * 1.7,
		marginBottom: 40,
	},
	fields: {
		gap: Gap.g30,
		marginBottom: 60,
	},
});
