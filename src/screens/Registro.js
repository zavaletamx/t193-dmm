import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import estilos from './../styles/styles.forms';
import firebase from '../database/firebase';
import getError from '../helpers/errores_es_mx';

export default class Registro extends Component {
	/**
	 * Desde una clase podemos acceder a las porpiedades y al estado
	 * desde el constructory se invocan utilizando la palabra this
	 */
	constructor(props) {
		super(props);

		/**
		 * Las variables de estado tambien se aplican desde el constructor
		 * dentro de una propiedad de tipo objeto reservada con el nombre
		 * de state, de igual manera accedemos a ella por medio del selector
		 * this
		 *
		 * this.state = {clave : valor};
		 */
		this.state = {
			nombre: '',
			apellido1: '',
			apellido2: '',
			fechaNacimiento: '',
			telefono: '',
			email: '',
			pin: '',
			terminos: false,
			aiVisible: false,
			btnVisible: true,
		};
	}

	/**
	 * Para crear un metodo en una clase de JS-ES6 solo debemos identificar su nombre
	 * (con las misma reglas de una función) y agregar sus parámetros identico a crear
	 * una función, PERO SIN LA PALABRA FUNCTION
	 */

	/**
	 * @deprecated Metodo que valida el formulario
	 * @param {*} state
	 */
	validaRegistro(state) {
		Alert.alert(`Hola ${this.state.nombre}`);
	}

	render() {
		/**
		 * Función que valida el formluario
		 */
		const validaRegistro = async () => {
			if (this.state.nombre.length < 3) {
				Alert.alert(
					'ERROR',
					'Nombre incorrecto',
					[
						{
							text: 'Corregir',
							onPress: () => {
								this.setState({
									nombre: '',
								});
							},
						},
					],
					{ cancelable: false }
				);

				return;
			}

			if (this.state.apellido1.length < 3) {
				Alert.alert(
					'ERROR',
					'Apellido 1 incorrecto',
					[
						{
							text: 'Corregir',
							onPress: () => {
								this.setState({
									apellido1: '',
								});
							},
						},
					],
					{ cancelable: false }
				);

				return;
			}

			if (
				this.state.apellido2.length > 0 &&
				this.state.apellido2.length < 3
			) {
				Alert.alert(
					'ERROR',
					'Apellido 2 incorrecto',
					[
						{
							text: 'Corregir',
							onPress: () => {
								this.setState({
									apellido2: '',
								});
							},
						},
					],
					{ cancelable: false }
				);

				return;
			}

			/**
			 * Si pasamos todas las validaciones, llegaremos
			 * aquí
			 */
			// this.setState({ aiVisible: true });
			// this.setState({ btnVisible: false });
			this.setState({
				aiVisible: true,
				btnVisible: false,
			});

			/**
			 * Creamos un documento en la colección usuarios
			 */
			try {
				/**
				 * REgistramos un usuario por correo y pass
				 * en el Servicio de auth de Firebase
				 */
				const usuarioFirebase = await firebase.auth.createUserWithEmailAndPassword(
					this.state.email,
					this.state.pin
				);

				/**
				 * Creamos documento en la
				 * coleccion ligando el id del usuario en AUTH
				 */
				const docUsuario = await firebase.db
					.collection('usuarios')
					.add({
						authId: usuarioFirebase.user.uid,
						nombre: this.state.nombre,
						apellido1: this.state.apellido1,
						apellido2: this.state.apellido2,
					});

				/**
				 * Enviamos correo de verificación
				 * al usuario
				 */
				await usuarioFirebase.user
					.sendEmailVerification()
					.then(() => {
						Alert.alert(
							'Registro exitoso',
							`Gracias por registrar ${this.state.nombre}\nTu ID:\n${docUsuario.id}\nREvisa tu correo electrónico para verificar tu cuenta`,
							[
								{
									text: 'Continuar',
									onPress: () => {
										this.setState({
											aiVisible: false,
											btnVisible: true,
										});
									},
								},
							]
						);
					});
			} catch (e) {
				console.log(e.code);
				Alert.alert(
					'ERROR',
					getError(e.code),
					[
						{
							text: 'Aceptar',
							onPress: () => {
								this.setState({
									aiVisible: false,
									btnVisible: true,
								});
							},
						},
					],
					{ cancelable: false }
				);
			}
		};

		return (
			<ScrollView style={estilos.contenedor}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={
						Platform.OS === 'ios'
							? 'padding'
							: 'height'
					}
				>
					<View
						style={
							estilos.contenedorImgCircular
						}
					>
						<Image
							source={require('./../../assets/images/register.png')}
							style={{
								...estilos.imgLogin,
								backgroundColor: '#000',
								borderRadius: 0,
								marginVertical: 0,
							}}
						/>
					</View>
					<Text style={estilos.titulo}>
						Regístrate
					</Text>
					<TextInput
						placeholder='*Nombre'
						keyboardType='default'
						style={estilos.input}
						value={this.state.nombre}
						onChangeText={(val) => {
							this.setState({ nombre: val });
						}}
					/>
					<View style={estilos.row}>
						<View
							style={[
								estilos.col,
								estilos.derecha,
							]}
						>
							<TextInput
								placeholder='*Apellido 1'
								keyboardType='default'
								style={estilos.input}
								value={this.state.apellido1}
								onChangeText={(val) => {
									this.setState({
										apellido1: val,
									});
								}}
							/>
						</View>

						<View
							style={[
								estilos.col,
								estilos.izquierda,
							]}
						>
							<TextInput
								placeholder='Apellido 2'
								keyboardType='default'
								style={estilos.input}
								value={this.state.apellido2}
								onChangeText={(val) => {
									this.setState({
										apellido2: val,
									});
								}}
							/>
						</View>
					</View>
					<TextInput
						placeholder='*Correo electrónico'
						keyboardType='default'
						style={estilos.input}
						value={this.state.email}
						autoCapitalize='none'
						onChangeText={(val) => {
							this.setState({ email: val });
						}}
					/>

					<TextInput
						placeholder='*Pin (6 dígitos)'
						keyboardType='default'
						style={estilos.input}
						value={this.state.pin}
						onChangeText={(val) => {
							this.setState({ pin: val });
						}}
					/>
					<ActivityIndicator
						size='large'
						color='#000'
						style={{
							marginVertical: 15,
							display: this.state.aiVisible
								? 'flex'
								: 'none',
						}}
					/>
					<View
						style={{
							display: this.state.btnVisible
								? 'flex'
								: 'none',
						}}
					>
						<Button
							title='Registrarse'
							// onPress={() => {
							// 	this.validaRegistro(this.state);
							// }}
							onPress={validaRegistro}
						/>
					</View>
					<Button
						title='¿Ta tienes una cuenta?, inicia sesión aquí'
						onPress={() => {
							this.props.navigation.navigate(
								'Login'
							);
						}}
					/>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}
