/*
Para crear un componente (ya sea Screen o no)
1.- importar React 
2.- crear una conestante con un Arrow Function y retornar minimo un elemento
3.- exportar el módulo con la constante
*/
import React from 'react';
import { View, Text, Button } from 'react-native';

const MiComponente = () => {
	/*
    OJOOOOOOO
    UN COMPONENTE SOLO PUEDE RETORNAR UN ELEMENTO GRÁFICO A LA VEZ
    */
	return (
		/*View es un contenedro (similar a div)*/
		<View>
			<Text>Mi componente</Text>
			<Button title='Boton 1' />
			<Button title='Boton 2' />
			<Button title='Boton 3' />
		</View>
	);
};

//Exportar el componente para usarlo en otros archivos
export default MiComponente;
