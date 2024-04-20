import { Image, StyleSheet, View } from 'react-native';
import RoundButton from '../../shared/RoundButton/RoundButton';
import ArrowBackIcon from '@/assets/icons/arrow-back';
import ArrowForwardIcon from '@/assets/icons/arrow-forward';
import { Gap, Radius } from '../../shared/tokens';
import { Picture } from '@/store/projects.slice';

export default function PictureSelect({
	value,
	items,
	onSelect,
}: {
	value: Picture;
	items: Picture[];
	onSelect: (value: Picture) => void;
}) {
	const index = items.findIndex((item) => item.name === value.name);
	const prev = index > 0 ? index - 1 : items.length - 1;
	const next = index < items.length - 1 ? index + 1 : 0;

	console.log(prev, index, next);

	return (
		<View style={styles.wrapper}>
			<RoundButton onPress={() => onSelect(items[prev])}>
				<ArrowBackIcon />
			</RoundButton>
			<Image source={items[index].image} style={styles.image} />
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
