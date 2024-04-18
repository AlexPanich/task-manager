import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import RoundButton from '../RoundButton/RoundButton';
import ArrowBackIcon from '@/assets/icons/arrow-back';
import ArrowForwardIcon from '@/assets/icons/arrow-forward';
import { Gap, Radius } from '../tokens';

export default function ImageSelect<T extends ImageSourcePropType>({
	value,
	items,
	onSelect,
}: {
	value: T;
	items: T[];
	onSelect: (value: T) => void;
}) {
	const index = items.findIndex((item) => item === value);
	const prev = index > 0 ? index - 1 : items.length - 1;
	const next = index < items.length - 1 ? index + 1 : 0;

	return (
		<View style={styles.wrapper}>
			<RoundButton onPress={() => onSelect(items[prev])}>
				<ArrowBackIcon />
			</RoundButton>
			<Image source={items[index]} style={styles.image} />
			<RoundButton onPress={() => onSelect(items[next])}>
				<ArrowForwardIcon />
			</RoundButton>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: Gap.g26,
	},
	image: {
		width: 100,
		aspectRatio: 1,
		resizeMode: 'cover',
		borderRadius: Radius.r50,
	},
});
