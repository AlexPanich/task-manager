import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../Input/Input';
import { Portal } from '@gorhom/portal';
import { Picker } from '@react-native-picker/picker';
import { Color, Font, Radius } from '../tokens';

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
	const [showSelect, setShowSelect] = useState(false);
	const [selectValue, setSelectValue] = useState<T | undefined>(value ?? options[0]);

	const onChangeSelect = (itemValue: string) => {
		const option = options.find((option) => getValue(option) === itemValue);
		setSelectValue(option);
	};

	const confirmSelect = () => {
		onChange(selectValue);
		toggleSelectPicker();
	};

	const toggleSelectPicker = () => {
		setShowSelect((state) => !state);
	};

	return (
		<>
			<Input
				label={label}
				editable={false}
				value={value && getLabel(value)}
				onPressIn={toggleSelectPicker}
			/>

			<Portal>
				{showSelect && (
					<>
						<Pressable style={styles.overlay} onPress={toggleSelectPicker}></Pressable>
						<View style={styles.wrapper}>
							<View style={styles.controls}>
								<TouchableOpacity style={styles.cancelBtn} onPress={toggleSelectPicker}>
									<Text style={styles.cancelBtnText}>Отмена</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.okBtn} onPress={confirmSelect}>
									<Text style={styles.okBtnText}>Готово</Text>
								</TouchableOpacity>
							</View>
							<Picker
								selectedValue={selectValue && getValue(selectValue)}
								onValueChange={onChangeSelect}
							>
								{options.map((option) => (
									<Picker.Item
										key={getKey(option)}
										label={getLabel(option)}
										value={getValue(option)}
									/>
								))}
							</Picker>
						</View>
					</>
				)}
			</Portal>
		</>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: Color.white,
		paddingTop: 16,
	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignSelf: 'stretch',
	},
	cancelBtn: {
		height: 36,
		borderColor: Color.border,
		borderRadius: Radius.r18,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	cancelBtnText: {
		color: Color.primaryText,
		fontSize: Font.size.f12,
		fontFamily: Font.family.medium,
	},
	okBtn: {
		height: 36,
		backgroundColor: Color.primary,
		borderColor: Color.primary,
		borderRadius: Radius.r18,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	okBtnText: {
		color: Color.white,
		fontSize: Font.size.f12,
		fontFamily: Font.family.semibold,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: Color.overlay,
	},
});
