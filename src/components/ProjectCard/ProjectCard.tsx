import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ProjectSearch } from '@/store/projects.slice';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import ProgressBar from '@/shared/ProgressBar/ProgressBar';
import withRemove from '@/shared/HOC/withRemove';

const CARD_HEIGHT = 93;

export function ProjectCard({ id, name, picture, direction, total, completed }: ProjectSearch) {
	const projectCompleted = completed === total;

	return (
		<Link href={`/(tabs)/project/${id}`} asChild>
			<Pressable>
				<View key={id} style={styles.wrapper}>
					<View style={styles.header}>
						<Text style={styles.name}>{name}</Text>
						<Text
							style={[styles.taskCount, { color: projectCompleted ? Color.green : Color.primary }]}
						>
							{completed}/{total}
						</Text>
					</View>
					<Text style={styles.direction}>{direction}</Text>
					<View style={styles.body}>
						<Image source={picture.image} style={styles.image} />
						<View style={styles.progressBarWrapper}>
							<ProgressBar total={total} completed={completed} />
						</View>
					</View>
				</View>
			</Pressable>
		</Link>
	);
}

export default withRemove(ProjectCard, CARD_HEIGHT);

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 20,
		borderColor: Color.border,
		borderWidth: 1,
		borderRadius: Radius.r16,
		height: CARD_HEIGHT,
		backgroundColor: Color.white,
		justifyContent: 'center',
		gap: Gap.g2,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	name: {
		color: Color.primaryText,
		fontSize: Font.size.f14,
		fontFamily: Font.family.medium,
	},
	taskCount: {
		color: Color.primary,
		fontSize: Font.size.f12,
		fontFamily: Font.family.medium,
	},
	direction: {
		color: Color.gray,
		fontSize: Font.size.f13,
		fontFamily: Font.family.regular,
		marginBottom: 5,
	},
	body: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		height: 24,
		width: 24,
		borderRadius: Radius.r12,
		resizeMode: 'cover',
	},
	progressBarWrapper: {
		flex: 1,
		marginRight: 32,
		marginLeft: 22,
	},
});
