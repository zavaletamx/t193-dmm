//Importamos todos los servicios de firebase
/*
1.- firestore
2.- auth
3.- storage
4.- hosting
*/

import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBXvSXG-31GFaW_v7vw3Z-091V8deinVBM',
	authDomain: 'dmm-193.firebaseapp.com',
	projectId: 'dmm-193',
	storageBucket: 'dmm-193.appspot.com',
	messagingSenderId: '394249255427',
	appId: '1:394249255427:web:953f2dd192ce5072e76c36',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/*
Retornar los servicios de firebase 
*/

const db = firebase.firestore();
const auth = firebase.auth();

/* 
Generamos una librería reutilizable
*/
export default {
	db,
	auth,
};
