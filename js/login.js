'use strict';

(() => {
    const login_btn = document.querySelectorAll('.login_btn'),
        login_btn_send = document.querySelector('.login_btn_send'),
        login_form = document.querySelector(".login_form"),
        input_email_login = document.querySelector('#input_email_login'),
        input_pass_login = document.querySelector('#input_pass_login')
    
    /* Display the login form */
    if(login_btn){
        for(let btn of login_btn){
            btn.onclick = () => {
                const registration_form = document.querySelector('.registration_form'),
                    success_modal = document.querySelector('.success_modal');

                if(registration_form){ registration_form.style.display = 'none'; }
                if(success_modal){ success_modal.style.display = 'none'; }
                
                document.title = 'Login';
                login_form.style.display = 'block';
                btn.style.display = 'none';
            }

        }
    }
    
    /* Send login request */
    if(login_btn_send){ 
        login_btn_send.onclick = () => {
        const email_regex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            lower = new RegExp('(.*[a-z].*)'),
            upper = new RegExp('(.*[A-Z].*)'),
            digit = new RegExp('(.*\\d+.*)'),
            pass_length = new RegExp('^.{8,64}$');

            const conditions = [
                email_regex.test(input_email_login.value),
                lower.test(input_pass_login.value),
                upper.test(input_pass_login.value),
                digit.test(input_pass_login.value),
                pass_length.test(input_pass_login.value), 
                input_pass_login.value.length !== 0,
                input_email_login.value.length !== 0
            ];
            
             
            if(!conditions.every((cond) => { return cond === true;})){
                return;
            } else{
                let fetch_loader_wrap = document.querySelector('.fetch_loader_wrap'),
                    email_verify_errs_login = document.querySelector('.email_verify_errs_login');

                fetch_loader_wrap.style.display = 'block';

                fetch('http://80.78.255.29/login_rest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: input_email_login.value,
                        password: input_pass_login.value
                    })
                })
                .then(res => {
                    res.json()
                    .then(res => {
                        if(res.status == 400){ throw 'Something went wrong'};
                        if(res.status == 401){ throw 'Incorrect credentials'};
                        if(res.status == 200){ 
                            /* Save token in LS, because it's not possible to set cookies without a server */
                            localStorage.setItem('token', res.token);
                            location.assign('./profile.html');
                        };
                    })
                    .catch(err => {
                        fetch_loader_wrap.style.display = 'none';
                        email_verify_errs_login.innerText = err;
                    })
                })
                .catch(err => {
                    fetch_loader_wrap.style.display = 'none';
                    email_verify_errs_login.innerText = err;
                })
            }

        }
    }
})();