import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
} from 'react-native';

//IMPORTAMOS NUESTRO COMPONENTE
import MiComponente from './src/components/MiComponente';

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Hola Mundo</Text>
			<Button title='Holap' />
			<MiComponente />
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
