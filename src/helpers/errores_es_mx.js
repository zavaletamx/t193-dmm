export default function getError(tipo) {
	switch (tipo) {
		case 'auth/user-not-found':
			return 'Usuario incorrecto';
		case 'auth/wrong-password':
			return 'Contraseña incorrecta';
		case 'auth/user-disabled':
			return 'Cuenta deshabilitada, por favor contacta al adminsitrador';
		case 'auth/email-already-in-use':
			return 'Correo electrónico no disponible';
	}
}
