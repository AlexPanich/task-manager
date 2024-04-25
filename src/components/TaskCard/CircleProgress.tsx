import { Color, Font } from '@/shared/tokens';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircleProgress = ({ progress, style }: { progress: number; style?: ViewStyle }) => (
	<View style={[styles.wrapper, style]}>
		<Text style={styles.text}>{progress}%</Text>
		<Svg width={44} height={44} fill="none" style={{ transform: [{ rotate: '-90deg' }] }}>
			<Circle
				cx={22}
				cy={22}
				r={20}
				stroke={progress < 100 ? Color.secondary : Color.green}
				strokeWidth={4}
			/>
			<Circle
				cx={22}
				cy={22}
				r={20}
				stroke={progress < 100 ? Color.primary : Color.green}
				strokeWidth={4}
				strokeDasharray={2 * Math.PI * 20}
				strokeDashoffset={(2 * Math.PI * 20 * (100 - progress)) / 100}
			/>
		</Svg>
	</View>
);
export default CircleProgress;

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: Color.primaryText,
		fontSize: Font.size.f12,
		fontFamily: Font.family.medium,
		position: 'absolute',
		top: 13,
	},
});
