import { StyleSheet, Dimensions } from "react-native";
import { OpenSans } from "./fonts/opensans.ttf";

const PRIMARY_COLOR = 'tomato';
const SECONDARY_COLOR = "#2245b5";
const DARK_GREY = "#242424";

const LIKE_ACTIONS = "#f52a96"
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
    like:{
        fontSize: 20,
        color: LIKE_ACTIONS
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
	
	// CONTAINER - PROFILE
	containerProfile: { marginHorizontal: 0 },
	photo: {
		width: DIMENSION_WIDTH,
		height: 450
	},
	topIconRight: {
		fontFamily: FONT,
		fontSize: 20,
		color: 'white',
		marginTop: -20,
		marginLeft: 320,
		paddingLeft: 20,
		paddingTop: 8
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: { 
		fontFamily: FONT, 
		fontSize: 20, 
		color: 'white' 
	},	
	textButton: {
		fontFamily: FONT,
		fontSize: 15,
		color: 'white',
		paddingLeft: 5
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: 'gray',
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 20
	},
	containerProfileItem: {
		backgroundColor: 'white',
		paddingHorizontal: 10,
		paddingBottom: 25,
		paddingHorizontal: 45,
		margin: 20,
		borderRadius: 8,
		marginTop: -55,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	name: {
		paddingTop: 25,
		paddingBottom: 5,
		color: DARK_GREY,
		fontSize: 25,
		textAlign: "center"
	},
	descriptionProfileItem: {
		color: 'gray',
		textAlign: "center",
		paddingBottom: 20,
		fontSize: 13
	},
	info: {
		paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center"
	},
	iconProfile: {
		fontFamily: FONT,
		fontSize: 12,
		color: DARK_GREY,
		paddingHorizontal: 10
	},
	infoContent: {
		color: 'gray',
		fontSize: 13,
		marginLeft: 20
	},
});
