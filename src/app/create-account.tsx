import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, Font, Gap } from '@/shared/tokens';
import Input from '@/shared/Input/Input';
import Button from '@/shared/Button/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUser, saveUser } from '@/store/user.slice';
import { RootState, useAppDispatch } from '@/store/store';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';

export default function CreateAccountPage() {
	const insets = useSafeAreaInsets();
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { user } = useSelector((state: RootState) => state.user);

	const createUser = () => {
		if (!name || !surname || !password) {
			return;
		}

		dispatch(saveUser({ name, surname, password }));
	};

	useEffect(() => {
		if (user) {
			router.replace('/(tabs)/task/home');
		} else {
			dispatch(getUser());
		}
	}, [user]);

	return (
		<View style={[styles.wrapper, { paddingTop: insets.top }]}>
			<Text style={styles.title}>Добро пожаловать!</Text>
			<Text style={styles.text}>Чтобы продолжить, заполните начальную информацию о вас?</Text>
			<View style={styles.fields}>
				<Input placeholder="Ваше имя" value={name} onChangeText={setName} />
				<Input placeholder="Ваша фамилия" value={surname} onChangeText={setSurname} />
				<Input
					placeholder="Пароль 6 цифр"
					maxLength={6}
					inputMode="numeric"
					value={password}
					onChangeText={setPassword}
				/>
			</View>
			<Button title="Начать" onPress={createUser} />
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
