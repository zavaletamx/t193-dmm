import react from 'react';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	contenedor: {
		flex: 1,
		marginVertical: 20,
		width: '100%',
		paddingHorizontal: 20,
	},
	input: {
		width: '100%',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderColor: '#585858',
		borderWidth: 1,
		marginVertical: 5,
		fontSize: 16,
		borderRadius: 5,
	},
	estiloBoton: {
		marginTop: 50,
		width: '100%',
		paddingHorizontal: 30,
		paddingVertical: 30,
		backgroundColor: '#585858',
		shadowColor: '#000',
		shadowOpacity: 0.8,
		borderRadius: 5,
		shadowRadius: 5,
		shadowOffset: {
			height: 1,
			width: 1,
		},
		elevation: 5,
	},
	estiloBotonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
});
