const criarCadastro = container.querySelector('#btnCreateUser');
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
});

