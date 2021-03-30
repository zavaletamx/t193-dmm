import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, Text, View } from 'react-native';
import Constants from 'expo-constants';

/*
Importamos todos los componentes de la librería Notifications de expo
Aqui se encuentran todos los elementos necesarios para enviar y 
recibir notificaciones push
*/
import * as Notifications from 'expo-notifications';

/*
Configuramos la manera en la que vamos a recibir notificaciones
*/
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true, //Mostrar el cuadro de notificación
		shouldPlaySound: true, //Generar el sonido de la notificación
		shouldSetBadge: true, //Mostrar una alerta visual
	}),
});

const Notificaciones = (props) => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	/*
    Existen diversos tipos de hooks que son funciones que se ejecutan en algún 
    momento particular del ciclo de vida de un componente
    (al iniciarse, al pausarse, al refrescarse y al desmontarse) y se definen 
    como efectos.

    Existe un hook hecho para generar una referencia capaz de modificar su valor, en función
    del ciclo de vida llamado useRef
    */

	/*
    Creamos una referencia dentro de la implementación de un evento para estar
    siempre escuchando las notificaciones recibidas
    */
	const notificationListener = useRef(); //RECIBIR

	/*
    Creamos una referencia dentro de la implementación de un evento para estar
    siempre escuchando las notificaciones enviadas
    */
	const responseListener = useRef(); //ENVIAR

	/*
    Creamos una fn flecha que nos permita preguntar el permisso de notificación 
    y en caso correcto obtener el token del usuario
    */
	const registerForPushNotificationsAsync = async () => {
		//Creamos una variable para guardar el token
		let token;

		//Si el dispositivo es físico (NO ES UN EMULADOR / SIMULADOR)
		if (Constants.isDevice) {
			//Generamos un permiso global en la app
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();

			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				//Pedimos el permiso de notificaciones push
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			//Si no nos dan el permiso de notificaciones
			if (finalStatus !== 'granted') {
				Alert.alert(
					'ERROR',
					'Es necesario el permiso de las notificaciones PUSH'
				);
				return;
			}

			//Generamos el token del usuario
			token = (
				await Notifications.getExpoPushTokenAsync()
			).data;

			console.log(token);
		}

		//Si nos encontramos en un emulador / simulador
		else {
			Alert.alert(
				'ERROR',
				'Las notificaciones solo pueden activarse desde un dispositivo físico'
			);
		}

		/*
        En el caso de Android las notificaciones PUSH están divididas en canales de alcance
        (Listas de envio de notificaciones)

        Indicamos que le canal de distribución para estas noptificaciones será el defecto
        (SOLO APLICA PARA ANDROID)
        */
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync(
				'default',
				{
					name: 'default',
					importance:
						Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231f7c', //En tema lo puede sobreescribir
				}
			);
		}

		return token;
	};

	/*
    Creamos un efecto  que registre este dispositivo 
    y nos retorne el token del usuario */
	useEffect(() => {
		//intentamos obtener un token
		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		// Indicamos que estamos listos para recibir notificaciones push
		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => setNotification(notification)
		);

		/*
        Cuando este componente se destruya, que con el, se destruya tambien el listener
        */
		return () =>
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
	}, []);

	return (
		<View>
			<Text>Notificaciones.js</Text>
			<Text style={{ fontSize: 18 }}>
				{expoPushToken}
			</Text>
		</View>
	);
};

export default Notificaciones;
