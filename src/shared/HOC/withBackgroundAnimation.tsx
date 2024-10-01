import { FC, useRef } from 'react';
import {
	Pressable,
	PressableProps,
	Animated,
	GestureResponderEvent,
	ViewStyle,
} from 'react-native';
import { Color } from '../tokens';

export function withBackgroundAnimation<P extends object>(
	Component: FC<P>,
	mapProps: (props: P & PressableProps) => {
		componentProps: P;
		pressableProps: PressableProps;
		animatedContainerStyle: ViewStyle;
	},
) {
	return function (props: P & PressableProps) {
		const { componentProps, pressableProps, animatedContainerStyle } = mapProps(props);
		const animagedValue = useRef(new Animated.Value(100)).current;
		const color = animagedValue.interpolate({
			inputRange: [0, 100],
			outputRange: [Color.primaryHover, Color.primary],
		});

		const hoverIn = (event: GestureResponderEvent) => {
			Animated.timing(animagedValue, {
				toValue: 0,
				useNativeDriver: true,
				duration: 100,
			}).start();
			props.onPressIn && props.onPressIn(event);
		};

		const hoverOut = (event: GestureResponderEvent) => {
			Animated.timing(animagedValue, {
				toValue: 100,
				useNativeDriver: true,
				duration: 100,
			}).start();
			props.onPressOut && props.onPressOut(event);
		};
		return (
			<Pressable {...pressableProps} onPressIn={hoverIn} onPressOut={hoverOut}>
				<Animated.View style={[animatedContainerStyle, { backgroundColor: color }]}>
					<Component {...componentProps} />
				</Animated.View>
			</Pressable>
		);
	};
}
