import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ProjectSearch } from '@/store/projects.slice';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import ProgressBar from '@/shared/ProgressBar/ProgressBar';

export default function ProjectCard({
	id,
	name,
	picture,
	direction,
	total,
	completed,
}: ProjectSearch) {
	const projectCompleted = completed === total;

	return (
		<Link href={`/(tabs)/project/${id}`} asChild>
			<Pressable>
				<View key={id} style={styles.wrapper}>
					<View style={styles.header}>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.direction}>{direction}</Text>
					</View>
					<View style={styles.body}>
						<Image source={picture.image} style={styles.image} />
						<View style={styles.progressBarContainer}>
							<View style={styles.progressBarHeader}>
								<Text
									style={[
										styles.progressBarLabel,
										{ color: projectCompleted ? Color.lightGreen : Color.lightBlue },
									]}
								>
									Прогресс
								</Text>
								<Text
									style={[
										styles.taskCount,
										{ color: projectCompleted ? Color.green : Color.primary },
									]}
								>
									{completed}/{total}
								</Text>
							</View>
							<View style={styles.progressBarWrapper}>
								<ProgressBar total={total} completed={completed} />
							</View>
						</View>
					</View>
				</View>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 20,
		paddingVertical: 25,
		borderColor: Color.border,
		borderWidth: 1,
		borderRadius: Radius.r16,
		height: 150,
		width: 260,
		justifyContent: 'space-between',
	},
	header: {
		gap: Gap.g8,
	},
	name: {
		color: Color.primaryText,
		fontSize: Font.size.f18,
		fontFamily: Font.family.semibold,
	},
	direction: {
		color: Color.gray,
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
	body: {
		flexDirection: 'row',
		gap: Gap.g12,
		alignItems: 'flex-end',
	},
	image: {
		height: 30,
		width: 30,
		borderRadius: Radius.r15,
		resizeMode: 'cover',
	},
	progressBarContainer: {
		flex: 1,
	},
	progressBarHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	progressBarLabel: {
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
	taskCount: {
		color: Color.primary,
		fontSize: Font.size.f12,
		fontFamily: Font.family.medium,
	},
	progressBarWrapper: {
		width: 150,
	},
});
