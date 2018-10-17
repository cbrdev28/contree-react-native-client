/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SocketIo from "socket.io-client";

interface Props { }
interface AppState {
	status: Status;
}

enum Status {
	Disconnected,
	Connected,
	Connecting,
}

export default class App extends Component<Props, AppState> {
	state = { status: Status.Disconnected };

	private URL = "http://10.0.1.80:28028";
	private socket?: SocketIOClient.Socket = undefined;

	private connectWebSocket = () => {
		this.socket = SocketIo(this.URL);

		this.socket.on("connect", () => {
			console.log("Connection opened");
			this.setState({ status: Status.Connected });
		});
		this.socket.on("error", (ev: Event) => {
			this.setState({ status: Status.Disconnected });
			console.error("Socket error:", ev);
		});
		this.socket.on("disconnect", () => {
			this.setState({ status: Status.Disconnected });
			console.warn("Connection closed");
		});
	}

	didTapConnect = () => {
		this.setState({ status: Status.Connecting });
		this.connectWebSocket();
	}

	didTapDisconnect = () => {
		this.setState({ status: Status.Disconnected });
		if (this.socket == null) {
			return;
		}
		this.socket.close();
	}

	render() {
		const { status } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native! CBR</Text>
				<Text style={styles.instructions}>To get started, tap the button below</Text>
				{
					status === Status.Connecting
						? <Text style={styles.instructions}>connecting...</Text>
						: status === Status.Connected
							? <TouchableOpacity onPress={this.didTapDisconnect}>
								<Text style={styles.welcome}>Disconnect!</Text>
							</TouchableOpacity>
							: <TouchableOpacity onPress={this.didTapConnect}>
								<Text style={styles.welcome}>io Connect! {this.URL}</Text>
							</TouchableOpacity>
				}


			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
});
