import React from 'react';
import { Text, View } from 'react-native';

const Registro = (props) => {
	return (
		<View
			style={{
				flex: 1,
				padding: 20,
			}}
		>
			<Text>Registro</Text>
			<Text> </Text>

			<Text>Nombre</Text>
			<Text>Apellido 1</Text>
			<Text>Apellido 1</Text>
			<Text>Fecha de nacimiento</Text>
			<Text>Teléfono</Text>
			<Text>Email</Text>
			<Text>Pin (6 dígitos)</Text>
			<Text>Aceptar términos (Switch)</Text>
			<Text>Registrarse (Btn)</Text>
			<Text>Ir al Login (Btn)</Text>
		</View>
	);
};

export default Registro;
