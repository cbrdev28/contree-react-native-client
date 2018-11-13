import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

interface OtherPlayersProps { }

export class OtherPlayers extends Component<OtherPlayersProps> {
	render() {
		return (
			<View style={styles.container}>
				<Text>Other Players</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: "red",
		// margin: regularMargin,
		// padding: regularMargin,
		// justifyContent: "space-between",
		// alignItems: "center",
	},
});
