import React, { useState } from 'react';
import {
	Alert,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

/**
 * Los mapas en react se importan a partir d eun componente de tipo
 * MapView que pertenece a la librería react-native-maps
 *
 * MapView utiliza al proveedor de mapas por defecto de cada sistema operativo
 * Android -------> Google Maps
 * iOS -----------> Apple Maps
 * Microsoft -----> Bing Maps
 * Open Source ---> Open Street Maps (FirefoxOS, WebOS)
 *
 * Los mapas de React Native no tienen zoom, peeeeeeeero, tienen un
 * valor denominado delta que calcula el grado de vision con respecto
 * a la curvatura de la tierra en función del plano cartesiano
 *
 * Callout permite genera un infowindo dentro d eun marcador en
 * ReactNativeMaps
 */
import MapView, {
	Marker,
	Callout,
	PROVIDER_GOOGLE,
} from 'react-native-maps';

import { MaterialIcons } from '@expo/vector-icons';

/*
Librerías de ubicación en tiempo real, seguimiento y reverseGeoCode 
(la direccion a partir de una ubicación)
*/
import * as Location from 'expo-location';

import ProgressDialog from './../../components/ProgressDialog';

/*
Arreglo de marcadores 
*/
const marcadores = [
	{
		nombre: 'UTEQ',
		direccion:
			'Av. Patria No. 2501, Unidad Nacional\nC.P. 76148, Querétaro, Qro. México',
		ubicacion: {
			latitud: 20.653041,
			longitude: -100.4039686,
		},
	},
	{
		nombre: 'QuesoKarnes de la Uteq',
		direccion:
			' Av. Pie de la Cuesta 2426, Lomas de San Pedrito\nC.P. 76148,  Santiago de Querétaro, Qro. México',
		ubicacion: {
			latitud: 20.6526291,
			longitude: -100.403691,
		},
	},
	{
		nombre: 'Tacos de canasta DELICIOSOS',
		direccion:
			'Lateral Carretera Federal No. 57, Lomas de Casa Blanca\nC.P. 76080,  Santiago de Querétaro, Qro. México',
		ubicacion: {
			latitud: 20.5756338,
			longitude: -100.3940165,
		},
	},
	{
		nombre: 'Tortas de Derecho',
		direccion:
			'Cerro de las Campanas, Centro Universitario\nC.P. 76010 Santiago de Querétaro, Qro. México',
		ubicacion: {
			latitud: 20.5916359,
			longitude: -100.4073463,
		},
	},
];

const Geoloc = (props) => {
	const [direccionUser, setDireccionUser] = useState(
		'Avenida Marmota, La pradera\nC.P. 76269, El Marqués, Qro. México'
	);
	const [latUser, setLatUser] = useState(20.6470117);
	const [lonUser, setLonUser] = useState(-100.3388087);
	const [mostrarUbic, setMostrarUbic] = useState(false);
	const [mapa, setMapa] = useState(null);
	const [progress, setProgress] = useState(false);

	/**
	 * Función flecha para determinar la ubicación actual
	 */
	const getUbicacion = async () => {
		/*
        Pedir permiso y asegurarnos que nos lo dieron 
        */
		try {
			const {
				status,
			} = await Location.requestPermissionsAsync();

			//Si nos dan permiso
			if (status === 'granted') {
				/*
                Buscamos su ubicación actual
                lo mas cercano posible (lo ultimo registrado)
                */
				const location = await Location.getCurrentPositionAsync(
					{ accuracy: Location.Accuracy.Highest }
				);

				/*
                Conaultamos la direccion del usuario 
                a partir de sus coordenadas

                Al ser asincrono, es una promesa
                */
				Location.reverseGeocodeAsync({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				})
					.then((address) => {
						/*
                        Address siempre es un arreglo
                        que contiene todas las direcciones
                        posibles con las coordenadas indicadas en 
                        el paso anterior, si las coordenadas carecen 
                        de decimales, es muy probable que address contenga
                        mas de una dirección
                        */
						const direccion = address[0];

						console.log(direccion);

						setDireccionUser(
							`${direccion.street}, ${direccion.city}\nC.P. ${direccion.postalCode}, ${direccion.subregion}, ${direccion.region}. ${direccion.country}`
						);

						/*
                Actualizamos las coordenadas de mi marcador 
                con la localización
                */
						setLatUser(
							location.coords.latitude
						);
						setLonUser(
							location.coords.longitude
						);

						//Mostramos el marcador con nuestra ubicación
						setMostrarUbic(true);

						//Movemos el mapa a nuestra posición
						mapa.animateToRegion(
							{
								latitude:
									location.coords
										.latitude,
								longitude:
									location.coords
										.longitude,
								latitudeDelta: 0.02,
								longitudeDelta: 0.02,
							},
							//Milisegundos que tardara el movimiento de la cámara
							5000
						);
					})
					.catch((e) =>
						console.log(e.toString())
					);
			} else {
				Alert.alert(
					'ERROR',
					'Se necesita le permiso de ubicación para continuar'
				);
			}
		} catch (e) {
			console.log(e.toString());
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <ProgressDialog /> */}

			<TouchableOpacity
				onPress={getUbicacion}
				style={{
					flex: 1,
					backgroundColor: '#000',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<MaterialIcons
					name='location-searching'
					size={30}
					color='#fff'
				/>
			</TouchableOpacity>
			<View
				style={{
					flex: 2,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={{ fontSize: 18 }}>
					{direccionUser}
				</Text>
			</View>
			<MapView
				showsUserLocation
				followsUserLocation
				provider={PROVIDER_GOOGLE}
				ref={(map) => setMapa(map)}
				initialRegion={{
					latitude: 20.653041,
					longitude: -100.4039686,
					latitudeDelta: 0.5,
					longitudeDelta: 0.5,
				}}
				style={{ flex: 9 }}
			>
				{marcadores.map((m, index) => (
					<Marker
						key={`marker-${index}`}
						coordinate={{
							latitude: m.ubicacion.latitud,
							longitude:
								m.ubicacion.longitude,
						}}
					>
						<Callout>
							<View style={{ padding: 20 }}>
								<Text
									style={{
										fontSize: 18,
										marginBottom: 15,
									}}
								>
									{m.nombre}
								</Text>
								<Text>{m.direccion}</Text>
							</View>
						</Callout>
					</Marker>
				))}

				{
					/* Creamos un condicional ternario que SOLO
                        se interesa por el SI, por defecto, el NO es nulo
                    */
					mostrarUbic && (
						<Marker
							coordinate={{
								latitude: latUser,
								longitude: lonUser,
							}}
						>
							<Callout>
								<View
									style={{ padding: 20 }}
								>
									<Text
										style={{
											fontSize: 18,
											marginBottom: 15,
										}}
									>
										<MaterialIcons
											name='my-location'
											size={18}
											color='#000'
										/>{' '}
										Mi ubicación
									</Text>
									<Text>
										{direccionUser}
									</Text>
								</View>
							</Callout>
						</Marker>
					)
				}
			</MapView>
		</SafeAreaView>
	);
};

export default Geoloc;
