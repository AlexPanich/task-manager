import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Color } from '../tokens';

export default function RoundButton({ children, ...props }: PressableProps) {
	return (
		<Pressable style={styles.wrapper} {...props}>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		width: 42,
		aspectRatio: 1,
		borderRadius: 21,
		borderColor: Color.border,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
