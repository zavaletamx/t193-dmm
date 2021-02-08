import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

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
			suma: -7,
			tituloBoton: 'Vamos al login ese',
			peliculas: [{}],
		};
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					title={this.state.tituloBoton}
					onPress={() => {
						/**
						 * Para llamar a las propiedades desde una
						 * clase, utilizamos la palabra this
						 */
						this.props.navigation.navigate(
							'Login'
						);
					}}
				/>
				<Text
					style={{
						fontSize: 120,
						fontWeight: '100',
						textAlign: 'center',
						marginVertical: 40,
					}}
				>
					{
						/**
						 * Los estados de una clase se acceden por medio
						 * de la propiedad this, invocando al estado y nombrando
						 * la clave que se requiera
						 */
						this.state.suma
					}
				</Text>

				<Button
					title='Agregar'
					onPress={() => {
						/**
						 * Para modificar una variable de estado utilizamos
						 * la función desacoplada denominada
						 * this.state.setState(_OBJ_);
						 */
						this.setState({
							suma: this.state.suma + 1,
						});
					}}
				/>
			</View>
		);
	}
}
