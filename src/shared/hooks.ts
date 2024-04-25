import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from 'react';

export function useAutentication() {
	const [isAutenticated, setIsAutenticated] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const checkDevice = async () => {
		const supported = await LocalAuthentication.hasHardwareAsync();
		if (!supported) {
			setError('Устройство не поддерижвает биометрическую аутентификацию');
			return;
		}

		const enrolled = await LocalAuthentication.isEnrolledAsync();
		if (!enrolled) {
			setError('На устройстве не сохранены биометрические данные');
			return;
		}

		const result = await LocalAuthentication.authenticateAsync();
		if (result.success) {
			setIsAutenticated(true);
		} else {
			setError(`Ошибка аутентификации: ${result.error}`);
		}
	};

	useEffect(() => {
		checkDevice();
	}, []);

	return [isAutenticated, error] as const;
}
