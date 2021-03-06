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
import * as Permissions from 'expo-permissions';

const MisDatos = (props) => {
	const [snack, setSnack] = useState(false);
	const [snackUpdate, setSnackUpdate] = useState(false);
	const [snackValida, setSnackValida] = useState(false);
	const [errorSnack, setErrorSnack] = useState(false);
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
					aspect: [4, 4],
					quality: 1,
				}
			);

			/**
			 * Si el usuario NO cancela la acción
			 */
			if (!imgGaleria.cancelled) {
				/**
				 * Pasamos la url de la imgen al state del usuario
				 */
				setDocUsuario({
					...docUsuario,
					['avatar']: imgGaleria.uri,
				});

				/**
				 * Subir la imagen al storage (almacenamiento)
				 * de firebase
				 *
				 * 1.- Asegurarnos que tenemos storage en nuestra lib
				 *      de firebase
				 * 2.- Crear un archivo blob/file para subir a la nube
				 *
				 * FIRESTORE
				 * 3.- actualixar la colección de usuarios para el documento
				 *      del usuario con sesión iniciada
				 * e indicarle cual es su nuevo avatar
				 *
				 * ESCUCHAR AUDIO DEL VIDEO ACERCA DE HILOS
				 *
				 */

				//Cerramos screen modal
				setModalImg(false);

				//Mostramos modal loader
				setModal(true);

				/**
				 * Para subir un archivo a storage es necesario
				 * generar un file a partir de un blob
				 * blob ---------- contenido binario de un archivo
				 * file ---------- representación de un ficher contiene
				 *                 nombre, tipo, contenido binario
				 * firebase.storage.put(archivo, config) ---- sube el archivo
				 */

				//Generamos el contenido binario de nuestra imgen
				//de la galeria
				const blob = await (
					await fetch(imgGaleria.uri)
				).blob();

				/**
				 * Creamos un archivo de tipo imagen para
				 * guardar el contenido blob e indicamos el nombre
				 * del archivo y sus poropiedades
				 *
				 * File ([blob], nombre, propiedades)
				 */
				const file = new File(
					[blob],
					`${docUsuario.id}.jpg`,
					{ type: 'image/jpeg' }
				);

				blob.close();

				//Creamos una referencia a firebase storage
				//y si necesitamos bavegar entre carpetas
				//indicamos las rutas de los elementos
				//hijos
				/**
				 * ref() --------- genera una referencia a la raiz
				 *                  del contenido de storage (bucket)
				 *
				 * child() ------- genera una referencia dentro
				 *                  de la referencia del contenido
				 */
				try {
					setSnack(false);
					const subida = await firebase.storage
						.ref()
						//Navegamos en carpetas
						.child('images')
						.child('users')
						//Crear un archivo en blanco
						.child(file.name)
						//Escribe el contenido del archivo
						.put(file, {
							contentType: file.type,
						});

					if (subida.state === 'success') {
						/**
						 * Tomar la URL para ver la imagen
						 */
						const urlAvatar = await subida.ref.getDownloadURL();

						/**
						 * Actualizamos los datos del usuario y le agregamos
						 * la nueva url de su imagen de perfíl
						 */
						await firebase.db
							.collection('usuarios')
							.doc(docUsuario.id)
							.update({
								avatar: urlAvatar,
							});

						setSnackUpdate(true);
					} else {
						setErrorSnack(true);
					}

					setModal(false);
				} catch (e) {
					console.log(e.toString());
					setModal(false);
					setErrorSnack(true);
				}
			}

			//Si cancela la acción de seleccionar una imagen
			else {
				Alert.alert(
					'ERROR',
					'Selecciona una imagen de tu galería'
				);
			}
		}
	};

	/**
	 * Función para habilitar la camara y tomar una foto
	 */
	const tomarFotoCamara = async () => {
		/**
		 * Para poder tomar una foto necesitamos que el usuario nos conceda
		 * dos permisos
		 * CAMARA
		 * MEDIA_LIBRARY (Galería, Rollo fotográfico)
		 */
		const permisoCamara = await Permissions.askAsync(
			Permissions.CAMERA
		);

		const permisoGaleria = await Permissions.askAsync(
			Permissions.MEDIA_LIBRARY
		);

		/**
		 * Si me conceden ambos permisos
		 * inicializamos la camara
		 */
		if (
			permisoCamara.status === 'granted' &&
			permisoGaleria.status === 'granted'
		) {
			/**
			 * Mismo proceso que tomar imagen de la galeria
			 */
			const imgCamara = await ImagePicker.launchCameraAsync(
				{
					mediaTypes:
						ImagePicker.MediaTypeOptions.Images,
					allowsEditing: true,
					aspect: [4, 4],
					quality: 1,
				}
			);

			if (!imgCamara.cancelled) {
				setDocUsuario({
					...docUsuario,
					['avatar']: imgCamara.uri,
				});

				//blob
				//file
				//ref.put()
				//update_bd

				modalImg(true);
			}

			//Si cancela la acción de seleccionar una imagen
			else {
				Alert.alert(
					'ERROR',
					'Toma una foto para continuar'
				);
			}
		} else {
			//MOSTRAR ERROR FALTAN PERMISOS
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

							<Button
								title='Tomar foto'
								onPress={tomarFotoCamara}
							/>

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

			<Snackbar
				textMessage='Ocurrió un error'
				visible={errorSnack}
				backgroundColor='#dc3545'
				actionText='Entendido'
				actionHandler={() => {
					setSnack(false);
				}}
			/>

			<ScrollView>
				<TouchableOpacity
					onPress={() => setModalImg(true)}
				>
					<ImageBackground
						/**
						 * Evaluamos si el usuario tiene imagen de perfil en su doc
						 * de lo contrario, mostramos la imagen defecto
						 *
						 * Si el tipo de dato de avatar es 'undefined' no hay imagen
						 */
						source={
							typeof docUsuario.avatar !==
							'undefined'
								? //Si hay una imagen en firebase
								  { uri: docUsuario.avatar }
								: //Si no hay imgen en firebase
								  require('./../../../../assets/images/avatar_placeholder.png')
						}
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
