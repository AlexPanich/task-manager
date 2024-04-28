import {
	ActivityIndicator,
	Alert,
	Animated,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/store/store';
import { getUser } from '@/store/user.slice';
import { Redirect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FaceIdIcon from '@/assets/icons/face-id';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Haptics from 'expo-haptics';

export default function auth() {
	const { user, loaded } = useSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [code, setCode] = useState<number[]>([]);
	const codeLength = Array(6).fill(0);
	const translateX = useRef(new Animated.Value(0)).current;

	const shakeAnimationLeft = Animated.timing(translateX, {
		toValue: -10,
		useNativeDriver: true,
		duration: 20,
	}).start;

	const shakeAnimationRight = Animated.timing(translateX, {
		toValue: 10,
		useNativeDriver: true,
		duration: 40,
	}).start;

	const shakeAnimationCenter = Animated.timing(translateX, {
		toValue: 0,
		useNativeDriver: true,
		duration: 20,
	}).start;

	const shakeAnimation = () => {
		shakeAnimationLeft(() =>
			shakeAnimationRight(() =>
				shakeAnimationCenter(() =>
					shakeAnimationLeft(() => shakeAnimationRight(() => shakeAnimationCenter())),
				),
			),
		);
	};

	useEffect(() => {
		dispatch(getUser());
	}, []);

	useEffect(() => {
		if (code.length === 6) {
			if (code.join('') === user?.password) {
				router.push('/(tabs)/task/home');
				setCode([]);
			} else {
				shakeAnimation();
				setCode([]);
			}
		}
	}, [code, user]);

	const onNumberPress = (number: number) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setCode([...code, number]);
	};

	const onBackspacePress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setCode(code.slice(0, -1));
	};

	const onBiometricPress = async () => {
		const supported = await LocalAuthentication.hasHardwareAsync();
		if (!supported) {
			Alert.alert('Устройство не поддерижвает биометрическую аутентификацию');
			return;
		}

		const enrolled = await LocalAuthentication.isEnrolledAsync();
		if (!enrolled) {
			Alert.alert('На устройстве не сохранены биометрические данные');
			return;
		}

		const { success } = await LocalAuthentication.authenticateAsync();
		if (success) {
			router.push('/(tabs)/task/home');
		} else {
			Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
		}
	};

	if (loaded && !user) {
		return <Redirect href="/create-account" />;
	}

	if (!loaded && !user) {
		return <ActivityIndicator size={'large'} color={Color.primary} />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.greeting}>
				Добро пожаловать, {user?.name} {user?.surname}
			</Text>

			<Animated.View style={[styles.codeView, { transform: [{ translateX }] }]}>
				{codeLength.map((_, index) => (
					<View
						key={index}
						style={[
							styles.codeEmpty,
							{
								backgroundColor: code[index] ? Color.primary : Color.secondary,
							},
						]}
					/>
				))}
			</Animated.View>
			<View style={styles.numberView}>
				<View style={styles.numberRow}>
					{[1, 2, 3].map((number) => (
						<Pressable key={number} onPress={() => onNumberPress(number)} style={styles.numberBtn}>
							<Text style={styles.number}>{number}</Text>
						</Pressable>
					))}
				</View>
				<View style={styles.numberRow}>
					{[4, 5, 6].map((number) => (
						<Pressable key={number} onPress={() => onNumberPress(number)} style={styles.numberBtn}>
							<Text style={styles.number}>{number}</Text>
						</Pressable>
					))}
				</View>
				<View style={styles.numberRow}>
					{[7, 8, 9].map((number) => (
						<Pressable key={number} onPress={() => onNumberPress(number)} style={styles.numberBtn}>
							<Text style={styles.number}>{number}</Text>
						</Pressable>
					))}
				</View>
				<View style={styles.numberRow}>
					<Pressable onPress={onBiometricPress} style={styles.numberBtn}>
						<FaceIdIcon />
					</Pressable>
					<Pressable onPress={() => onNumberPress(0)} style={styles.numberBtn}>
						<Text style={styles.number}>0</Text>
					</Pressable>
					<Pressable onPress={onBackspacePress} style={styles.numberBtn}>
						<Text style={styles.number}>⌫</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingHorizontal: 24,
	},
	greeting: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 80,
	},
	codeView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: Gap.g19,
		marginVertical: 80,
	},
	codeEmpty: {
		width: 20,
		height: 20,
		borderRadius: Radius.r16,
	},
	numberView: {
		marginHorizontal: 54,
		gap: Gap.g30,
	},
	numberRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	numberBtn: {
		width: 30,
		alignItems: 'center',
	},
	number: {
		fontSize: Font.size.f35,
		fontFamily: Font.family.regular,
	},
});
