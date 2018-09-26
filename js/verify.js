'use strict';

(() => {
    const input_email  = document.querySelector('#input_email'),
        input_email_login = document.querySelector('#input_email_login'),
        input_pass = document.querySelector('#input_pass'),
        input_pass_login = document.querySelector('#input_pass_login'),
        input_confirm_pass = document.querySelector('#input_confirm_pass');
    
    /* The function to check email entered */
    const checkEmail = (input, error) => {
        let val = input.value;
        if(val.length !== 0){
            let email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(!email_regex.test(val)){
                error.innerText = 'Username format should be xxxxxx@server.name'
                input.style.border = '1px solid rgb(206, 29, 29)';
            } else {
                if(val.length >= 64){
                    error.innerText = 'Username should be less than 64 symbols';
                } else{ 
                    error.innerText = '';
                    input.style.border = '';
                }
            }
        } else{ 
            error.innerText = '';
            input.style.border = '';
        }

    }

    /* Check entered email onkeyup */
    input_email.onkeyup = (e) => {
        const email_verify_errs = document.querySelector('.email_verify_errs');
        checkEmail(e.target, email_verify_errs);
    }

    input_email_login.onkeyup = (e) => {
        const email_verify_errs_login = document.querySelector('.email_verify_errs_login');
        checkEmail(e.target, email_verify_errs_login);
    }

    /* Confirm password function */
    let confirmPassword = () => {
        const val = input_confirm_pass.value,
        pass_confirm_verify_errs = document.querySelector('.pass_confirm_verify_errs');
        if(val.length > 0){
            if(val !== input_pass.value){
                pass_confirm_verify_errs.style.color = '#e40808';
                pass_confirm_verify_errs.innerText = 'Passwords are not equal';
                input_confirm_pass.style.border = '1px solid #e40808';
            } else {
                pass_confirm_verify_errs.style.color = '#24c24b';
                pass_confirm_verify_errs.innerText = 'Passwords are equal';
                input_confirm_pass.style.border = '1px solid #24c24b';
            }
        } else {
            pass_confirm_verify_errs.innerText = '';
            input_confirm_pass.style.border = '';
        }

    }


    if(input_confirm_pass){
        input_confirm_pass.onkeyup = () => {
            confirmPassword();
        }
    }
    
    /* Check password function */
    const checkPass = (input, error) => {
        const val = input.value;
        if(val.length !== 0) {
            let pass_length = new RegExp('^.{8,64}$');
            if(!pass_length.test(val)){
                error.innerText = 'Password should 8 - 64 symbols'
                input.style.border = '1px solid #e40808';
            } else {
                const lower = new RegExp('(.*[a-z].*)'),
                    upper = new RegExp('(.*[A-Z].*)'),
                    digit = new RegExp('(.*\\d+.*)');

                if(!(lower.test(val) && upper.test(val) && digit.test(val))) {
                    error.style.color = '#e40808'
                    error.innerText = 'Password should have a digit, lower and upper case letter';
                } else {
                    error.style.color = '#24c24b'
                    error.innerText = 'The password is secure';
                    input.style.border = '1px solid #24c24b';    
                }
                
            }
        } else{
            error.innerText = ''
            input.style.border = '';
        }   
    }

    /*  Validate the passwords entered and test for security*/
    input_pass.onkeyup = (e) => {
        const pass_verify_errs = document.querySelector(".pass_verify_errs");
        checkPass(e.target, pass_verify_errs)
        confirmPassword();
    }

    input_pass_login.onkeyup = (e) => {
        const pass_verify_errs_login = document.querySelector(".pass_verify_errs_login");
        checkPass(e.target, pass_verify_errs_login)
    }
    
})();