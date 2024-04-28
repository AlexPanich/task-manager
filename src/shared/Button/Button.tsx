import { Text, StyleSheet, PressableProps } from 'react-native';
import { Color, Font, Radius } from '../tokens';
import { withBackgroundAnimation } from '../HOC/withBackgroundAnimation';

export function Button({ title = '' }: { title: string }) {
	return <Text style={styles.title}>{title}</Text>;
}

function mapProps({ title, ...props }: { title: string } & PressableProps) {
	return {
		pressableProps: props,
		componentProps: { title },
		animatedContainerStyle: styles.wrapper,
	};
}

export default withBackgroundAnimation(Button, mapProps);

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
