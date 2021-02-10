import React, { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Button,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import formStyle from '../styles/styles.forms';
import { AntDesign } from '@expo/vector-icons';

const Login = (props) => {
	/**
	 * Debido al renderizado del VDOM React no es capaz de modificar ninguna
	 * variable dentro de la UI, de ahí que existan los hook (Gancho) que permite
	 * actualizar una versión virtual de una constante por medio d euna función
	 * const [ _VALOR_ , _FN_MODIFICA_ ] = useState(_VALOR_INICIAL_);
	 */
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [btnVisible, setBtnVisible] = useState(true);
	const [aiVisible, setAiVisible] = useState(false);
	const [tiEnabled, setTiEnabled] = useState(true);

	/**
	 * Función que valida el contenido de login (no datos en blanco)
	 * y revisa si el usuario es 4422048329/raul.zavaletazea@uteq.edu.mx
	 * y la contraseña: 808080
	 */
	const validaLogin = () => {
		/**
		 * Invocamos una alerta
		 */

		//USERNAME DE MIN 5 CARACTERES
		if (username.length < 5) {
			Alert.alert('ERROR', 'Username inválido', [
				{
					text: 'Corregir',
					onPress: () => setUsername(''),
				},
			]);

			//Salimos de la función
			return;
		}

		if (password.length !== 6) {
			Alert.alert('ERROR', 'Password inválido', [
				{
					text: 'Corregir',
					onPress: () => setPassword(''),
				},
			]);

			return;
		}

		setBtnVisible(false);
		setAiVisible(true);
		setTiEnabled(false);

		setTimeout(() => {
			setBtnVisible(true);
			setAiVisible(false);
			setTiEnabled(true);
			//Direccionar a Home
			props.navigation.navigate('Home');
		}, 1500);
	};

	const muestraNombre = (nom) => {
		Alert.alert(
			//Titulo
			'Hola',
			//Mensaje
			`Que gusto verte ${nom}`,
			//Arreglo de botones (Android MAX 3, iOS ILIMITADO)
			[
				{
					text: 'B1',
					onPress: null,
				},
				{
					text: 'B2',
					onPress: null,
				},
				{
					text: 'B3',
					onPress: null,
				},
			],
			//Configuración
			{
				cancelable: false,
				onDismiss: () =>
					console.log('Alerta cerrada'),
			}
		);
	};

	return (
		<View style={formStyle.contenedor}>
			<Image
				source={require('./../../assets/images/login.png')}
				style={formStyle.imgLogin}
			/>
			<TextInput
				placeholder='E-mail / Telefono'
				keyboardType='email-address'
				style={formStyle.input}
				maxLength={50}
				autoCapitalize='none'
				autoCorrect={false}
				onChangeText={(val) => setUsername(val)}
				value={username}
				editable={tiEnabled}
			/>

			<TextInput
				placeholder='Contraseña (6 números)'
				keyboardType='number-pad'
				style={formStyle.input}
				maxLength={6}
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry
				onChangeText={(val) => setPassword(val)}
				value={password}
				editable={tiEnabled}
			/>

			<ActivityIndicator
				color='#000'
				size='large'
				style={{
					marginVertical: 15,
					display: aiVisible ? 'flex' : 'none',
				}}
			/>
			<View
				style={{
					display: btnVisible ? 'flex' : 'none',
				}}
			>
				<Button
					title='Iniciar sesión'
					/**
					 * Si la función dentro de la constante no tiene parámetors
					 * se puede invocar sin arrow function, pero si la función
					 * tiene parámetros debes englobarla (encapsularla) dentro de
					 * una arrow function
					 */
					onPress={validaLogin}
				/>
			</View>

			<TouchableOpacity
				style={formStyle.estiloBoton}
				onPress={() => {
					props.navigation.navigate('Registro');
				}}
			>
				<Text style={formStyle.estiloBotonText}>
					<AntDesign size={22} name='adduser' />
					{'  '}
					Registro
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;
