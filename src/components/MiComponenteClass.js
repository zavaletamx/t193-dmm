/**
 * Para crear un componente de tipo class en React neceitas:
 * 1.- Import de React
 * 2.- Import de los elementos gráficos
 * 3.- Crear una clase con el nombre del archivo
 *      Heredar dicha clase de Component
 * 4.- Usar el metodo render para retornar el contenido
 * 5.- exportar la clase
 */
import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import estilos from '../styles/estilos';
import { Espacios } from './../../App';

export default class MiComponenteClass extends Component {
	render() {
		return (
			<>
				<Text>
					Hola desde un Componente con Clase
				</Text>

				<Button title='Boton 4' />
				<Button title='Boton 5' />
				<Button title='Boton 6' />
			</>
		);
	}
}

export class MiOtraClase extends Component {
	render() {
		return (
			<>
				<Espacios />
				<Text>
					Otra clase como no claro que si, aqui
					andamos
				</Text>
			</>
		);
	}
}

export const OtroComponente = () => {
	return (
		<>
			<Espacios />
			<Text style={estilos.textos}>
				Otro componente en el mismo archivo junto a
				unas clases, pero yo no soy una clase, no
				no, yo soy una funcion flecha dentro de una
				constante (por si tenían el pendiente)
			</Text>
		</>
	);
};

//export default MiComponenteClass;
