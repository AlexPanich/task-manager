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
import { ReactNode, useState } from 'react';

export default function Input({
	style,
	label,
	icon,
	...props
}: TextInputProps & { label?: string; icon?: ReactNode }) {
	const [focused, setFocused] = useState<boolean>(false);

	const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true);
		props.onFocus && props.onFocus!(event);
	};
	const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false);
		props.onBlur && props.onBlur(event);
	};

	const inputStyle = [styles.input, { borderColor: focused ? Color.primary : Color.border }, style];
	if (icon) {
		inputStyle.push(styles.withIcon);
	}

	return (
		<View style={styles.wrapper}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.field}>
				<TextInput
					style={inputStyle}
					placeholderTextColor={Color.secondaryText}
					{...props}
					onFocus={handleFocus}
					onBlur={handleBlur}
					autoCapitalize="none"
				/>
				{icon && <View style={styles.icon}>{icon}</View>}
			</View>
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
	field: {
		flexDirection: 'row',
		alignItems: 'center',
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
		flex: 1,
	},
	withIcon: {
		paddingLeft: 50,
	},
	icon: {
		position: 'absolute',
		left: 19,
	},
});
