const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showInputError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check valid email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showInputError(input, 'Email is not valid');
    }
}

//check required fields
function checkRequired(inputArr){
    let isRequired = false;
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showInputError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        }else{
            showSuccess(input);
        }
    });

    return isRequired;
}

//check input length
function checkLength(input, min, max){
    if(input.value.length <min){
        showInputError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else{
        showSuccess(input);
    }
}

//check password match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showInputError(input2, 'Password do not mach');
    }
}

//getFieldName
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    if(!checkRequired([username, email, password, password2])){
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
        checkPasswordMatch(password, password2);
    }
})
