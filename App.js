import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
	Button,
	Platform,
	StyleSheet,
	Text,
	View,
} from 'react-native';

//IMPORTAMOS NUESTRO COMPONENTE
import MiComponente, {
	ComponenteAF2,
} from './src/components/MiComponente';

import MiComponenteClass, {
	MiOtraClase,
	OtroComponente,
} from './src/components/MiComponenteClass';

/**
 * Constante para gewnerar espacios
 *
 * Un componente SOLO PUEDE RETORNAR UN ELEMENTO GRAFICO A LA VEZ
 *
 * FORMA 1 [esta no tanto] -> ENGLOBAR TODO EN UN VIEW
 * FORMA 2 [esta si]       -> ENGLOBAR DENTRO DE UN FRAGMENTO
 * <>
 *     _CONTENIDO_
 * </>
 */
export const Espacios = () => {
	return (
		<>
			{/** Englobamos en un fragmento */}
			<View>
				<Text>{'    '}</Text>
			</View>
			<View>
				<Text>{'    '}</Text>
			</View>
			<View>
				<Text>{'    '}</Text>
			</View>
		</>
	);
};

/**
 * Módulo armado con una sección
 */
export default function App() {
	return (
		<View style={styles.container}>
			{/** Todos los componente de React tienen propiedades, incluso, podemos inventar nuestras
			 * propias props
			 * las props puedne ser
			 * prop = 'Texto Plano'
			 * props = {let/const/obj/funcion/clase/af}
			 *
			 * ESTILOS
			 * Todas las reglasd e estilos de CSS PEEEEEEERO
			 * cambiando las convenciones de guion por notación camello
			 * margin-top ============ marginTop
			 * background-color ====== backgroundColor
			 * font-size: ============ fontSize
			 */}
			<Text
				style={{
					fontSize: 30,
					backgroundColor: '#000',
					color: '#fff',
					padding: 20,
					width: '100%',
					/** Si en Android margen inferior de 30 si es iOS nada */
					marginBottom:
						Platform.OS === 'android' ? 30 : 0,
					textAlign: 'center',
				}}
			>
				Hola Mundo
			</Text>
			<Button title='Holap' />

			<Espacios />

			<MiComponente />
			<ComponenteAF2 />

			<Espacios />

			<MiComponenteClass />
			<MiOtraClase />
			<OtroComponente />

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
