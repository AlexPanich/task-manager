import { Animated, Dimensions, GestureResponderEvent, StyleSheet } from 'react-native';
import { Gap } from '@/shared/tokens';
import DeleteIcon from '@/assets/icons/delte';
import React, { FC, useRef } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

type WrapperProps = {
	onRemove: () => void;
};

export default function withRemove<T>(Component: FC<T>, height: number) {
	const WrapperComponent: FC<T & WrapperProps> = ({ onRemove, ...props }: T & WrapperProps) => {
		const wrappedProps = {
			...(props as unknown as JSX.IntrinsicAttributes & T),
		};
		const animatedValue = useRef(new Animated.Value(0)).current;
		const animatedHeigth = useRef(new Animated.Value(height)).current;

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
					heightAnimation(onRemove);
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
				style={{
					height: animatedHeigth,
					opacity: animatedHeigth.interpolate({ inputRange: [0, 80], outputRange: [0, 1] }),
					marginBottom: animatedHeigth.interpolate({
						inputRange: [0, 80],
						outputRange: [-Gap.g19, 0],
					}),
				}}
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
					<Component {...wrappedProps} />
				</Animated.View>
			</Animated.View>
		);
	};

	return WrapperComponent;
}

const styles = StyleSheet.create({
	delete: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: '100%',
		width: SCREEN_WIDTH * 0.18,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
