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

interface Props { }
interface AppState {
	connected: boolean;
}

export default class App extends Component<Props, AppState> {
	state = { connected: false };

	didTapConnect = () => {
		this.setState({ connected: true });
	}

	didTapDisconnect = () => {
		this.setState({ connected: false });
	}

	render() {
		const { connected } = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native! CBR</Text>
				<Text style={styles.instructions}>To get started, tap the button below</Text>
				{connected
					? <TouchableOpacity onPress={this.didTapDisconnect}>
						<Text style={styles.welcome}>Disconnect!</Text>
					</TouchableOpacity>
					: <TouchableOpacity onPress={this.didTapConnect}>
						<Text style={styles.welcome}>Connect!</Text>
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
