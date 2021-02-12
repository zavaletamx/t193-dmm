import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';

const Catalogo = (props) => {
	useFocusEffect(() => {
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	return (
		<View>
			<Text>Catálogo.js</Text>
		</View>
	);
};

export default Catalogo;
