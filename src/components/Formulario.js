import React from 'react';
import {
	Button,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import formStyle from './../styles/styles.forms';
import { AntDesign } from '@expo/vector-icons';
const Formulario = (props) => {
	return (
		<View style={formStyle.contenedor}>
			<Text
				style={{ fontSize: 16, fontWeight: 'bold' }}
			>
				Fromulario para {props.nombre}
			</Text>

			<TextInput
				placeholder='E-mail / Telefono'
				keyboardType='email-address'
				style={formStyle.input}
			/>

			<TextInput
				placeholder='Contraseña (6 números)'
				keyboardType='number-pad'
				style={formStyle.input}
				maxLength={6}
				secureTextEntry
			/>

			<Button title='Iniciar sesión' />

			<TouchableOpacity
				style={formStyle.estiloBoton}
				onPress={() => {
					props.nav.navigate('Registro');
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

export default Formulario;
