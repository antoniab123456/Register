'use strict';

(() => {
    const register_btn = document.querySelector('.register_btn'),
        register_link = document.querySelector('.register_link'),
        registration_form = document.querySelector('.registration_form');

    
    /* Onclick of the reg_link, display the form */
    if(register_link) {
        register_link.onclick = () => {
            let login_link = document.querySelector('.login_link');
            login_link.style.display = 'block';
            

            document.title = 'Register';
            registration_form.style.display = 'block';
            register_link.parentElement.style.display = 'none';
        }
    }

    if(register_btn){
        register_btn.onclick = (e) => {
            
            /* REgular expressions to check form validity */
            const email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
                lower = new RegExp('(.*[a-z].*)'),
                upper = new RegExp('(.*[A-Z].*)'),
                digit = new RegExp('(.*\\d+.*)'),
                pass_length = new RegExp('^.{8,64}$');

            const input_email = document.querySelector('#input_email'),
                input_pass = document.querySelector('#input_pass'),
                input_confirm_pass = document.querySelector('#input_confirm_pass'),
                email_verify_errs = document.querySelector('.email_verify_errs')

            /* Conditions to check before sending the request */
            const conditions = [
                email_regex.test(input_email.value),
                lower.test(input_pass.value),
                upper.test(input_pass.value),
                digit.test(input_pass.value),
                pass_length.test(input_pass.value), 
                input_pass.value.length !== 0,
                input_email.value.length !== 0, 
                input_pass.value == input_confirm_pass.value
            ];
            
             
            if(!conditions.every((cond) => { return cond === true;})){
                return false;
            } else {
                const fetch_loader_wrap = document.querySelector('.fetch_loader_wrap');
                    fetch_loader_wrap.style.display = 'block';

                fetch('http://80.78.255.29/registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: input_email.value,
                        password: input_pass.value
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        if(res.status == 400){ throw 'Something went wrong'};
                        if(res.status == 405){ throw 'The email is already taken'};
                        if(res.status == 200){ 
                            const success_modal  = document.querySelector('.success_modal');
                            fetch_loader_wrap.style.display = 'none';
                            success_modal.style.display = 'block';
                            registration_form.reset();
                        };
                    })
                    .catch(err => {
                        fetch_loader_wrap.style.display = 'none';
                        input_email.style.border = '1px solid #e40808';
                        email_verify_errs.innerText = err;
                    })
                })
                .catch(err => {
                    fetch_loader_wrap.style.display = 'none';
                    input_email.style.border = '1px solid #e40808';
                    email_verify_errs.innerText = err;
                })
            }
            e.preventDefault();
        }
    }
})()

