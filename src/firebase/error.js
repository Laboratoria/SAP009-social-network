export function errorLogin (error) {
    switch (error) {
        case 'auth/invalid-email':
            return 'O e-mail inserido é inválido';
        case 'auth/user-not-found':
            return 'O e-mail inserido não está cadastrado';
        case 'auth/email-already-in-use':
            return 'O e-mail inserido já possui cadastro';
        case 'auth/weak-password':
            return 'A senha deve ter 6 ou mais caracteres';
        case 'auth/invalid-password':
            return 'Senha Inválida';
        case 'auth/wrong-password':
            return 'Senha Incorreta';
        default: 
            return '';
    }
}