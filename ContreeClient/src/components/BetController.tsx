import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { regularMargin, panelBorderRadius, cardTextColor, tableColor } from "./commonStyles";

interface BetControllerProps { }

export class BetController extends Component<BetControllerProps> {
	render() {
		return (
			<View style={styles.container}>
				<Text>Bets</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		borderColor: "green",
		// margin: regularMargin,
		// padding: regularMargin,
		// justifyContent: "space-between",
		// alignItems: "center",
	},
});
