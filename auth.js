const signUpForm = document.querySelector('#signup-form');
const logoutBtn = document.querySelectorAll('#logout');
const loginForm = document.querySelector('#login-form');
const adminForm = document.querySelector('.admin-actions');


adminForm.addEventListener('submit', (et)=> {
    et.preventDefault();
    const adminEmail = adminForm['admin-email'].value;
    const makeAdmin = functions.httpsCallable('addAdminRole');
    console.log(adminEmail);
    makeAdmin({email: adminEmail}).then((result) => {
        console.log(result);
    });
});



auth.onAuthStateChanged((user) => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            UI(user);
        })
        console.log(user);
       
        db.collection('Notes').onSnapshot((snapshot) => {
            displayNotes(snapshot.docs);
        })
    }
    else {
        UI(user);
        displayNotes([]);
    }
});


signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        console.log('Signed Up!', cred);
        db.collection('users').doc(cred.user.uid).set({
            bio: signUpForm['signup-bio'].value,
            name: signUpForm['signup-name'].value
        }).then(() => {
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
        }).catch((err) => { console.log(err.message) });
    }).catch((err) => { console.log(err.message) });
})


logoutBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('logged out!');
            location.reload();
        })
    });
});
// logoutBtn.addEventListener('click', ()=>{console.log(logoutBtn);})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    email = loginForm['login-email'].value;
    password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
});