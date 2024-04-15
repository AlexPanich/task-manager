import ArrowRightIcon from '@/assets/icons/arrow-right';
import { Color, Font } from '@/shared/tokens';
import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require('../assets/images/index-back.png')}
				resizeMode="cover"
				style={styles.image}
			>
				<Text style={styles.title}>Мой трекер</Text>
				<Text style={styles.promo}>
					Управляй <Text style={styles.promoAccent}>Задачами</Text> и достигай результата ✌
				</Text>
				<Link href="/" style={styles.arrowLink}>
					<ArrowRightIcon />
				</Link>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.withe,
	},
	image: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		paddingHorizontal: 30,
		paddingBottom: 106,
	},
	title: {
		color: Color.primary,
		fontSize: Font.size.f18,
		fontFamily: Font.family.medium,
	},
	promo: {
		color: Color.primaryText,
		fontSize: Font.size.f35,
		fontFamily: Font.family.regular,
	},
	promoAccent: {
		color: Color.primary,
		fontSize: Font.size.f35,
		fontFamily: Font.family.semibold,
	},
	arrowLink: {
		position: 'absolute',
		bottom: 42,
		right: 30,
	},
});
