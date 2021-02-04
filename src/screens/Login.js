import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import Formulario from '../components/Formulario';

const Login = (props) => {
	/**
	 * Debido al renderizado del VDOM React no es capaz de modificar ninguna
	 * variable dentro de la UI, de ahí que existan los hook (Gancho) que permite
	 * actualizar una versión virtual de una constante por medio d euna función
	 * const [ _VALOR_ , _FN_MODIFICA_ ] = useState(_VALOR_INICIAL_);
	 */
	const [suma, setSuma] = useState(-50);
	const [peliculas, setPeliculas] = useState([{}]);

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

			<Text
				style={{
					fontSize: 120,
					fontWeight: '100',
					textAlign: 'center',
					marginVertical: 40,
				}}
			>
				{suma}
			</Text>

			<Button
				title='Agregar'
				onPress={() => {
					/**
					 * Dado que los estados son constantes, no podemos modificar
					 * directamente su valor, para ello, utilizamos su función  de
					 * modificación
					 */
					setSuma(suma + 1);
				}}
			/>

			<View style={{ marginBottom: 100 }}>
				<Text />
			</View>
		</View>
	);
};

export default Login;
