import { useFocusEffect } from '@react-navigation/core';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import Usuario from '../../components/Usuario';

const Catalogo = (props) => {
	//Cambiar el titulo de cada sección (Clase 9 11-feb-21)
	useFocusEffect(() => {
		props.navigation.dangerouslyGetParent().setOptions({
			title: 'Catálogo',
		});
	});

	const arreglo = [
		'Anai',
		'Raul',
		'Liliana',
		'Alfredo',
		'Pedro',
		'Jonathan',
		'Mayi',
		'Victor',
		'Ana',
		'Jorge',
	];

	const usuarios = [
		{
			id: 1,
			first_name: 'Anai',
			last_name: 'Juez Días',
			email: 'anai.jd@gmail.com',
			avatar:
				'https://www.armadilloamarillo.com/wp-content/uploads/mujer-programadora.jpg',
		},
		{
			id: 2,
			first_name: 'Raul',
			last_name: 'Zavaleta Zea',
			email: 'raul@zavaletazea.dev',
			avatar:
				'http://worktrait.com/static/usrcntnt/profilePics/medium/23_7a343384fa.jpg',
		},
		{
			id: 3,
			first_name: 'Liliana',
			last_name: 'Gómez Mont',
			email: 'ligomo@hotmail.com',
			avatar:
				'https://amp.lainformacion.com/files/article_default_content/uploads/imagenes/2017/09/14/59bd7c2f6c1f7.jpeg',
		},
		{
			id: 4,
			first_name: 'Paulina',
			last_name: 'Juez Días',
			email: 'anai.jd@gmail.com',
			avatar:
				'https://www.armadilloamarillo.com/wp-content/uploads/mujer-programadora.jpg',
		},
		{
			id: 5,
			first_name: 'Chayanne',
			last_name: 'Zavaleta Zea',
			email: 'raul@zavaletazea.dev',
			avatar:
				'http://worktrait.com/static/usrcntnt/profilePics/medium/23_7a343384fa.jpg',
		},
		{
			id: 6,
			first_name: 'Oscar',
			last_name: 'Gómez Mont',
			email: 'ligomo@hotmail.com',
			avatar:
				'https://amp.lainformacion.com/files/article_default_content/uploads/imagenes/2017/09/14/59bd7c2f6c1f7.jpeg',
		},
		{
			id: 7,
			first_name: 'Eugenia',
			last_name: 'Juez Días',
			email: 'anai.jd@gmail.com',
			avatar:
				'https://www.armadilloamarillo.com/wp-content/uploads/mujer-programadora.jpg',
		},
		{
			id: 8,
			first_name: 'Miroslava',
			last_name: 'Zavaleta Zea',
			email: 'raul@zavaletazea.dev',
			avatar:
				'http://worktrait.com/static/usrcntnt/profilePics/medium/23_7a343384fa.jpg',
		},
		{
			id: 9,
			first_name: 'Eduardo',
			last_name: 'Gómez Mont',
			email: 'ligomo@hotmail.com',
			avatar:
				'https://amp.lainformacion.com/files/article_default_content/uploads/imagenes/2017/09/14/59bd7c2f6c1f7.jpeg',
		},
	];

	return (
		<View style={{ flex: 1 }}>
			{/**
			 * Para usar un Flatlist necesitas minimo 2 aspectos
			 * 1.- Colección de datos (Arreglo)
			 * 2.- Diseño de cada elemento
			 */}
			<FlatList
				style={{
					marginVertical: 10,
					marginHorizontal: 10,
				}}
				data={usuarios}
				/** Cuando necesitas agregar instrucciones
				 * de programación, usa llaves y la palabra return
				 * dentro de la función flecha
				 */
				// renderItem={(item) => {
				// 	console.log(item.item);
				// 	return <Text>{item.item}</Text>;
				// }}

				/** Si solo se va a retornar un componente dentro
				 * del renderitem es posible no usar llaves  y omitir la palabra
				 * return, envolviendo el componente en parentesis
				 */
				// renderItem={(item) => {
				// 	console.log(item.item);

				// 	return (
				// 		<View
				// 			style={{
				// 				marginVertical: 10,
				// 				backgroundColor: '#fff',
				// 				marginHorizontal: 10,
				// 				padding: 20,
				// 			}}
				// 		>
				// 			<Image
				// 				source={{
				// 					uri: item.item.avatar,
				// 				}}
				// 				style={{
				// 					width: 50,
				// 					height: 50,
				// 				}}
				// 			/>
				// 			<Text>
				// 				{item.item.first_name}
				// 			</Text>
				// 			<Text>
				// 				{item.item.last_name}
				// 			</Text>
				// 			<Text>{item.item.email}</Text>
				// 		</View>
				// 	);
				// }}

				/**
				 * RenderItem soporta la importación de componentes externos
				 * (Forma recomendada de usasr FlatList)
				 */
				renderItem={(item) => (
					<Usuario datosUsuario={item.item} />
				)}
				/**
				 * Los identificador de cada elemento deben ser en formato
				 * String
				 */
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

export default Catalogo;
