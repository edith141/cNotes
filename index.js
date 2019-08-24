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
curUserEmail = undefined;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const copy = (copyText) => {
//   copyText.select();

var textArea = document.createElement("textarea");
  textArea.value = copyText;
  textArea.style.visibility = 'none';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.setSelectionRange(0, 99999);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  console.log(String(copyText));
//   M.toast({html: 'I am a toast!'})
  M.toast({html: 'Copied!'})
}

const UI = (userID) => {
    
    if (userID) {
        curUserEmail = userID.email;
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
                <div class="card-content grey lighten-2">
                <span class="card-title">Name: ${doc.data().name}</span>
                  <p>Email: ${userID.email}</p>
                  <p>About: ${doc.data().bio}</p>
                </div>
                <div class="card-action grey lighten-3">
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
                <div class="card hoverable cardcolor grey lighten-4">
                    <div class="card-content">
                        <span class="card-title">${notesContent.Title}</span>
                        <hr>
                        <p class="truncate">${notesContent.TextContent}</p>
                        
                    </div>
                    <div class="card-action grey lighten-3 activator">
                        <a class="indigo-text text-lighten-2 waves-effect waves-light activator"><i class="material-icons right">info</i>Info</a>
                    </div>
                    
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${notesContent.Title}<i class="material-icons right">close</i></span>
                        <p>By: ${notesContent.By}</p>
                    <p>On: ${notesContent.Timeofnote.toDate().toLocaleDateString("en-US", options)}</p>
                    <div class="center-align">
                        <div class="left">
                        <a class="waves-effect waves-light btn-small red lighten-1" 
                            href="mailto:${curUserEmail}?subject=Replying%20for%20memo:%20${notesContent.Title}
                            &body=Memo%20Body:%20${notesContent.TextContent}
                            %0APublished%20at:%20${notesContent.Timeofnote.toDate().toLocaleDateString("en-US", options)}
                            %0A*******TYPE YOUR REPLY BELOW THIS LINE*******%0A%0A">
                        <i class="material-icons right">email</i>reply</a></div>
                        <div class="right"><a class="waves-effect waves-light btn-small" onclick="copy('${notesContent.TextContent}')"><i class="material-icons right">file_copy</i>copy</a></div>
                    </div>
                    </div>  
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
        By: curUser,
        Timeofnote: firebase.firestore.Timestamp.now()
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

