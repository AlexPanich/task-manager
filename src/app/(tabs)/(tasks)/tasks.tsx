import ArrowBackWhiteIcom from '@/assets/icons/arrow-back-white';
import ArrowForwardWhiteIcon from '@/assets/icons/arrow-forward-white';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import { RootState, useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { formatDate, getTasksByDate } from '@/store/tasks.slice';
import TaskCard from '@/components/TaskCard/TaskCard';

function formatDateMonthSelector(date: Date) {
	let month: number | string = date.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	const year = date.getFullYear();
	return `${month}.${year}`;
}

export default function TasksPage() {
	const [date, setDate] = useState(new Date());
	const countDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const currentDay = date.getDate();

	const { tasks } = useSelector((state: RootState) => state.tasks);
	const dispatch = useAppDispatch();
	const isFoucused = useIsFocused();

	useEffect(() => {
		if (!isFoucused) {
			return;
		}

		dispatch(getTasksByDate(formatDate(date)));
	}, [isFoucused, date]);

	const plusMonth = () => {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth() + 1);
		setDate(newDate);
	};

	const minusMonth = () => {
		const newDate = new Date(date);
		newDate.setMonth(date.getMonth() - 1);
		setDate(newDate);
	};

	const setDay = (day: number) => {
		const newDate = new Date(date);
		newDate.setDate(day);
		setDate(newDate);
	};

	return (
		<View style={styles.container}>
			<View style={styles.monthSelector}>
				<Pressable style={styles.monthSelectorBtn} onPress={minusMonth}>
					<ArrowBackWhiteIcom />
				</Pressable>
				<View style={styles.monthSelectorBody}>
					<Text style={styles.monthSelectorDate}>{formatDateMonthSelector(date)}</Text>
					<Text style={styles.monthSelectorText}>2 задачи на сегодя</Text>
				</View>
				<Pressable style={styles.monthSelectorBtn} onPress={plusMonth}>
					<ArrowForwardWhiteIcon />
				</Pressable>
			</View>
			<View style={styles.dayListWrapper}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.dayList}
				>
					{Array(countDays)
						.fill(undefined)
						.map(
							(_, index) => (
								index++,
								(
									<Pressable
										onPress={() => setDay(index)}
										key={index}
										style={[
											styles.dayCard,
											{
												backgroundColor: index === currentDay ? Color.primary : Color.white,
												borderColor: index === currentDay ? Color.primary : Color.border,
											},
										]}
									>
										<Text
											style={[
												styles.dayCardText,
												{ color: index === currentDay ? Color.white : Color.gray },
											]}
										>
											{index < 10 ? `0${index}` : index}
										</Text>
									</Pressable>
								)
							),
						)}
				</ScrollView>
			</View>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.taskList}>
				{tasks.map((task) => (
					<TaskCard key={task.id} {...task} />
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
		paddingTop: 30,
	},
	monthSelector: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		marginBottom: 40,
	},
	monthSelectorBtn: {
		backgroundColor: Color.primary,
		width: 42,
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.r21,
	},
	monthSelectorBody: {
		alignItems: 'center',
		gap: Gap.g2,
	},
	monthSelectorDate: {
		color: Color.primaryText,
		fontSize: Font.size.f25,
		fontFamily: Font.family.semibold,
	},
	monthSelectorText: {
		color: Color.gray,
		fontSize: Font.size.f14,
		fontFamily: Font.family.regular,
	},
	dayListWrapper: {
		marginBottom: 40,
	},
	dayList: {
		paddingHorizontal: 24,
		gap: Gap.g16,
	},
	dayCard: {
		width: 64,
		height: 97,
		borderRadius: Radius.r16,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dayCardText: {
		fontSize: Font.size.f25,
		fontFamily: Font.family.medium,
	},
	taskList: {
		gap: Gap.g19,
		paddingHorizontal: 24,
	},
});
