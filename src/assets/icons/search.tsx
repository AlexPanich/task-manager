import Svg, { Circle, Path } from 'react-native-svg';
const SearchIcon = () => (
	<Svg width={21} height={21} fill="none">
		<Circle
			cx={9.767}
			cy={9.767}
			r={8.989}
			stroke="#848A94"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<Path
			stroke="#848A94"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M16.018 16.485 19.542 20"
		/>
	</Svg>
);
export default SearchIcon;
