import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { Text, View } from 'react-native';

const Inicio = (props) => {
	/*
    Creamos un efecto que permita modificar el título 
    del headerNav
    CADA QUE UN SCREEN ESTÉ EN FOCO
    */
	useFocusEffect(() => {
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Inicio',
		});
	});

	return (
		<View>
			<Text>Inicio.js</Text>
		</View>
	);
};

export default Inicio;
