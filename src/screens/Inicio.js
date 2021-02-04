import React from 'react';
import { Button, Text, View } from 'react-native';

/**
 * Todos los componentes de React son capaces de compartir sus propiedades por medio
 * de un parámetro en el incio de la funcion denominado props
 *
 * Dado que Inicio es parte de NavigationContainer tiene a su disposición
 * todos los elementos de navegacion dentro de su objeto de propiedades
 */
const Inicio = (props) => {
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
		</View>
	);
};

export default Inicio;
