import FolderIcon from '@/assets/icons/folder';
import FolderActiveIcon from '@/assets/icons/folder-active';
import HomeIcon from '@/assets/icons/home';
import HomeActiveIcon from '@/assets/icons/home-active';
import PlusIcon from '@/assets/icons/plus';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import { Link, Tabs } from 'expo-router';
import { useRef, useState } from 'react';
import {
	StyleSheet,
	Dimensions,
	Pressable,
	Animated,
	GestureResponderEvent,
	Platform,
	Text,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import EditIcon from '@/assets/icons/edit';
import PlusOutlineIcon from '@/assets/icons/plus-outline';
import CloseIcon from '@/assets/icons/close';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export default function TabsLayout() {
	const insets = useSafeAreaInsets();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const animatedValue = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
	const ZERO = SCREEN_HEIGHT - 250 - insets.bottom;

	const fadeInAnimation = Animated.spring(animatedValue, {
		toValue: ZERO,
		useNativeDriver: true,
	}).start;

	const fadeOutAnimation = Animated.timing(animatedValue, {
		toValue: SCREEN_HEIGHT,
		useNativeDriver: true,
		duration: 250,
	}).start;

	const enter = () => {
		fadeInAnimation();
	};

	const close = () => {
		fadeOutAnimation(() => setIsOpen(false));
	};

	const scrollAnimation = Animated.event(
		[
			{
				nativeEvent: {
					pageY: animatedValue,
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
		if (
			event.nativeEvent.pageY - event.nativeEvent.locationY >
			SCREEN_HEIGHT - 250 - insets.bottom + 20
		) {
			close();
			return;
		}
		fadeInAnimation();
	};

	const start = (event: GestureResponderEvent) => {
		animatedValue.setOffset(ZERO - event.nativeEvent.pageY);
		animatedValue.setValue(event.nativeEvent.pageY);
		return true;
	};

	const toggleBottomSheet = () => {
		if (isOpen) {
			close();
		} else {
			setIsOpen(true);
		}
	};

	return (
		<>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: { height: insets.bottom + 82, borderTopWidth: 0, elevation: 0 },
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						tabBarIcon: ({ focused }) => (focused ? <HomeActiveIcon /> : <HomeIcon />),
						tabBarItemStyle: styles.itemLeft,
					}}
				/>
				<Tabs.Screen
					name="projects"
					options={{
						tabBarIcon: ({ focused }) => (focused ? <FolderActiveIcon /> : <FolderIcon />),
						tabBarItemStyle: styles.itemRight,
					}}
				/>
			</Tabs>
			{isOpen && (
				<>
					<Pressable style={styles.overlay} onPress={close}>
						<BlurView
							intensity={25}
							style={styles.blur}
							experimentalBlurMethod={Platform.select({ ios: 'none', android: 'dimezisBlurView' })}
						/>
					</Pressable>
					<Animated.View
						onLayout={enter}
						style={[styles.bottomSheet, { transform: [{ translateY: animatedValue }] }]}
						onStartShouldSetResponder={start}
						onMoveShouldSetResponder={start}
						onResponderMove={move}
						onResponderRelease={release}
					>
						<View style={styles.line} />
						<View style={styles.links}>
							<Link href="/add-task" asChild>
								<Pressable style={styles.link}>
									<EditIcon />
									<Text style={styles.linkText}>Добавить задачу</Text>
								</Pressable>
							</Link>
							<Link href="/add-project" asChild>
								<Pressable style={styles.link}>
									<PlusOutlineIcon />
									<Text style={styles.linkText}>Добавить проект</Text>
								</Pressable>
							</Link>
						</View>
					</Animated.View>
				</>
			)}
			<Pressable
				style={[
					styles.button,
					{ bottom: isOpen ? insets.bottom + 18 : insets.bottom + 16 },
					isOpen ? styles.close : styles.open,
				]}
				onPress={toggleBottomSheet}
			>
				{isOpen ? <CloseIcon /> : <PlusIcon />}
			</Pressable>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		aspectRatio: 1,
		backgroundColor: Color.primary,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	open: {
		width: 50,
		borderRadius: 25,
	},
	close: {
		width: 42,
		borderRadius: 21,
	},
	itemLeft: {
		marginLeft: SCREEN_WIDTH / 6,
	},
	itemRight: {
		marginRight: SCREEN_WIDTH / 6,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
	},
	blur: {
		flex: 1,
		backgroundColor: Color.overlay,
	},
	bottomSheet: {
		backgroundColor: Color.white,
		borderTopRightRadius: Radius.r30,
		borderTopLeftRadius: Radius.r30,
		height: SCREEN_HEIGHT * 1.5,
		position: 'absolute',
		top: 0,
		width: '100%',
		paddingHorizontal: 24,
		paddingTop: 10,
	},
	line: {
		width: 42,
		height: 2,
		backgroundColor: Color.border,
		alignSelf: 'center',
		marginBottom: 16,
	},
	links: {
		gap: Gap.g10,
	},
	link: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: Gap.g12,
		paddingHorizontal: 22,
		height: 36,
		borderColor: Color.border,
		borderWidth: 1,
		borderRadius: Radius.r12,
		alignItems: 'center',
	},
	linkText: {
		color: Color.primaryText,
		fontSize: Font.size.f16,
		fontFamily: Font.family.medium,
	},
});
