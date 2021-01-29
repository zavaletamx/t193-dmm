import React from 'react';
import { Text, View } from 'react-native';
import Formulario from '../components/Formulario';

const Login = (props) => {
	console.log(props);
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{/**
			 * Es posible agregar N cantidad de props
			 * a cada elemento, solo es necesario
			 * indicar:
			 * 1.- _NOMBRE_PROP_ = _VALOR_PROP_
			 *  */}
			<Formulario
				nombre='Login'
				nav={props.navigation}
			/>
		</View>
	);
};

export default Login;
