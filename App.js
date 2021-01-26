import React, { useState } from 'react';
import {
	Button,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';

const App = () => {
	/** Aqui preparamos la programación del componente */

	/**
	 * Los hooks son funciones que se enganchan a un momento
	 * en el ciclo de vida de una screen de React
	 *
	 * Hay diversos tipos de hooks
	 *
	 * Hook de estado
	 * useState()
	 * Permite modificar el contenido de un elemento
	 * (let, const, obj, arr, Comp) en "tiempo real"
	 * permitiendo mostrarlo en la UI
	 *
	 * const [VALOR, FUNCION(setter)] = useState(VALOR_INICIAL);
	 */
	//[sin import] const [contador, setContador] = React.useState(0);
	const [contador, setContador] = useState(0);
	const [btnMas, setBtnMas] = useState(false);
	const [btnMenos, setBtnMenos] = useState(false);
	/** Si el contador es mayor o igual a 10, no incrementar mas */
	/** Si el contador es menor o igual a -5, no decrementar mas */

	/**
	 * Return renderiza la UI, entregando componentes gráficos
	 */
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor:
					contador >= 10 ? '#d9534f' : '#fff',
			}}
		>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/** Onpress utuliza una función anónima
				 * (arrow function)
				 * para realizar el evento seleccionado
				 * VDOM
				 */}
				{/* <Button
					title='+'
					onPress={() => {
						if (contador >= 10) {
							setBtnMas(true);
						} else {
							setContador(contador + 1);
							setBtnMas(false);
						}
					}}
					disabled={btnMas}
				/> */}
				<TouchableHighlight
					onPress={() => {}}
					style={{
						backgroundColor: '#0275d8',
						padding: 40,
						marginTop: 20,
						borderRadius: 10,
					}}
					onPress={() => {
						if (contador >= 10) {
							setBtnMas(true);
						} else {
							setContador(contador + 1);
							setBtnMas(false);
						}
					}}
					disabled={btnMas}
				>
					<Text
						style={{
							color: '#fff',
							fontSize: 70,
						}}
					>
						+
					</Text>
				</TouchableHighlight>
			</View>

			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						fontSize: 120,
						fontWeight: '100',
					}}
				>
					{/** Impresión de variable en RN */}
					{contador}
				</Text>
			</View>

			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* <Button
					title='-'
					onPress={() => {
						if (contador < 9) {
							setBtnMas(false);
						}
						if (contador <= -5) {
							setBtnMenos(true);
						} else {
							setContador(contador - 1);
						}
					}}
					disabled={btnMenos}
				/> */}
			</View>
		</View>
	);
};

export default App;
