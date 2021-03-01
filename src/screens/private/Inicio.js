import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import firebase from './../../database/firebase';

const Inicio = (props) => {
	const [peliculas, setPeliculas] = React.useState([]);

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

	/**
	 * Creamos un efecto que no este enganchado a ningún componente
	 * (Sólo se eejcuta al inicializarse el screen)
	 */
	React.useEffect(() => {
		/**
		 * Un snapshot es una versión almacenada en cache de la BD
		 * Es una copia local de información que está ligada a cualquier cambio
		 * ya sea local o remoto
		 *
		 * Creamos un snapshot sobre una colección (consulta)
		 */
		firebase.db
			.collection('peliculas')
			.onSnapshot((querySnapshot) => {
				const arrPelis = [];

				/**
				 * querSnapshot contiene una porpiedad llamada docs
				 * docs contiene un arreglo con todos los documentos
				 * de la colección
				 *
				 * Recorremos en su totalidad la propiedad docs
				 */
				querySnapshot.docs.map((doc) => {
					//data contiene un wrapper de la info de cada
					//documento
					arrPelis.push({
						peliculaId: doc.id,
						...doc.data(),
					});
				});
				setPeliculas(arrPelis);
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={peliculas}
				renderItem={(item) => (
					<Text>{item.item.titulo}</Text>
				)}
				keyExtractor={(item) => item.peliculaId}
			/>
		</View>
	);
};

export default Inicio;
