import React from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';

const Grafica = (props) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<WebView
				style={{ flex: 1 }}
				source={{
					uri:
						'https://zavaletazea.dev/grafica.php',
				}}
				javaScriptEnabled
			/>
		</SafeAreaView>
	);
};

export default Grafica;
