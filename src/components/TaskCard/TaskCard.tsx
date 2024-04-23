import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Task } from '@/store/tasks.slice';
import { Color, Font, Gap, Radius } from '@/shared/tokens';
import { Link } from 'expo-router';
import CircleProgress from './CircleProgress';

export default function TaskCard({
	project: { name: projectName },
	name,
	date,
	progress,
	id,
}: Task) {
	return (
		<Link href={`/(tabs)/task/${id}`} asChild>
			<Pressable>
				<View style={styles.wrapper}>
					<View style={styles.info}>
						<Text style={styles.projectName}>{projectName}</Text>
						<Text style={styles.name}>{name}</Text>
						<Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
					</View>
					<View>
						<CircleProgress progress={progress} />
					</View>
				</View>
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderColor: Color.border,
		borderWidth: 1,
		borderRadius: Radius.r16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	info: {
		gap: Gap.g2,
	},
	projectName: {
		color: Color.gray,
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
	name: {
		color: Color.primaryText,
		fontSize: Font.size.f14,
		fontFamily: Font.family.medium,
	},
	date: {
		color: Color.gray,
		fontSize: Font.size.f12,
		fontFamily: Font.family.regular,
	},
});
