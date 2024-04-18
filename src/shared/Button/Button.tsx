import {
	Pressable,
	PressableProps,
	Text,
	StyleSheet,
	Animated,
	GestureResponderEvent,
} from 'react-native';
import { Color, Font, Radius } from '../tokens';
import { useRef } from 'react';

export default function Button({ title, ...props }: PressableProps & { title: string }) {
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
		<Pressable {...props} onPressIn={hoverIn} onPressOut={hoverOut}>
			<Animated.View style={{ ...styles.wrapper, backgroundColor: color }}>
				<Text style={styles.title}>{title}</Text>
			</Animated.View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Radius.r16,
		height: 48,
		shadowColor: Color.primary,
		shadowOffset: {
			width: 0,
			height: 14,
		},
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 24,
	},
	title: {
		color: Color.white,
		fontSize: Font.size.f16,
		fontFamily: Font.family.regular,
	},
});
