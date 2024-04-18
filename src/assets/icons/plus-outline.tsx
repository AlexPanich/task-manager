import Svg, { Path } from 'react-native-svg';
const PlusOutlineIcon = () => (
	<Svg width={24} height={16} fill="none">
		<Path
			stroke="#002055"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M12 5.903v4.66M15.667 8.233H8.333"
		/>
		<Path
			stroke="#002055"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M16.686 1.878H7.314C4.048 1.878 2 3.348 2 5.43v5.617C2 13.13 4.038 14.6 7.314 14.6h9.372C19.962 14.6 22 13.13 22 11.047V5.43c0-2.082-2.038-3.553-5.314-3.553Z"
			clipRule="evenodd"
		/>
	</Svg>
);
export default PlusOutlineIcon;
