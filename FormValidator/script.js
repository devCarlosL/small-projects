const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#password-confirm');

// Exibe os erros de entrada.
const showInputError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form__control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Verifica se o email é válido
const checkEmail = (input) => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(input.value.trim())) {
    showInputSuccess(input);
  } else {
    showInputError(input, 'Email inválido');
  }
}

// Exibe os inputs preenchidos corretamente
const showInputSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form__control success';
};

// Verifica os campos obrigatórios
const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      showInputError(input, `${getFieldName(input)} é obrigatório`)
    } else {
      showInputSuccess(input);
    }
  })
}

//Verifica a quantidade de caracteres nos inputs
const checkInputLength = (input, min, max) => {
  if (input.value.length < min) {
    showInputError(input, `${getFieldName(input)} deve possuir no mínimo ${min} dígitos`);
  } else if (input.value.length > max) {
    showInputError(input, `${getFieldName(input)} deve possuir no máximo ${max} dígitos`);
  } else {
    showInputSuccess(input);
  }
}

// Verifica se as senhas são iguais
const checkPasswordsMatch = (password, cpassword) => {
  if(password.value !== cpassword.value) {
    showInputError(cpassword, 'As senhas não coincidem')
  }
}

// Pega o nome do input
const getFieldName = (input) => {
  const formControl = input.parentElement;
  const label = formControl.querySelector('label');

  return label.innerText;
}

// Faz o envio do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  checkRequired([username, email, password, cpassword]);
  checkInputLength(username, 3, 20);
  checkInputLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, cpassword);
})