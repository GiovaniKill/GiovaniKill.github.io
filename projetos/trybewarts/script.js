const email = document.getElementById('email');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const submitButton = document.getElementById('submit-btn');
const textarea = document.getElementById('textarea');
const counter = document.getElementById('counter');
const form = document.getElementById('evaluation-form');
const agreement = document.getElementById('agreement');

// Verifica o input email e password
function verifyCredencials(event) {
  event.preventDefault();
  if (email.value === 'tryber@teste.com' && password.value === '123456') {
    alert('Olá, Tryber!');
    return;
  }
  alert('Email ou senha inválidos.');
}

loginButton.addEventListener('click', verifyCredencials);

// Verifica se a checkbox agreement está selecionada
document.getElementById('submit-btn').disabled = true;

function isAgreementChecked() {
  if (agreement.checked === true) {
    return true;
  }
  return false;
}

function enableButton() {
  if (isAgreementChecked() === true) {
    submitButton.disabled = false;
  }
}

document.body.addEventListener('click', enableButton);

// Contador
function contador() {
  const limite = 500;
  const qtdcaracteres = this.value.length;
  const restantes = limite - qtdcaracteres;
  if (restantes < 1) {
    this.value = this.value.slice(0, limite);
    counter.innerHTML = 0;
    return;
  }
  counter.innerHTML = restantes;
}

textarea.addEventListener('keyup', contador);

// Todas as funções abaixo auxiliam a última função, que substitui os elementos do form por textos com o input do usuário

// Criei o formulário para ser adicionado após excluir o antigo
const newForm = document.createElement('div');
newForm.classList.add('new-form');

function replaceName() {
  const inputName = document.getElementById('input-name');
  const inputLastName = document.getElementById('input-lastname');
  const choosenName = document.createElement('p');
  choosenName.innerText = `Nome: ${inputName.value} ${inputLastName.value}`;
  newForm.appendChild(choosenName);
}

function replaceEmail() {
  const inputEmail = document.getElementById('input-email');
  const choosenEmail = document.createElement('p');
  choosenEmail.innerText = `Email: ${inputEmail.value}`;
  newForm.appendChild(choosenEmail);
}

function replaceHouse() {
  const inputHouse = document.getElementById('house');
  const choosenHouse = document.createElement('p');

  // Peguei a seleção do select em https://ricardometring.com
  choosenHouse.innerText = `Casa: ${inputHouse.options[inputHouse.selectedIndex].value}`;
  newForm.appendChild(choosenHouse);
}

function replaceFamily() {
  const inputFamily = document.getElementById('family');
  const choosenFamily = document.createElement('p');

  let familyValue;
  for (let index = 0; index < inputFamily.children.length; index += 1) {
    if (inputFamily.children[index].checked === true) {
      familyValue = inputFamily.children[index].value;
      break;
    }
  }
  choosenFamily.innerText = `Família: ${familyValue}`;
  newForm.appendChild(choosenFamily);
}

function replaceSubject() {
  const inputSubject = document.getElementById('subjects');
  const choosenSubject = document.createElement('p');

  // Tive que fazer esse código redundante abaixo pois o lint estava acusando que eu poderia usar const já que subject value não estava sendo alterado, mas ele está dentro do for
  let subjectValue = [2];
  subjectValue = [];
  for (let index = 0; index < inputSubject.children.length; index += 1) {
    if (inputSubject.children[index].checked === true) {
      subjectValue.push(inputSubject.children[index].value);
    }
  }

  choosenSubject.innerText = `Matérias: ${subjectValue.join(', ')}`;
  newForm.appendChild(choosenSubject);
}

function replaceRate() {
  const inputRate = document.getElementById('rate-buttons');
  const choosenRate = document.createElement('p');

  let rateValue;
  for (let index = 0; index < inputRate.children.length; index += 1) {
    if (inputRate.children[index].checked === true) {
      rateValue = inputRate.children[index].value;
      break;
    }
  }

  choosenRate.innerText = `Avaliação: ${rateValue}`;
  newForm.appendChild(choosenRate);
}

function replaceText() {
  const inputText = document.getElementById('textarea');
  const choosenText = document.createElement('p');

  choosenText.innerText = `Observações: ${inputText.value}`;
  newForm.appendChild(choosenText);
}

// Substitui o conteúdo do form
function replaceForm(event) {
  event.preventDefault();
  replaceName();
  replaceEmail();
  replaceHouse();
  replaceFamily();
  replaceSubject();
  replaceRate();
  replaceText();

  form.innerHTML = '';
  form.appendChild(newForm);
}

submitButton.addEventListener('click', replaceForm);
