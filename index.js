const { initializeApp, } = require('firebase/app')
const { getDatabase, ref, set } = require('firebase/database')



const qrcode = require('qrcode-terminal');


const { Client, LocalAuth, NoAuth } = require('whatsapp-web.js');



var A1Grp, session;



// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAyB_qLzn3D8W1M1mEPKNhmDMr-hGlj8Dw",
  authDomain: "whatsapp-bot-5fe3b.firebaseapp.com",
  projectId: "whatsapp-bot-5fe3b",
  databaseURL: "https://whatsapp-bot-5fe3b-default-rtdb.firebaseio.com",
  storageBucket: "whatsapp-bot-5fe3b.appspot.com",
  messagingSenderId: "1072347540890",
  appId: "1:1072347540890:web:38c9c6429e8024589fde23"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();


const mainID_Motion = new Client({
  authStrategy: new LocalAuth({ // saved session object
    clientId: "main-id"
  })
  //authStrategy: new LocalAuth({  clientId: "mainID_Motion-one" })
});

const admin_id = new Client({
  authStrategy: new LocalAuth({ clientId: "admin-id" })
});









admin_id.on('qr', (qr) => {
  console.log('QR RECEIVED For ADMIN ID', qr);
  qrcode.generate(qr, { small: true });
});

admin_id.on('ready', () => {
  console.log('Admin is ready!');

  admin_id.sendMessage('120363039577912932@g.us', "Admin is Ready")


  //Authenticate();


});

admin_id.on('message', (message) => {

  var times = 50;

  if (message.body == '.Auth') {
    // Authenticate();
  } else if (message.body == '.getAC') {
    getchat();
    console.LOG("Getting All Chats")
    console.log("━━╬٨ـﮩﮩ❤٨ـﮩﮩـ╬━❤️❥❥═══ 🅻🅾🅰🅳🅸🅽🅶😦 ══━━╬٨ـﮩﮩ❤٨ـﮩﮩـ╬━")
  } else if (message.body == '.sL') {
    startLeaching();
  }else if(message.body =='.bombKunal'){
    //console.log(parseInt(message.split(',')[1]))
    console.log("Hlo")
    console.log(message.body.includes('.bombKunal'))

    for(const i=0 ;i < times; i++){
      admin_id.sendMessage('918949591349@c.us',".hleo")

    }

  }
  
  if(message.body.includes('.bombKunal')){
    //console.log(parseInt(message.split(',')[1]))
    console.log("OK")

    // for(const i=0 ;i < times; i++){
    //   admin_id.sendMessage('918949591349@c.us',"Hii")

    // }

  }else{

  
}
console.log(message.body.includes('.bombKunal'))
}

)











mainID_Motion.on('qr', (qr) => {
  console.log('QR RECEIVED for Main ID', qr);
  qrcode.generate(qr, { small: true });
});






mainID_Motion.on('ready', () => {
  console.log('Client is ready!');


  mainID_Motion.sendMessage('120363039577912932@g.us', 'Me izz ready!')
  // Authenticate();

});






async function getchat() {
  let chats = await mainID_Motion.getChats();
  console.log("Got All Chats Serching For A1")
  LOGG('mainID', "Got All Chats Serching For A1");

  for (const chat of chats) {

    //   //console.log(Object.keys(chat))
    console.log([chat.id, chat.name])
    if (chat.name === 'P23(Early Enthuse) 22 Nov') {

      console.log("Chat Id Setteled to " + chat.name)
      LOGG('mainID', "Chat Id Setteled to " + chat.name)
      A1Grp = chat

      break;


    }

    // }
  }

  //const DeltaGrpChat = await chats[1].fetchMessages({limit : 5});


  //  console.log("getting Chat from chat id") 
  // chats[1].fetchMessages().then(messages => {
  //   console.log("got chats")
  //   
  //  console.log(messages)
  // });

}
async function startLeaching() {

  console.log("Getting All The Messages")
  const messages = await A1Grp.fetchMessages({limit:50});
    console.log("Got All Messages")
    
    console.log(messages)
    UploadToFirebase(messages);

}

// async function GetMainIDSession(){

//   onValue(ref(db, 'Secret/mainId62014/'), (Session) => {

//     if(Session.exists()){
//     session = Session.session
//     Authenticate()
//   }else{
//     session = {}
//   }


//     // ...
//   }, {
//     onlyOnce: true
//   });


// }





function UploadToFirebase(messages) {

  LOGG('mainID', 'Updating To Firebase.....')

  //console.log(messages)

  for (let message of messages) {

    if (typeof message.links[0] != "undefined") {

      if (message.body.includes("zoom.us/rec/share")) {
        console.log(message)
        let teacher;
        // if(message.body.toUpperCase().includes("LIVE CLASS BY")){
         teacher = message.body.toUpperCase().split("LIVE CLASS BY")[1].trim().split("\n")[0];//}else{
        //   teacher = message.body.toUpperCase().split("LIVE CLASS BY ")[1].split("\N")[0];  
        // }
        let timing = message.body.split("Start Time: ")[1].split("\n\nMeeting")[0];
        let link = message.links[0].link


        Upload(teacher,timing,link);
        //admin_id.sendMessage('120363039577912932@g.us', "Uploaded " + teacher + " : " + timing + "to Firebase Succesfully");

        console.log(timing)




      } else {
        console.log("I Am Not Reading It 'LOL' 🤣")
      }
    } else { console.log("Gim Me A Link Bruh 😢") }
    //console.log(["message._data.matchedText",message._data.matchedText])
    //console.log(["Object.keys(message)",Object.keys(message)])
  }
}




mainID_Motion.on('message', (message) => {
  // if (message.body === '!ping') {
  //   message.reply('pong');
  // }
  // if (message.body === '.ping') {
  //   mainID_Motion.sendMessage(message.from, 'pong');
  // }
  //console.log(message)

  if (typeof message.links[0] != "undefined") {

    if (message.body.includes("zoom.us/rec/share")) {

      let teacher = message.body.toUpperCase().split("LIVE CLASS BY")[1].trim().split("\n")[0];
      let timing = message.body.split("Start Time: ")[1].split("\n\nMeeting")[0];
      let link = message.links[0].link


      Upload(teacher,timing,link)

      console.log({ timing: teacher })




    } else {
      console.log("I Am Not Reading It LOL")
    }
  } else { }
  //console.log(["message._data.matchedText",message._data.matchedText])
  //console.log(["Object.keys(message)",Object.keys(message)])
});







admin_id.initialize();


mainID_Motion.initialize();

function LOGG(id,message) {
  if(id === 'mainID'){
    mainID_Motion.sendMessage('120363039577912932@g.us', message)
  }else if(id === 'admin'){
    admin_id.sendMessage('120363039577912932@g.us', message)
  }
}

function Upload(teacher,timing,link){
  set(ref(db, 'Motion Lectures/' + teacher.split(" ")[0] + " Sir" + "/" + timing), {

    link: link
    

    

  }).then(() => {
    // Data saved successfully!
    console.log('Uploaded ' + teacher + ' : ' + timing + 'to Firebase Succesfully')
    //admin_id.sendMessage('120363039577912932@g.us', 'Uploaded ' + teacher + ' : ' + timing + 'to Firebase Succesfully')
  }).catch((error)=>{
    console.log('Uploading ' + teacher + ' : ' + timing + 'to Firebase was UnSuccessfull..............        '+toString(error))
    //admin_id.sendMessage('120363039577912932@g.us', 'Uploading ' + teacher + ' : ' + timing + 'to Firebase was UnSuccessfull..............        '+toString(error))
  })

}