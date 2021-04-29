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
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerCardItem: {
		backgroundColor: 'white',
		borderRadius: 8,
		borderColor: PRIMARY_COLOR,
		borderWidth: 3,
		alignItems: "center",
		paddingTop: 10,
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 },
	},
	bioCardItem: {
		color: 'gray',
		textAlign: "center",
		marginBottom: 15
	},
	Contact: {
		color: 'gray',
		textAlign: "center",
	},
	status: {
		paddingTop: 10,
		paddingBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		fontSize: 24
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
		width: 70,
		height: 70,
		borderRadius: 30,
		backgroundColor: '#f7d8bc',
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GREY,
		shadowOffset: { height: 10, width: 0 }
	},
	miniButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#f7d8bc',
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
		height: DIMENSION_HEIGHT,
	},
	top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: { 
		paddingBottom: 10, 
		fontSize: 22, 
		color: DARK_GREY },
	icon: {
		fontFamily: FONT,
		fontSize: 20,
		color: DARK_GREY,
		paddingRight: 10
	},

	// COMPONENT - MESSAGE
	containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		marginHorizontal: 10,
		width: DIMENSION_WIDTH - 100
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: 'gray',
		fontSize: 12,
		paddingTop: 5
	},

	// CONTAINER - HOME
	containerHome: { marginHorizontal: 10 },

	// CONTAINER - MATCHES
	bgMatches: {
		flex: 1,
		backgroundColor:'white',
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT,
		paddingBottom: 90,
		marginBottom: 10
	},
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 10,
		marginBottom: 10
	},
	// CONTAINER - MESSAGES
	containerMessages: {
		justifyContent: "space-between",
		flex: 1,
		marginTop: -20,
		marginBottom: 110
	},
	
	// CONTAINER - PROFILE
	containerProfile: {
		marginHorizontal: 0,

	},
	containerProfileInfo: {
		marginHorizontal: 0,
		backgroundColor: '#ffd3b2' 
	},
	photo: {
		width: DIMENSION_WIDTH,
		height: 410
	},
	photoInfo: {
		width: DIMENSION_WIDTH-150,
		height: DIMENSION_WIDTH-150,
		borderRadius: 150,
		marginTop:50,
		marginBottom: 75,
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: { 
		fontFamily: FONT, 
		fontSize: 20, 
		marginTop: 5,
		color: 'white' 
	},
	iconButtonX: { 
		fontFamily: FONT, 
		fontSize: 20, 
		color: 'white',
		marginTop: 5,
		marginLeft:2 
	},
	iconButtonSettings:{
		paddingTop:8,
		marginLeft:-1
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
		borderWidth: 2,
		borderColor: '#de8303',
		backgroundColor: '#ff8c00',
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 8,
		marginRight: 10
	},
	circledButtonX: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#e83f3f',
		backgroundColor: '#e83f3f',
		paddingHorizontal: 12,
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#73809e',
		backgroundColor: '#cfe2ff',
		paddingHorizontal: 20
	},
	roundedButton2: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#423d39',
		backgroundColor: 'gray',
		paddingHorizontal: 20
	},
	roundedButton3: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#423d39',
		backgroundColor: 'tomato',
		paddingHorizontal: 20
	},
	containerProfileItem: {
		backgroundColor: '#ffe5cf',
		paddingBottom: 25,
		paddingHorizontal: 45,
		margin: 20,
		borderRadius: 8,
		marginTop: -75,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	containerProfileItemInfo: {
		backgroundColor: 'white',
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
	iconProfile2: {
		fontFamily: FONT,
		fontSize: 12,
		color: DARK_GREY,
		paddingHorizontal: 10,
		marginLeft: 3
	},
	infoContent: {
		color: 'gray',
		fontSize: 13,
		marginLeft: 20
	},

	// MENU
	tabButton: {
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	tabButtonText: {
		textTransform: "uppercase"
	},
	iconMenu: {
		fontFamily: FONT,
		height: 20,
		paddingBottom: 0
	},
	// CONTAINER - Settings
    settingsContainer: {
    	flex: 1,
    	flexDirection: 'column',
		marginVertical: 10,
		marginHorizontal: 10
    },
    iconButtonLogOut:{
		marginTop: 9
    },
    IconRight: {
    	width: 40,
    	height: 70,
    	marginLeft: 320,
    	paddingHorizontal:10
    },
	IconSettings: {
		flex: 1,
		flexDirection: 'row-reverse',
	},
    settingsGeneral:{
        fontFamily: FONT,
        fontSize: 25,
		marginVertical: 10,
    },
    settingsButton: {
        justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#e83f3f',
		paddingHorizontal: 20
    	},

});
