import React from "react";
import { Component } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";

import { Status } from "../ContreeClientDefs";
import {
	panelBackgroundColor,
	regularMargin,
	panelBorderRadius,
	buttonColor,
	buttonColorText,
	borderColor,
	handBackroundColor,
	cardTextColor,
} from "../styles/commonStyles";

interface PlayerControllerProps {
	connectButton: ConnectButtonProps;
	playerActionController: PlayerActionControllerProps;
	status: Status;
}

interface ConnectButtonProps {
	didTapConnect: () => void;
}
class ConnectButton extends Component<ConnectButtonProps> {
	render() {
		const { didTapConnect } = this.props;
		return (
			<PlayerActionButton onPress={didTapConnect} title={"Connect"} />
		);
	}
}

interface HandControllerProps extends HandProps, PlayerActionControllerProps {
}
class HandController extends Component<HandControllerProps> {
	render() {
		const { didTapDisconnect } = this.props;
		return (
			<View style={styles.handControllerContainer}>
				<Hand />
				<PlayerActionController didTapDisconnect={didTapDisconnect} />
			</View>
		);
	}
}

interface HandProps {
}
class Hand extends Component<HandProps> {
	render() {
		return (
			<View style={styles.handContainer}>
				<View style={styles.handTitleContainer}>
					<Text style={styles.handTitle}>Cards in hand</Text>
				</View>
				<View style={styles.cardsContainer} >
					<Text style={styles.cardContainer}>Pique</Text>
				</View>
			</View>
		);
	}
}

interface PlayerActionControllerProps {
	didTapDisconnect: () => void;
}
class PlayerActionController extends Component<PlayerActionControllerProps> {
	render() {
		const { didTapDisconnect } = this.props;
		return (
			<View style={styles.playerActionContainer}>
				<PlayerActionButton onPress={didTapDisconnect} title={"Disconnect"} />
			</View>
		);
	}
}

interface PlayerActionButtonProps {
	onPress: () => void;
	title: string;
}
class PlayerActionButton extends Component<PlayerActionButtonProps> {
	render() {
		const { onPress, title } = this.props;
		return (
			<TouchableOpacity style={styles.playerActionButton} onPress={onPress}>
				<Text style={styles.playerActionButtonText}>{title}</Text>
			</TouchableOpacity>
		);
	}
}

export class PlayerController extends Component<PlayerControllerProps> {
	render() {
		const { status } = this.props;
		const { didTapConnect } = this.props.connectButton;
		const { didTapDisconnect } = this.props.playerActionController;
		return (
			<View style={styles.container}>
				{
					status === Status.Disconnected
						? <ConnectButton didTapConnect={didTapConnect} />
						: status === Status.Loading
							? <ActivityIndicator size="small" />
							: <HandController didTapDisconnect={didTapDisconnect} />
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		margin: regularMargin,
		backgroundColor: panelBackgroundColor,
		borderRadius: panelBorderRadius,
	},
	handControllerContainer: {
		flex: 1,
		justifyContent: "space-between",
		borderRadius: panelBorderRadius,
	},
	handContainer: {
		flex: 1,
		backgroundColor: handBackroundColor,
		borderRadius: panelBorderRadius,
	},
	handTitleContainer: {
		backgroundColor: handBackroundColor,
		marginBottom: regularMargin,
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
		borderRadius: panelBorderRadius,
	},
	handTitle: {
		color: buttonColorText,
		textAlign: "center",
	},
	cardsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: handBackroundColor,
		borderRadius: panelBorderRadius,
	},
	cardContainer: {
		padding: regularMargin,
		margin: regularMargin / 2,
		backgroundColor: cardTextColor,
		borderRadius: panelBorderRadius * 2,
		textAlign: "center",
	},
	playerActionContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: panelBackgroundColor,
		borderRadius: panelBorderRadius,
	},
	playerActionButton: {
		borderRadius: panelBorderRadius * 2,
		backgroundColor: buttonColor,
		padding: regularMargin,
		margin: regularMargin / 2,
	},
	playerActionButtonText: {
		color: buttonColorText,
		textAlign: "center",
	},
});
