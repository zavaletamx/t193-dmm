import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';
const Terminos = (props) => {
	useFocusEffect(() => {
		props.navigation
			.dangerouslyGetParent()
			.dangerouslyGetParent()
			.setOptions({
				title: 'Términos y condiciones',
			});
	});

	return (
		<View>
			<Text>Terminos.js</Text>
		</View>
	);
};

export default Terminos;
