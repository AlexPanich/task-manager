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
		const translateX = useRef(new Animated.Value(0)).current;
		const heightValue = useRef(new Animated.Value(height)).current;

		const backAnimation = Animated.spring(translateX, {
			toValue: 0,
			useNativeDriver: true,
		}).start;

		const deleteAnimation = Animated.timing(translateX, {
			toValue: -SCREEN_WIDTH,
			useNativeDriver: true,
			duration: 250,
		}).start;

		const heightAnimation = Animated.timing(heightValue, {
			toValue: 0,
			useNativeDriver: false,
			duration: 250,
		}).start;

		const start = (event: GestureResponderEvent) => {
			translateX.setOffset(-event.nativeEvent.pageX);
			translateX.setValue(event.nativeEvent.pageX);
			return true;
		};

		const scrollAnimation = Animated.event(
			[
				{
					nativeEvent: {
						pageX: translateX,
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
			translateX.flattenOffset();
			const { pageX, locationX } = event.nativeEvent;
			if (pageX + SCREEN_WIDTH - locationX < SCREEN_WIDTH * 0.66) {
				deleteAnimation(() => {
					heightAnimation(onRemove);
				});
				return;
			}
			backAnimation();
		};

		const opacity = translateX.interpolate({
			inputRange: [-SCREEN_WIDTH * 0.33, 0],
			outputRange: [1, 0],
			extrapolate: 'clamp',
		});
		return (
			<Animated.View
				style={{
					height: heightValue,
					opacity: heightValue.interpolate({ inputRange: [0, 80], outputRange: [0, 1] }),
					marginBottom: heightValue.interpolate({
						inputRange: [0, 80],
						outputRange: [-Gap.g19, 0],
					}),
				}}
			>
				<Animated.View style={[styles.delete, { opacity }]}>
					<DeleteIcon />
				</Animated.View>
				<Animated.View
					style={{ transform: [{ translateX }] }}
					onStartShouldSetResponder={start}
					onMoveShouldSetResponder={start}
					onResponderMove={move}
					onResponderRelease={release}
					onResponderTerminationRequest={() => false}
				>
					<Component {...(props as unknown as JSX.IntrinsicAttributes & T)} />
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
