/*
Para crear un componente (ya sea Screen o no)
1.- importar React 
2.- crear una conestante con un Arrow Function y retornar minimo un elemento
3.- exportar el módulo con la constante
*/
import React from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
} from 'react-native';

const MiComponente = () => {
	/*
    OJOOOOOOO
    UN COMPONENTE SOLO PUEDE RETORNAR UN ELEMENTO GRÁFICO A LA VEZ
    */
	return (
		/*View es un contenedro (similar a div)*/
		<View>
			<Text style={styles.subtitulos}>
				Mi componente
			</Text>
			<Button title='Boton 1' />
			<Button title='Boton 2' />
			<Button title='Boton 3' />
		</View>
	);
};

//Exportar el componente para usarlo en otros archivos
export default MiComponente;

export const ComponenteAF2 = () => {
	return (
		<View>
			<Text style={styles.subtitulos}>
				Mi ComponenteAF2
			</Text>
		</View>
	);
};

/**
 * Existen 3 tipos de componentes:
 * 1.- Constantes
 * 2.- Funciones
 * 3.- Clases+
 * + El uso de clases como componentes de react ahora es obsoleto
 */

/**
 * Estilos para uso global de un mimso archivo
 *
 * El estilo de objetos necesita nombrar cada estilo
 * para poder utilizarlo
 *
 * Tipos de estilos
 *
 *  1.- Estilo directo en el componente (No se puede reutilizar)
 *  2.- Objeto de estilos en el mismo archivo (Se puede reutilizar solo en
 *      los componentes del mismo archivo)
 * 3.- Objeto de estilos para toda la app (reutilizable en todos lados)
 */
const styles = StyleSheet.create({
	subtitulos: {
		fontSize: 15,
		backgroundColor: '#000',
		color: '#fff',
		padding: 10,
		width: '100%',
		textAlign: 'center',
	},
});
