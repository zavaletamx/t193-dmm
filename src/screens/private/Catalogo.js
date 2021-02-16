import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import Usuario from '../../components/Usuario';

const Catalogo = (props) => {
	//Cambiar el titulo de cada sección (Clase 9 11-feb-21)
	useFocusEffect(() => {
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	/**
	 * Javascript permite manejar peticiones en segundo plano (thread/hilos)
	 * El ejemplo que siempre te acompaña (Ajax)
	 *
	 * Peticiones asincronas:
	 *
	 * Promise ======= Es una función que ejecuta un código y queda a la espera
	 *                 de la respuesta y permite ejecutar un callback
	 *
	 * Async ========= Palabra reservada que indica el uso de una función
	 *                 asíncrona, permite generar un hilo para la espera
	 *                 de la ejecución del mismo
	 *
	 * Tres formas de usar contenido asincrono
	 * 1.- async
	 * 2.- fetch
	 * 3.- Clase Promise
	 */

	/**
	 * Funcion flecha que retorne el objeto json de datos
	 * a partir de un Promise implementando fetch
	 */
	const getUsuariosPromise = () => {
		fetch('https://reqres.in/api/users?per_page=12')
			.then((response) => response.json())
			.then((json) => {
				//Programe AQUI
				console.log(json.data);
			})
			.catch((e) => console.log(e));
	};

	/**
	 * Cargamos los datos del webservice usando fetch desde una funcion
	 * asincrona
	 */
	const getUsuariosAsync = async () => {
		try {
			const response = await fetch(
				'https://reqres.in/api/users?per_page=12'
			);
			const json = await response.json();
			console.log(json.data);
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * Creamos un efecto que no esté enganchado a ningun estado (solo se ejecuta al inicio)
	 * Para invocar a la lista de usuarios
	 */
	useEffect(() => {
		//Cargamos la lista por medio de una promesa
		//getUsuariosPromise();
		//Cargamos la lista por medio de un func async
		getUsuariosAsync();
	}, []);

	return <View style={{ flex: 1 }}></View>;
};

export default Catalogo;
