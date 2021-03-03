import React, { useEffect } from 'react';
/**
 * Para utilizar la navegación de React necesitamos
 * 1.- NavigationContainer (preferentemente uno para toda la App)
 * 2.- Contenedor de forma de navegación (Stack, Tab, Drawer) ejem = Stack
 * 3.- Indicar las screens relacionadas a ese contenedor de navegacion
 */
//1.-
import { NavigationContainer } from '@react-navigation/native';

//2.-
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Inicio from './src/screens/Inicio';
import Registro from './src/screens/Registro';
import Home from './src/screens/private/Home';
import { LogBox } from 'react-native';

//2.1.- Creamos el contenedo de la navegación
const Stack = createStackNavigator();

export default function App() {
	/**
	 * Creamos un hook para ocultar el mensaje de warning
	 * de la librería Snackbar
	 */
	useEffect(() => {
		LogBox.ignoreLogs([
			'Animated: `useNativeDriver`',
			'Setting a timer for a long period of time',
		]);
	}, []);

	/** Este componente NO RETORNA NINGUNA SCREEN DIRECTAMENTE
	 * Solo indicar la ruta de navegación de todos los componentes
	 */
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Inicio'>
				{/** Paso 3 */}

				<Stack.Screen
					name='Login'
					component={Login}
				/>

				<Stack.Screen
					name='Inicio'
					component={Inicio}
				/>

				<Stack.Screen
					name='Registro'
					component={Registro}
				/>

				<Stack.Screen
					name='Home'
					component={Home}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
