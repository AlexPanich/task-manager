import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Color, Font } from '@/shared/tokens';
import { store } from '@/store/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts({
		'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
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
				</Stack>
			</SafeAreaProvider>
		</Provider>
	);
}
