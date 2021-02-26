import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	Button,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import firebase from './../../../database/firebase';
import Snackbar from 'react-native-snackbar-component';
import { FontAwesome5 } from '@expo/vector-icons';
const MisDatos = (props) => {
	const [snack, setSnack] = useState(false);
	const [snackValida, setSnackValida] = useState(false);
	const [usuarioFirebase, setUsuarioFireBase] = useState(
		{}
	);
	const [docUsuario, setDocUsuario] = useState({});

	useFocusEffect(() => {
		props.navigation
			.dangerouslyGetParent()
			.dangerouslyGetParent()
			.setOptions({
				title: 'Mis Datos',
			});
	});

	/**
	 * Creamos un efecto sin enganchar que nos permite tomar los datos
	 * del usuario que ha iniciado sesión
	 */
	useEffect(() => {
		/**
		 * React NO recomienda el uso de ASYNC dentro de los efectos
		 * ya que afectan su rendimiento
		 *
		 * Si es necesaria una peticion asincrona dentro de un efecto
		 * los correcto es usa runa promesa y then()
		 * o bien crear una función por separado e invocarla
		 * en el efecto
		 *
		 * Tomamos al usuario que se ha logueado y mantiene una sesión
		 * activa
		 */
		const usuarioFirebase = firebase.auth.currentUser;
		setUsuarioFireBase(usuarioFirebase);
		getUsuario(usuarioFirebase.uid);
		console.log(usuarioFirebase.uid);
		/**
		 * Si la cuenta no está validada mostramos el Snack
		 */
		if (!usuarioFirebase.emailVerified) {
			setSnack(true);
		}

		if (usuarioFirebase.emailVerified) {
			setSnackValida(true);
		}
	}, []);

	/**
	 * Función asíncrona para tomar los documetos de la
	 * colección usuarios con el id del usuario que inició sesión
	 */
	const getUsuario = async (authId) => {
		/**
		 * Generamos una consulta para tomar los documetos de la
		 * colección usuarios con el id del usuario que inició sesión
		 */
		const query = await firebase.db
			.collection('usuarios')
			//Where utiliza 3 parámetros:
			//1.- clave a comparar
			//2.- Tipo de condición
			.where('authId', '==', authId)
			.get();

		//Si la consulta no está vacía
		if (!query.empty) {
			/**
			 * Generamos un snapshot de la consulta
			 * guardada en query
			 */

			//Cuando la consulta esperamos que
			//contenga varios registros
			// const snapshot = query.docs;
			// snapshot.forEach((doc) => {
			// 	console.log(doc.data());
			// });

			//Cuando en la ocnsulta esperamos solo un
			//registro
			const snapshot = query.docs[0];
			setDocUsuario({
				...snapshot.data(),
				id: snapshot.id,
			});
			console.log(usuarioFirebase);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Snackbar
				textMessage='Cuenta sin validar'
				visible={snack}
				backgroundColor='#dc3545'
				actionText='Entendido'
				actionHandler={() => {
					setSnack(false);
				}}
			/>
			<Snackbar
				textMessage='Cuenta validada'
				visible={snackValida}
				backgroundColor='#28a745'
				actionText='¡Genial!'
				actionHandler={() => {
					setSnackValida(false);
				}}
			/>

			<ScrollView>
				<TouchableOpacity>
					<ImageBackground
						source={require('./../../../../assets/images/avatar_placeholder.png')}
						style={{
							width: 200,
							height: 200,
							alignSelf: 'center',
							marginVertical: 15,
							overflow: 'hidden',
							borderRadius: 125,
						}}
					>
						<Text
							style={{
								backgroundColor: '#525252',
								color: '#fff',
								width: '100%',
								paddingBottom: 20,
								paddingTop: 10,
								opacity: 0.7,
								textAlign: 'center',
								position: 'absolute',
								bottom: 0,
							}}
						>
							<FontAwesome5
								name='camera'
								size={14}
								color='#fff'
							/>{' '}
							Cambiar imagen
						</Text>
					</ImageBackground>
				</TouchableOpacity>

				<TextInput value={docUsuario.nombre} />
				<TextInput value={docUsuario.apellido1} />
				<TextInput value={docUsuario.apellido2} />
				<TextInput value={usuarioFirebase.email} />

				<Button
					title='Guardar cambios'
					onPress={() => {}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MisDatos;
