import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Inicio';
import Perfil from './Perfil';

/**
 * Agregamos una constante para crear nuestra pila de Screen de
 * Drawer
 */
const Drawer = createDrawerNavigator();

const Home = (props) => {
	return (
		/** Creamos la estructura de nuestro navigation Drawer */
		<Drawer.Navigator>
			{/** Agregamos cada item del Drawer */}
			<Drawer.Screen
				name='Iincio'
				component={Inicio}
			/>

			<Drawer.Screen
				name='Perfil'
				component={Perfil}
			/>
		</Drawer.Navigator>
	);
};

export default Home;
