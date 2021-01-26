import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import { Zocial, Fontisto } from '@expo/vector-icons';

const App = () => {
	const imagenUrl =
		'https://firebasestorage.googleapis.com/v0/b/expo-firebase-f29b9.appspot.com/o/images%2FChewSq.jpg?alt=media&token=fcc2aa12-a2be-4c31-bfbd-3cafa1335e2b';
	return (
		<>
			<View
				style={[
					styles.contenedor,
					{ backgroundColor: '#134074' },
				]}
			>
				<Image
					source={{
						uri: `${imagenUrl}`,
					}}
					style={styles.avatar}
				/>

				<Text style={styles.titulo}>
					{' '}
					Profe y Desarrollador de Apps
				</Text>

				<View style={styles.contenedorH}>
					<Text
						style={{
							width: '50%',
							textAlign: 'left',
							fontSize: 14,
							color: '#EEF4ED',
						}}
					>
						<Zocial name='email' size={14} />
						{'  '}
						raul@zavaletazea.dev
					</Text>
					<Text
						style={{
							width: '50%',
							textAlign: 'right',
							fontSize: 14,
							color: '#EEF4ED',
						}}
					>
						<Fontisto name='phone' size={14} />
						{'  '}
						+52 1 (442) 204 83 29
					</Text>
				</View>
			</View>

			<View
				style={[
					styles.contenedor,
					{ backgroundColor: '#EEF4ED' },
				]}
			></View>
		</>
	);
};

const styles = StyleSheet.create({
	contenedor: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 150,
	},
	titulo: {
		width: '100%',
		fontSize: 24,
		color: '#EEF4ED',
		padding: 20,
		textAlign: 'center',
	},
	contenedorH: {
		marginTop: 10,
		flex: 1,
		flexDirection: 'row',
		width: '92%',
		alignItems: 'center',
		maxHeight: 30,
	},
});

export default App;
