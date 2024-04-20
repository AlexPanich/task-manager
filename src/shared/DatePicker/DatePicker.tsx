import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import { Color, Font, Radius } from '../tokens';
import { getLocales } from 'expo-localization';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Portal } from '@gorhom/portal';

const deviceLanguage = getLocales()[0].languageCode;

export default function DatePicker({
	value,
	onChange,
}: {
	value: Date;
	onChange: (date: Date) => void;
}) {
	const [showPicker, setShowPicker] = useState(false);
	const [date, setDate] = useState<Date>(value);

	const toggleDatePicker = () => {
		setShowPicker((state) => !state);
	};

	const selectDate = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
		if (type === 'set') {
			if (!selectedDate) return;
			setDate(selectedDate);

			if (Platform.OS === 'android') {
				toggleDatePicker();
				onChange(selectedDate);
			}
		} else {
			toggleDatePicker();
		}
	};

	const confirmIosDate = () => {
		onChange(date);
		toggleDatePicker();
	};

	useEffect(() => {
		if (Platform.OS === 'ios') {
			setDate(value);
		}
	}, [showPicker]);

	return (
		<>
			<Pressable onPress={toggleDatePicker}>
				<Input
					label="Дата"
					value={value.toLocaleDateString()}
					editable={false}
					onPressIn={Platform.OS === 'ios' ? toggleDatePicker : undefined}
				/>
			</Pressable>
			{showPicker && (
				<Portal>
					{Platform.OS === 'ios' && (
						<Pressable style={styles.overlay} onPress={toggleDatePicker}></Pressable>
					)}

					<View style={styles.datePickerWrapper}>
						{Platform.OS === 'ios' && (
							<View style={styles.datePickerIosControls}>
								<TouchableOpacity style={styles.cancelBtn} onPress={toggleDatePicker}>
									<Text style={styles.cancelBtnText}>Отмена</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.okBtn} onPress={confirmIosDate}>
									<Text style={styles.okBtnText}>Готово</Text>
								</TouchableOpacity>
							</View>
						)}
						<DateTimePicker
							locale={deviceLanguage ?? undefined}
							value={date}
							mode="date"
							display="spinner"
							onChange={selectDate}
							minimumDate={new Date()}
						/>
					</View>
				</Portal>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	datePickerWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		backgroundColor: Color.white,
		paddingTop: 16,
	},
	datePickerIosControls: {
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
