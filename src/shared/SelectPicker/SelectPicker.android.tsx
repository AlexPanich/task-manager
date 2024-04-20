import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Color, Font, Gap, Radius } from '../tokens';

export default function SelectPicker<T>({
	value,
	options,
	getValue,
	getLabel,
	getKey,
	onChange,
	label,
}: {
	value: T | undefined;
	options: T[];
	getValue: (item: T) => string;
	getLabel: (item: T) => string;
	getKey: (item: T) => string | number;
	onChange: (value: T | undefined) => void;
	label: string;
}) {
	const onChangeSelect = (itemValue: string) => {
		const option = options.find((option) => getValue(option) === itemValue);
		onChange(option);
	};

	return (
		<>
			<View style={styles.wrapper}>
				<Text style={styles.label}>{label}</Text>
				<View style={styles.field}>
					<Picker
						selectedValue={value && getValue(value)}
						onValueChange={onChangeSelect}
						style={styles.picker}
					>
						{options.map((option) => (
							<Picker.Item key={getKey(option)} label={getLabel(option)} value={getValue(option)} />
						))}
					</Picker>
				</View>
			</View>
		</>
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
		height: 60,
		borderWidth: 1,
		borderColor: Color.border,
		borderRadius: Radius.r16,
	},
	picker: {
		// paddingHorizontal: 20,
		backgroundColor: Color.transparent,
		// borderWidth: 1,
		// borderColor: Color.border,
		// borderRadius: Radius.r16,
		// opacity: 0,
		color: Color.primaryText,
		fontSize: Font.size.f16,
		fontFamily: Font.family.regular,
		flex: 1,
	},
});
