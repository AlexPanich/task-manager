import {
	Animated,
	Dimensions,
	GestureResponderEvent,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React, { useRef } from 'react';
import { Task } from '@/store/tasks.slice';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import { Link } from 'expo-router';
import CircleProgress from './CircleProgress';
import DeleteIcon from '@/assets/icons/delte';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
export default function TaskCard({
	task: {
		project: { name: projectName },
		name,
		date,
		progress,
		id,
	},
	onDelete,
}: {
	task: Task;
	onDelete: (id: number) => void;
}) {
	const animatedValue = useRef(new Animated.Value(0)).current;
	const animatedHeigth = useRef(new Animated.Value(80)).current;

	const backAnimation = Animated.spring(animatedValue, {
		toValue: 0,
		useNativeDriver: true,
	}).start;

	const deleteAnimation = Animated.timing(animatedValue, {
		toValue: -SCREEN_WIDTH,
		useNativeDriver: true,
		duration: 250,
	}).start;

	const heightAnimation = Animated.timing(animatedHeigth, {
		toValue: 0,
		useNativeDriver: false,
		duration: 250,
	}).start;

	const start = (event: GestureResponderEvent) => {
		animatedValue.setOffset(-event.nativeEvent.pageX);
		animatedValue.setValue(event.nativeEvent.pageX);
		return true;
	};

	const scrollAnimation = Animated.event(
		[
			{
				nativeEvent: {
					pageX: animatedValue,
				},
			},
		],
		{
			useNativeDriver: false,
		},
	);

	const move = (event: GestureResponderEvent) => {
		scrollAnimation(event);
	};

	const release = (event: GestureResponderEvent) => {
		animatedValue.flattenOffset();
		const { pageX, locationX } = event.nativeEvent;
		if (pageX + SCREEN_WIDTH - locationX < SCREEN_WIDTH * 0.66) {
			deleteAnimation(() => {
				heightAnimation(() => onDelete(id));
			});
			return;
		}
		backAnimation();
	};

	const opacity = animatedValue.interpolate({
		inputRange: [-SCREEN_WIDTH * 0.33, 0],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	});

	return (
		<Animated.View
			style={[
				styles.container,
				{
					height: animatedHeigth,
					opacity: animatedHeigth.interpolate({ inputRange: [0, 80], outputRange: [0, 1] }),
					marginBottom: animatedHeigth.interpolate({
						inputRange: [0, 80],
						outputRange: [-Gap.g19, 0],
					}),
				},
			]}
		>
			<Animated.View style={[styles.delete, { opacity }]}>
				<DeleteIcon />
			</Animated.View>
			<Animated.View
				style={{ transform: [{ translateX: animatedValue }] }}
				onStartShouldSetResponder={start}
				onMoveShouldSetResponder={start}
				onResponderMove={move}
				onResponderRelease={release}
				onResponderTerminationRequest={() => false}
			>
				<Link href={`/(tabs)/task/${id}`} asChild>
					<Pressable>
						<View style={styles.wrapper}>
							<View style={styles.info}>
								<Text style={styles.projectName}>{projectName}</Text>
								<Text style={styles.name}>{name}</Text>
								<Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
							</View>
							<View>
								<CircleProgress progress={progress} />
							</View>
						</View>
					</Pressable>
				</Link>
			</Animated.View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {},
	delete: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: '100%',
		width: '25%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapper: {
		paddingHorizontal: 20,
		borderColor: Color.border,
		borderWidth: 1,
		borderRadius: Radius.r16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Color.white,
		height: 80,
	},
	info: {
		gap: Gap.g2,
	},
	projectName: {
		color: Color.gray,
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
	name: {
		color: Color.primaryText,
		fontSize: Font.size.f14,
		fontFamily: Font.family.medium,
	},
	date: {
		color: Color.gray,
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
});
