import React from 'react';

/**
 * Para crear un TabNavigator necesitamos un contenedor para
 * indicar dentro cada item del menu
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MisDatos from './profile/MisDatos';
import MisRentas from './profile/MisRentas';
import Terminos from './profile/Terminos';

import {
	FontAwesome5,
	MaterialCommunityIcons,
	Entypo,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Perfil = (props) => {
	return (
		<Tab.Navigator
			initialRouteName='MisDatos'
			tabBarOptions={{
				activeBackgroundColor: '#282828',
				style: { backgroundColor: '#000' },
				showLabel: false,
			}}
		>
			<Tab.Screen
				name='MisDatos'
				component={MisDatos}
				options={{
					tabBarIcon: () => (
						<FontAwesome5
							name='user-edit'
							size={30}
							color='#fff'
						/>
					),
				}}
			/>

			<Tab.Screen
				name='MisRentas'
				component={MisRentas}
				options={{
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name='movie-search'
							size={35}
							color='#fff'
						/>
					),
				}}
			/>

			<Tab.Screen
				name='Terminos'
				component={Terminos}
				options={{
					tabBarIcon: () => (
						<Entypo
							name='text'
							size={30}
							color='#fff'
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default Perfil;
