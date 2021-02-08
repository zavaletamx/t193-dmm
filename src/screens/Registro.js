import React, { Component } from 'react';
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import estilos from './../styles/styles.forms';

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
		const validaRegistro = () => {
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
		};

		return (
			<ScrollView style={estilos.contenedor}>
				<View style={estilos.contenedorImgCircular}>
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
			</ScrollView>
		);
	}
}
