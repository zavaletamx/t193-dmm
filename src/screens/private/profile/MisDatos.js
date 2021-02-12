import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';
const MisDatos = (props) => {
	useFocusEffect(() => {
		props.navigation
			.dangerouslyGetParent()
			.dangerouslyGetParent()
			.setOptions({
				title: 'Mis Datos',
			});
	});

	return (
		<View>
			<Text>MisDatos.js</Text>
		</View>
	);
};

export default MisDatos;
