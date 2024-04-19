import { useEffect } from 'react';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Color, Font } from '@/shared/tokens';
import { store } from '@/store/store';
import RoundButton from '@/shared/RoundButton/RoundButton';
import ArrowBackIcon from '@/assets/icons/arrow-back';
import useLoadDB from '@/DB/dataBase';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const router = useRouter();
	const [dbLoaded, dbError] = useLoadDB();

	const [fontsLoaded, fontError] = useFonts({
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
	});

	useEffect(() => {
		if ((fontsLoaded || fontError) && (dbLoaded || dbError)) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	if (!dbLoaded && !dbError) {
		return null;
	}

	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar style="dark" />
				<Stack
					screenOptions={{
						headerShadowVisible: false,
						headerTitleAlign: 'center',
						headerTitleStyle: {
							color: Color.primaryText,
							fontSize: Font.size.f18,
							fontFamily: Font.family.medium,
						},
					}}
				>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="create-account"
						options={{
							headerTitle: 'Создание аккаунта',
							headerLeft: () => '',
						}}
					/>
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen name="add-task" />
					<Stack.Screen
						name="add-project"
						options={{
							headerTitle: 'Добавить проект',
							headerLeft: () => (
								<RoundButton onPress={() => router.back()}>
									<ArrowBackIcon />
								</RoundButton>
							),
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</Provider>
	);
}
