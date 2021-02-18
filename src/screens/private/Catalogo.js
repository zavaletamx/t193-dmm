import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	RefreshControl,
	Text,
	View,
} from 'react-native';
import Usuario from '../../components/Usuario';

const Catalogo = (props) => {
	//Estado para controlar la visibilidad del loader para mi FlatList
	const [rcUsers, setRcUsers] = useState(true);

	//Estado para guardar el arreglo de usuarios
	const [users, setUSers] = useState([]);

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

			/**
			 * Recorrer el arreglo de datos del servicio para
			 * guardarlos en mi estado por medio de la función
			 * setUsuarios
			 */
			const arrUsuarios = [];

			json.data.map((usuario) => {
				//Guardar el objeto de usuario dentro
				//de mi arreglo de usuarios
				arrUsuarios.push(usuario);
			});

			//Indicamos que el valor del estado
			//será el del arreglo
			setUSers(arrUsuarios);
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
		setTimeout(() => {
			getUsuariosAsync();
			setRcUsers(false);
		}, 1000);
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				style={{ margin: 15 }}
				refreshControl={
					<RefreshControl refreshing={rcUsers} />
				}
				data={users}
				renderItem={(item) => (
					<Usuario datosUsuario={item.item} />
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

export default Catalogo;
