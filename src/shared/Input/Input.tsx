import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
} from 'react-native';
import { Color, Font, Radius } from '../tokens';
import { useState } from 'react';

export default function Input({ style, ...props }: TextInputProps) {
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
		<TextInput
			style={[styles.input, { borderColor: focused ? Color.primary : Color.border }, style]}
			placeholderTextColor={Color.secondaryText}
			{...props}
			onFocus={handleFocus}
			onBlur={handleBlur}
		/>
	);
}

const styles = StyleSheet.create({
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
