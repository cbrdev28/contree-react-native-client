import React from "react";
import { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import { regularMargin, panelBorderRadius, cardTextColor, tableColor } from "./commonStyles";

interface TableProps { }

export class Table extends Component<TableProps> {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.cardContainer}>Pique</Text>
				<Text style={styles.cardContainer}>Coeur</Text>
				<Text style={styles.cardContainer}>Carreaux</Text>
				<Text style={styles.cardContainer}>Trefle</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		margin: regularMargin,
		padding: regularMargin,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: tableColor,
		borderRadius: panelBorderRadius,
	},
	cardContainer: {
		flex: 1,
		padding: regularMargin,
		margin: regularMargin / 2,
		backgroundColor: cardTextColor,
		borderRadius: panelBorderRadius * 2,
		textAlign: "center",
	}
});
