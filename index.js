M.AutoInit();
const notesList = document.querySelector('.notes');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const newNoticeForm = document.querySelector('#new-notice-form');
const accountDetails = document.querySelector('.account-details');
const adminElems = document.querySelectorAll('.admin-logged-in');
const acname = document.querySelector('.acname');
const acemail = document.querySelector('.acemail');
let curUser = undefined;

const UI = (userID) => {
    if (userID) {
        if (userID.admin){
            console.log(userID.admin);
            adminElems.forEach((elem) => {
                elem.style.display = 'block';
            })
        }
        loggedInLinks.forEach((link) => {
            link.style.display = 'block';
        })
        loggedOutLinks.forEach((link) => {
            link.style.display = 'none';
        })
        db.collection('users').doc(userID.uid).get().then((doc) => {
            curUser = doc.data().name;
            // accountDetails.innerHTML = `<h3>Logged in as:</h3></br>
            //                             <h4>Name: ${doc.data().name}</br>
            //                             Email: ${userID.email}</br>
            //                             About: ${doc.data().bio}`;
            accountDetails.innerHTML = ` <div class="row">
            <div class="col s12">
              <div class="card">
                <div class="card-content">
                <span class="card-title">Name: ${doc.data().name}</span>
                  <p>Email: ${userID.email}</p>
                  <p>About: ${doc.data().bio}</p>
                </div>
                <div class="card-action">
                <a href="#" class="" id="logout">Logout</a>
                </div>
              </div>
            </div>
          </div>`;
            acname.textContent = doc.data().name;
            acemail.textContent = userID.email;
            console.log(acname.textContent);
        })
    }
    else {
            adminElems.forEach((elem) => {
                elem.style.display = 'none';
            })
        loggedInLinks.forEach((link) => {
            link.style.display = 'none';
        })
        loggedOutLinks.forEach((link) => {
            link.style.display = 'block';
        })
    }
}


const displayNotes = (notes) => {

    if (notes.length) {
        let cardsHtml = '';
        notesList.innerHTML += cardsHtml;
        notes.forEach(doc => {
            const notesContent = doc.data();
            const noteCard = `
            <div class="col s12 m6">
                <div class="card hoverable indigo lighten-1">
                    <div class="card-content white-text">
                        <span class="card-title activator">${notesContent.Title}</span>
                        <hr>
                        <p class="truncate">${notesContent.TextContent}</p>
                        <p>By: ${notesContent.By}</p>
                    </div>
                    <!-- <div class="card-action">
                        <a href="#">This is a link</a>
                        <a href="#">This is a link</a>
                    </div> -->
                    <!--
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                        <p>Here is some ajdoijs sakdj ofsjoij oijf o osiajdf  j sfj aoijfoisjefse jaskjdfh 
                        ihsdfsfyfytdt   more information about this product that is only revealed once clicked on.</p>
                    </div>
                    -->
                </div>
            </div>`;
            cardsHtml += noteCard;
        });

        notesList.innerHTML = cardsHtml;
    }

    else {
        notesList.innerHTML = `<blockquote> <h4>
        This is an example quotation that uses the blockquote tag.<h4>
        </blockquote>
        `;
    }


}

const txt = document.querySelector(".notes");
txt.addEventListener('click', (e) => {
    if (e.target.tagName == 'P') {
        e.stopPropagation();
        e.target.classList.toggle('truncate')
    }
});

newNoticeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Notes').add({
        Title: newNoticeForm['title'].value,
        TextContent: newNoticeForm['content'].value,
        By: curUser
    }).then(()=>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        newNoticeForm.reset();
        console.log('ADDED!')
    }).catch((error)=>{
        console.log(error.message);
    })
})



    // Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita illo ipsam, nostrum mollitia fugiat porro laboriosam vitae nisi asperiores molestias, obcaecati velit minima perspiciatis laudantium vel eligendi error! Adipisci, voluptatibus!

