import Svg, { Path } from 'react-native-svg';
const CloseIcon = () => (
	<Svg width={16} height={16} fill="none">
		<Path
			stroke="#fff"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M1.167 1.333 14.5 14.667M14.5 1.333 1.167 14.667"
		/>
	</Svg>
);
export default CloseIcon;
