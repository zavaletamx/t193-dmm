import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

const App = () => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flex: 1,
					borderBottomWidth: 3,
					borderBottomColor: '#000',
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: '#6BF178',
						alignItems: 'center',
						justifyContent: 'space-around',
					}}
				>
					<Text>App en blanco</Text>
					<Text>Raúl Zavaleta</Text>
					<Text>2007313035</Text>
				</View>

				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						backgroundColor: '#FF5964',
					}}
				>
					<View
						style={{
							flex: 1,
							backgroundColor: '#E18335',
						}}
					></View>
					<View
						style={{
							flex: 1,
							backgroundColor: '#8FC93A',
						}}
					></View>
					<View
						style={{
							flex: 1,
							backgroundColor: '#0072bb',
						}}
					></View>
					<View
						style={{
							flex: 1,
							backgroundColor: '#d1e3dd',
						}}
					></View>
				</View>
			</View>

			{/** Segundo bloque de flex */}
			<View
				style={{
					flex: 1,
					backgroundColor: '#35A7FF',
					alignItems: 'center',
					justifyContent: 'space-around',
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
						width: '100%',
					}}
				></View>

				<View
					style={{
						flex: 1,
						backgroundColor: '#FFE74C',
						width: '100%',
					}}
				></View>
			</View>
		</View>
	);
};

export default App;
