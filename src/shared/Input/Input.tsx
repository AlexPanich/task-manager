import {
	NativeSyntheticEvent,
	StyleSheet,
	Text,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	View,
} from 'react-native';
import { Color, Font, Gap, Radius } from '../tokens';
import { useState } from 'react';

export default function Input({ style, label, ...props }: TextInputProps & { label?: string }) {
	const [focused, setFocused] = useState<boolean>(false);

	const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true);
		props.onFocus && props.onFocus!(event);
	};
	const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false);
		props.onBlur && props.onBlur(event);
	};
	return (
		<View style={styles.wrapper}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				style={[styles.input, { borderColor: focused ? Color.primary : Color.border }, style]}
				placeholderTextColor={Color.secondaryText}
				{...props}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		gap: Gap.g16,
	},
	label: {
		color: Color.gray,
		fontSize: Font.size.f14,
		fontFamily: Font.family.regular,
	},
	input: {
		height: 60,
		paddingHorizontal: 20,
		backgroundColor: Color.white,
		borderWidth: 1,
		borderRadius: Radius.r16,
		color: Color.primaryText,
		fontSize: Font.size.f16,
		fontFamily: Font.family.regular,
	},
});
