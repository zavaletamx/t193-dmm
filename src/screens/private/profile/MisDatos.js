import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
	Alert,
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
import ProgressDialog from '../../../components/ProgressDialog';
import stylesForm from './../../../styles/styles.forms';
import AppModal from '../../../components/AppModal';
import * as ImagePicker from 'expo-image-picker';

const MisDatos = (props) => {
	const [snack, setSnack] = useState(false);
	const [snackUpdate, setSnackUpdate] = useState(false);
	const [snackValida, setSnackValida] = useState(false);
	const [usuarioFirebase, setUsuarioFireBase] = useState(
		{}
	);
	const [docUsuario, setDocUsuario] = useState({});
	const [modal, setModal] = useState(true);
	const [modalImg, setModalImg] = useState(false);

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
			setModal(false);
		}
	};

	/**
	 * Función para selecciona una imagen de la
	 * librería de fotos (Android)
	 * rollo de camara (Camera Roll iOS)
	 *
	 * 1.- importar imagePicker
	 * 2.- pedir permiso para acceder a las imágenes
	 * 3.- configurar el tipo multimedia
	 * 4.- disfrutar de tu imagen
	 */
	const tomarImagenGaleria = async () => {
		/**
		 * Para usar Hardware del dispositivo es necesario que el
		 * usuario nos conceda el permiso, de lo contrario no
		 * podremos continuar
		 */
		const {
			status,
		} = await ImagePicker.requestMediaLibraryPermissionsAsync();

		/**
		 * Si el usuario me permite acceder a su galeria, intentamos seleccionar
		 * un elemento multimedia
		 *
		 * 1.- Tipo de multimedia (todo, imagen o video)
		 * 2.- Permitir edición (relación de aspecto)
		 * 3.- Relación de aspecto específica
		 * 4.- calidad (0 = chafa, 1 = alta)
		 */
		if (status === 'granted') {
			const imgGaleria = await ImagePicker.launchImageLibraryAsync(
				{
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [16, 9],
					quality: 1,
				}
			);

			console.log(imgGaleria);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{modal ? (
				<ProgressDialog mostrar={modal} />
			) : null}

			{/**
			 * Solo mostramos la ventana modal de seleccion de
			 * imagenes si el state es true
			 */}
			{modalImg ? (
				<AppModal
					show={modalImg}
					layerBgColor='#333'
					layerBgOpacity={0.5}
					modalBgColor='#fff'
					modalOpacity={1}
					modalContent={
						<View>
							<Text
								style={{
									alignSelf: 'center',
									marginVertical: 10,
									fontSize: 20,
									fontWeight: '500',
								}}
							>
								<FontAwesome5
									name='camera-retro'
									size={20}
								/>{' '}
								Actualizar imagen de perfíl
							</Text>

							<Button title='Tomar foto' />

							<View
								style={{
									marginVertical: 5,
								}}
							/>

							<Button
								title='Galería'
								onPress={tomarImagenGaleria}
							/>

							<View
								style={{
									marginVertical: 5,
								}}
							/>

							<Button
								title='Cancelar'
								color='red'
								onPress={() =>
									setModalImg(false)
								}
							/>
						</View>
					}
				/>
			) : null}

			<Snackbar
				textMessage='Datos actualizados'
				visible={snackUpdate}
				backgroundColor='#000'
				actionText='Entendido'
				actionHandler={() => {
					setSnackUpdate(false);
				}}
			/>

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
				<TouchableOpacity
					onPress={() => setModalImg(true)}
				>
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

				<View style={stylesForm.contenedor}>
					<TextInput
						/**
						 * Sobreescribir un estilo
						 * desde otro archivo
						 * para un elemento
						 */
						style={{
							...stylesForm.input,
							borderColor: '#000',
							borderWidth: 10,
						}}
						value={docUsuario.nombre}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['nombre']: val,
							})
						}
					/>
					<TextInput
						style={stylesForm.input}
						value={docUsuario.apellido1}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['apellido1']: val,
							})
						}
					/>
					<TextInput
						style={stylesForm.input}
						value={docUsuario.apellido2}
						onChangeText={(val) =>
							setDocUsuario({
								...docUsuario,
								['apellido2']: val,
							})
						}
					/>
					<TextInput
						style={stylesForm.input}
						value={usuarioFirebase.email}
						editable={false}
						onChangeText={(val) =>
							setUsuarioFireBase({
								...usuarioFirebase,
								['email']: val,
							})
						}
					/>
				</View>

				<Button
					title='Guardar cambios'
					onPress={async () => {
						/**
						 * Existen 2 métodos para actualizar
						 * en firestore
						 *
						 * 1.- Método constructivo (update)
						 * 2.- Método destructivo  (set)
						 *
						 *
						 * 1.- Método constructivo
						 */
						setModal(true);
						try {
							const query = await firebase.db
								.collection('usuarios')
								.doc(docUsuario.id)
								.update({
									nombre:
										docUsuario.nombre,
									apellido1:
										docUsuario.apellido1,
									apellido2:
										docUsuario.apellido2,
								});
							//2.- user set
							// .set({
							// 	nombre:
							// 		docUsuario.nombre,
							// });

							setSnackUpdate(true);
							setModal(false);
						} catch (e) {
							console.warn(e.toString());
							setModal(false);
						}
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MisDatos;
