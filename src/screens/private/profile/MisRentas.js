import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';
const MisRentas = (props) => {
	useFocusEffect(() => {
		props.navigation
			.dangerouslyGetParent()
			.dangerouslyGetParent()
			.setOptions({
				title: 'Mis Rentas',
			});
	});

	return (
		<View>
			<Text>MisRentas.js</Text>
		</View>
	);
};

export default MisRentas;
