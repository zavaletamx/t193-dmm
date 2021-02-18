import React from 'react';
import { Alert, Button, View } from 'react-native';
import firebase from './../database/firebase';

/**
 * Todos los componentes de React son capaces de compartir sus propiedades por medio
 * de un parámetro en el incio de la funcion denominado props
 *
 * Dado que Inicio es parte de NavigationContainer tiene a su disposición
 * todos los elementos de navegacion dentro de su objeto de propiedades
 */
const Inicio = (props) => {
	/*
    Creamos una funcion flecha anonima que permita 
    crear un documento usuario en la colección usuarios
    */
	const crearUsuarioFS = async () => {
		try {
			//Usamos el metodo asincrono colleccion.add
			const usuario = {
				nombre: 'Raul',
				apellido: 'Zavaleta',
			};

			const usuarioFS = await firebase.db
				.collection('usuarios')
				.add(usuario);

			Alert.alert(
				'Practica 4',
				`ID instertado:\n\n${usuarioFS.id}\n\nINSERTAR DESDE EL FORMULARIO DE REGISTRO`,
				[{ text: 'Pues ya que', onPress: null }],
				{ cancelable: false }
			);
		} catch (e) {
			console.warn(e);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Button
				title='Login'
				onPress={() => {
					/**
					 * Accedemos al objeto de popriedades, en la clave
					 * navigation y accedemos a la funcion navigate
					 *
					 * Indicando el sobrenombre del componente podemos
					 * enviar la navegación al siguiente elemento
					 */
					props.navigation.navigate('Login');
				}}
			/>

			<Button
				title='Registro'
				onPress={() => {
					props.navigation.navigate('Registro');
				}}
			/>

			<Button
				title='Insertar en firestore'
				onPress={crearUsuarioFS}
			/>
		</View>
	);
};

export default Inicio;
