/*const criarCadastro = container.querySelector('#btnCreateUser');
criarCadastro.addEventListener('click', (e) => {
  e.preventDefault();
  const email = container.querySelector('#txtEmail').value;
  const senha = container.querySelector('#txtPassword').value;
  const nome = container.querySelector('#txtName').value;
  if (!nome || !email || !senha) {
    const mensagem = container.querySelector('#txtError');
    mensagem.innerHTML = 'Preencha os campos corretamente.';
  }

  createUser(email, senha, nome)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      userData(nome, email, uid);
      alert('Cadastro realizado com sucesso!');
      window.location.hash = '#login';
    });
});*/
function()
  const buttonEnter = loginContainer.querySelector('#enter-button'); //elementos do DOM cadastro login logout login google
  const buttonGoogle = loginContainer.querySelector('#image-google');
  const signUp = loginContainer.querySelector('#register');
  const logout = loginContainer.querySelector('#logout');
  const inputEmail = loginContainer.querySelector('#email');
  const inputPassword = loginContainer.querySelector('#password');
  const errorMessage = loginContainer.querySelector('#error');

  buttonRegister.onsubmit = event => {
  const inputEmail = registerContainer.querySelector('#register-email').value;
  const inputPassword = registerContainer.querySelector('#register-password').value;
  export const createUser = (email, password) => => createUserWithEmailAndPassword(auth, email, password).then(() => {
  alert('usuario cadastrado')
}).catch((error) => {
  console.log('erroooooooooor');
});
};

  export const  
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  }
}




  buttonEnter.addEventListener('click', (event) => {
    event.preventDefault();
    const validateLogin = validationLogin(inputEmail.value, inputPassword.value);
    if (validateLogin === '') {
      userLogin(inputEmail.value, inputPassword.value)
        .then(() => {
          window.location.hash = '#feed';
        })
        .catch((error) => {
          errorMessage.innerHTML = errorMessages(error);
        });
    } else {
      errorMessage.innerHTML = validateLogin;
    }
  });

  buttonGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    googleLogin()
      .then(() => {
        window.location.hash = '#feed';
      })
      .catch((error) => error);
  });

  signUp.addEventListener('click', () => {
    window.location.hash = '#register';
  });

  return loginContainer;
};

