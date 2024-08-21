//Ocultar el botón de 'copiar' (hasta que se accione la función de cifrado/descifrado y mostrar el mensaje en pantalla)
document.getElementById('copy').style.display = 'none'

navigator.permissions.query({name: 'clipboard-write'}).then((result) => {
    if (result.state === 'granted' || result.state === 'prompt') {
        /*write to the clipboard now*/
    }
});

//Esta funcioón permite alterar y expandir de forma dinámica la ventanba donde aparecerá el mensaje cifrado/descifrado. Altera las variables 'width' y 'height' en el CSS de las versiónes mobile para adaptar el recuadro de mensaje acorde a las dimensiónes de la pantalla del dispositivo
function adjustMessageDimensions() {
    let resultShowed = document.querySelector('.ciphered__message');
    let moveCopyButton = document.querySelector('.copy__button');
    if (window.innerWidth <= 435) {
        resultShowed.style.height = '320px';
        resultShowed.style.width = '327px';
    } else if (window.innerWidth <= 1025) {
        resultShowed.style.height = '330px';
        resultShowed.style.width = '688px';
        moveCopyButton.style.marginTop = '280px';
    } else {
        resultShowed.style.height = '750px';
        resultShowed.style.width = '335px';
    }
}

//La función que permite cambiar cada vocal o caracter según las especificaciones del Challenge Encriptador de texto de Alura
function cipher() {
    let resulText = '';
    let textToCipher = document.getElementById('textImput').value;
    for (let i = 0; i < textToCipher.length; i++) {
        switch (textToCipher[i]) {
            case 'e':
                resulText += 'enter';
                break;
            case 'i':
                resulText += 'imes';
                break;
            case 'a':
                resulText += 'ai';
                break;
            case 'o':
                resulText += 'ober';
                break;
            case 'u':
                resulText += 'ufat';
                break;
            default:
                resulText += textToCipher[i];
        }
    }
    console.log(resulText);
    return resulText;
}

//La función que permite descifrar el mensaje cifrado anteriormente de acuerdo a la función programada según las especificaciones del Challenge Ecnriptador de texto de Alura
function decipher() {
    let resulText = '';
    let textToDecipher = document.getElementById('textImput').value;
    for (let i = 0; i < textToDecipher.length; i++) {
        if (textToDecipher.startsWith('enter', i)) {
            resulText += 'e'
            i += 4; //Saltar los siguientes 4 caracteres ('enter')
        } else if (textToDecipher.startsWith('imes', i)) {
            resulText += 'i';
            i += 3; //Saltar los siguientes 3 carcateres ('imes')
        } else if (textToDecipher.startsWith('ai', i)) {
            resulText += 'a';
            i += 1; //Saltar los siguientes 2 carcateres ('ai')
        } else if (textToDecipher.startsWith('ober', i)) {
            resulText += 'o';
            i += 3; //Saltar los siguientes 4 carcateres ('ober')
        } else if (textToDecipher.startsWith('ufat', i)) {
            resulText += 'u';
            i += 3; //Saltar los siguientes 4 carcateres ('ufat')
        } else {
            resulText += textToDecipher[i];
        }
    }
    console.log(resulText);
    return resulText;
}

//La función que nos permite mostar el mensaje en pantalla luego de pasar el texto por la función de cifrado cipher()
function showEncryptedText() {
    let content = document.getElementById('textImput').value;
    let encryptedText = cipher(content)
    document.getElementById('result').innerHTML = encryptedText;
    let rmImage = document.querySelector('.ciphered__message');
    rmImage.style.backgroundImage = 'none';
    document.getElementById('copy').removeAttribute('disabled');
    document.getElementById('copy').style.display = 'block';
    adjustMessageDimensions();
    return;
}
document.getElementById('showResult').addEventListener('click', cipher); //Acciona la función de cifrado de texto al hacer click al botón 'Encriptar'

//La función que nos permite mostar el mensaje en pantalla luego de pasar el texto por la función de cifrado decipher()
function showDecryptedText() {
    let content = document.getElementById('textImput').value;
    let decryptedText = decipher(content)
    document.getElementById('result').innerHTML = decryptedText;
    let rmImage = document.querySelector('.ciphered__message');
    rmImage.style.backgroundImage = 'none';
    document.getElementById('copy').removeAttribute('disabled');
    document.getElementById('copy').style.display = 'block';
    return;
}
document.getElementById('showDecryptedResult').addEventListener('click', decipher); //Acciona la función de descifrado de texto al hacer click al botón 'Desencriptar'

//La función que nos permite copiar un texto mostrado en pantalla en un area determinada (El mensaje cifrado/descifrado para este caso)
function copyText() {
    let textToCopy = document.getElementById('result').value;
    navigator.clipboard.writeText(textToCopy).then(
        () => {
            /*portapapeles activo: contenido copiado*/
            console.log('se copió')
        },
        () => {
            /*portapaples inactivo: contenido sin copiar*/
            console.log('error al copiar')
        },
    );
}