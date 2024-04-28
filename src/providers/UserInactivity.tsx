import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

const LOCK_TIMEOUT = 3000;

export default function UserInactivity({ children }: { children: ReactNode }) {
	const appState = useRef(AppState.currentState);
	const timer = useRef<number | null>(null);
	const router = useRouter();

	useEffect(() => {
		const subscription = AppState.addEventListener('change', handleAppStateChange);
		return () => subscription.remove();
	}, []);

	const handleAppStateChange = (nextAppState: AppStateStatus) => {
		if (appState.current === 'active' && nextAppState === 'inactive') {
			router.push('/(modals)/white');
		} else if (nextAppState === 'active' && router.canGoBack()) {
			router.back();
		}

		if (nextAppState === 'background') {
			timer.current = Date.now();
		}

		if (appState.current.match(/background/) && nextAppState === 'active') {
			const elapsed = Date.now() - (timer.current ?? 0);
			if (elapsed > LOCK_TIMEOUT) {
				router.push('/auth');
			}
		}

		appState.current = nextAppState;
	};

	return children;
}
