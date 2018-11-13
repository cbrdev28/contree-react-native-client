import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { regularMargin, panelBorderRadius, cardTextColor, tableColor } from "../styles/commonStyles";

interface BetControllerProps {
	bets: Bet[];
}

interface Bet {
	timestamp: string;
	announcer: string;
	value: string;
}

export class BetController extends Component<BetControllerProps> {
	renderAllBets = () => {
		const { bets } = this.props;
		return bets.map((bet: Bet, index: number) => (
			<View key={index} style={styles.betContainer}>
				<Text style={styles.announcerText}>{bet.announcer}</Text>
				<Text style={styles.betText}>{bet.value}</Text>
			</View>
		));
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Bets</Text>
				<View style={styles.allBetsContainer}>
					{this.renderAllBets()}
				</View>
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
	allBetsContainer: {
		flex: 1,
		borderWidth: 1,
		borderColor: "red"
	},
	betContainer: {
	},
	announcerText: {
	},
	betText: {
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "pink"
	},
	betInput: {
	},
	sendBetButton: {
	},
});
