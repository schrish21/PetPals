import { StyleSheet, Dimensions } from "react-native";
import { OpenSans } from "./fonts/opensans.ttf";

const PRIMARY_COLOR = 'tomato';
const SECONDARY_COLOR = "#2245b5";
const DARK_GREY = "#242424";

const FONT = OpenSans;

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({


	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: 'white',
		borderRadius: 8,
		alignItems: "center",
		paddingTop: 10,
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	bioCardItem: {
		color: 'gray',
		textAlign: "center",
		marginBottom: 15
	},
	status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	statusText: {
		color: 'gray',
		fontSize: 12
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: 'white',
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GREY,
		shadowOffset: { height: 10, width: 0 }
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
	},
	top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: { paddingBottom: 10, fontSize: 22, color: DARK_GREY },
	icon: {
		fontFamily: FONT,
		fontSize: 20,
		color: DARK_GREY,
		paddingRight: 10
	},

	// CONTAINER - HOME
	containerHome: { marginHorizontal: 10 },

	// CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},

	// CONTAINER - MESSAGES
	containerMessages: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},
	
});
