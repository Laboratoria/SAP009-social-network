
const provider = new firebase.auth.GoogleAuthProvider();  //criar uma instância do provedor

firebase.auth().signInWithPopup(provider) //Metodo de autenticacao atraves da janela dentro do proprio sistema

firebase.auth().signInWithPopup(provider).then(result => {  //Tratamento da resposta do login atraves da pop-up:
  const token = result.credential.accessToken;
  const user = result.user;
}).catch(error => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = error.credential;
});