import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketIo from "socket.io-client";

import {
	panelBackgroundColor,
	secondaryTextColor,
	regularMargin,
	borderColor,
	panelBorderRadius,
	mainBackroundColor,
} from "./styles/commonStyles";

import { Status } from "./ContreeClientDefs";

import { OtherPlayers } from "./components/OtherPlayers";
import { Table } from "./components/Table";
import { PlayerController } from "./components/PlayerController";
import { BetController } from "./components/BetController";

interface ContreeClientProps {
}

interface ContreeClientState {
	status: Status;
	currentState: string;
	playerGameState: string;
}

export class ContreeClient extends Component<ContreeClientProps, ContreeClientState> {
	state = { status: Status.Disconnected, currentState: "Welcome", playerGameState: "" };

	private URL = "http://10.0.1.80:28028";
	private socket?: SocketIOClient.Socket = undefined;

	private connectWebSocket = () => {
		this.socket = SocketIo(this.URL);

		this.socket.on("connect", () => {
			this.setState({ status: Status.Connected, currentState: "Connection opened" });
		});
		this.socket.on("GameState", (message: string) => {
			this.setState({ playerGameState: message, currentState: "Game state received" });
		});
		this.socket.on("error", (ev: Event) => {
			this.setState({ status: Status.Disconnected, currentState: "Socket error" });
		});
		this.socket.on("disconnect", () => {
			this.setState({ status: Status.Disconnected, currentState: "Connection closed" });
		});

		// Automatically disconnect after trying for a while
		setTimeout(() => {
			if (this.state.status === Status.Loading) {
				this.didTapDisconnect();
			}
		}, 2000);
	}

	didTapConnect = () => {
		this.setState({ status: Status.Loading, currentState: "Connecting..." });
		this.connectWebSocket();
	}

	didTapDisconnect = () => {
		this.setState({ status: Status.Disconnected, currentState: "Disconnecting..." });
		if (this.socket == null) {
			return;
		}
		this.socket.close();
	}

	render() {
		const { status, currentState, playerGameState } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.topContainer}>
					<View style={styles.stateContainer}>
						<Text style={styles.state}>{currentState}</Text>
					</View>
					<View style={styles.topRowContainer}>
						<OtherPlayers />
						<BetController />
					</View>
				</View>
				<Table />
				<PlayerController
					status={status}
					connectButton={{ didTapConnect: this.didTapConnect }}
					playerActionController={{ didTapDisconnect: this.didTapDisconnect }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: regularMargin / 2,
		justifyContent: "space-between",
		backgroundColor: mainBackroundColor,
	},
	topContainer: {
		flex: 1,
		margin: regularMargin,
		paddingBottom: regularMargin,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: panelBackgroundColor,
		borderRadius: panelBorderRadius,
	},
	topRowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",

		borderWidth: 1,
		borderColor: "blue",
	},
	stateContainer: {
		alignSelf: "stretch",
		marginBottom: regularMargin,
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
	},
	state: {
		textAlign: "center",
		color: secondaryTextColor,
	},
});
