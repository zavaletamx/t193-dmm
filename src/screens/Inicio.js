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
			<Text>En Inicio</Text>
			<Button
				title='Al Login'
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
		</View>
	);
};

export default Inicio;
