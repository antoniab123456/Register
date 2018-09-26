'use strict';

window.onload = () => {

    const profile_form = document.querySelector('.profile_form'),
        profile_fields = profile_form.elements;

    /* If there is no token forward to the register/login page */
    const token = localStorage.getItem('token');
    if(token === null){
        location.assign('./index.html')
    } else{ 
        /* Send the request to get user information */
        fetch(`http://80.78.255.29/user_info/${token}`)
        .then(res => {
            res.json()
            .then(res => {
                res.fields.forEach(field => {
                    for(const fld of profile_fields){
                        if(fld.name == field.id){
                            if(field.value !== null){
                                fld.value = field.value;
                            }
                        }
                    }

                })
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    const btn_mode = document.querySelector('.btn_mode');
    
    /* Toggling the save/cancel button */
    for(el of profile_fields){
        if(el.name == 'sex' || el.name == 'birthday'){
            el.onchange = () => {
                btn_mode.style.display = 'block';
            }
        } else { 
            el.onkeyup = () => {
                btn_mode.style.display = 'block';
            }
        }
    }

    const cancel_changes = document.querySelector(".cancel_changes"), 
        save_changes = document.querySelector('.save_changes');
        

    cancel_changes.onclick = () => {
        btn_mode.style.display = 'none';
    }
    
    /* Onsave changes click, push changed fields to an array and send a request */
    save_changes.onclick = () => {

        const newArray = [];

        for(field of profile_fields){
            const new_obj =  {
                id: field.name,
                value: field.value
            }

            newArray.push(new_obj);    
        }

        fetch('http://80.78.255.29/user_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                form_id: "user_info",
                token: token,
                fields: newArray
            })
        })
        .then(() => {
            btn_mode.style.display = 'none';
        })
        .catch(err => {
            console.log(err);
        })
    }
}



