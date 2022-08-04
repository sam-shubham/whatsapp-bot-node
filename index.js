const { initializeApp, } = require('firebase/app')
const { getDatabase, ref, set ,onValue} = require('firebase/database')


var suspect = [];
const qrcode = require('qrcode-terminal');


const { Client, LocalAuth, NoAuth ,MessageMedia} = require('whatsapp-web.js');



var A1Grp, session;

var warnings = {};



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


const DatabaseRef = 
onValue(ref(db, '/Userbot/SuspectArray'), (data) => {
  if(data.exists()){
    suspect = data.val();

  }else{
    set(ref(db, '/Userbot/'),{
      "SuspectArray": []
    });
  }
  
});






const mainID_Motion = new Client({
  authStrategy: new LocalAuth({clientId: "main-id"}),
  ffmpegPath: './ffmpeg.exe'
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
  console.log('Admin Account is ready!');

  AdminIdReady();


  

  //admin_id.sendMessage('120363039577912932@g.us', "Admin is Ready")


  //Authenticate();


});

admin_id.on('message', (message) => {

  var times = 50;

  if (message.body == '.Auth') {
    // Authenticate();
  } else if (message.body == '.getAC') {
    getchat();
    console.log("Getting All Chats")
    console.log("━━╬٨ـﮩﮩ❤٨ـﮩﮩـ╬━❤️❥❥═══ 🅻🅾🅰🅳🅸🅽🅶😦 ══━━╬٨ـﮩﮩ❤٨ـﮩﮩـ╬━")
  } else if (message.body == '.sL') {
    startLeaching();
  }else if(message.body =='.bombKunal'){
    //console.log(parseInt(message.split(',')[1]))
    //console.log("Hlo")
    //console.log(message.body.includes('.bombKunal'))

    for(const i=0 ;i < times; i++){
      admin_id.sendMessage('918949591349@c.us',".hleo")

    }

  }else  if (typeof message.links[0] != "undefined") {

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

  
  

}

)

mainID_Motion.on('message_create', (message) => {

  //console.log(message);
  //console.log({'fromMe':message.fromMe,'to':message.to,'mediaKey':message.mediaKey,'hasQuotedMsg':message.hasQuotedMsg,'type':message.type,'hasMedia':message.hasMedia,'message':message.body,'QuotedMsg':message.QuotedMsg})

  if(message.fromMe){
    let key = String(message.body);
    

    if(key.includes('.spamhere') ){
      
      let Msg; 
      if(message.hasQuotedMsg){
        //console.log(Object.keys(message._data))
        if(message._data.quotedMsg.type == 'chat'){
          //console.log('hlo')
          MainSpamMsg(message._data.quotedMsg.body,dat._data.id._serialized.split("_")[1],message.body.split(' ')[1]);

        }else if(message._data.quotedMsg.type == 'sticker'){
          
          // message.getQuotedMessage().then(async (dat)=>{
          //   if(dat.hasMedia){
          //     var ss = await dat.downloadMedia();

          //     // var chatDat = await mainID_Motion.sendMessage(dat._data.id._serialized.split("_")[1],ss,{sendMediaAsSticker:true,stickerName:'Jarvis Sticker',stickerAuthor:'Jarvis - Sam'});
          //     // for(let i=0;i<message.body.split(' ')[1];i++){
          //     //   chatDat.forward(message.to);
          //     // }
          //   }
          // })

        }
      }
      
    }else if(key.includes('.ultraspam') ){
      
      let Msg; 
      if(message.hasQuotedMsg){
        //console.log(Object.keys(message._data))
        if(message._data.quotedMsg.type == 'chat'){
          //console.log('hlo')
          MainSpamMsg(message._data.quotedMsg.body,message.to,message.body.split(' ')[1]);
          AdminSpamMsg(message._data.quotedMsg.body,message.to,message.body.split(' ')[1]*3);

        }
      }
      message.delete(true);
      
    }else if(key.includes('.suspect') ){



      MainAddSuspect(message.to);
      message.delete(true);
        


    }else if(key.includes('.approve') ){

      MainApproveUser(message.to)
      message.delete(true);

      
      



  }else if(key.includes('.unblock') ){
    message.delete(true);
    //MainUnblockUser(message.to);
    



}else if(key.includes('.block') ){
  
  
    MainBlockUser(message.to);
    message.delete(true);


}else if(key.includes('.intro') ){
  
  
  SayHello(message.to);
  message.delete(true);


}else if(key.includes('.dps') ){


  
  MainSendDPSticker(message.to);
  
  message.delete(true);


}else if(key.includes('.spamdp') ){


  
  MainSpamDP(message.to,message.body.split(' ')[1]);
  
  message.delete(true);


}
  

///Not From ME    
  }else{
    if(suspect.includes(message.from)){
      //const chat = message.getChat();
      
      if(warnings[message.from]<10){
        warnings[message.from] += 1
      Main_Warn(warnings[message.from],message.from);

      }else{
        MainBlockUser(message.from);
      }
    }
  }




})










mainID_Motion.on('qr', (qr) => {
  console.log('QR RECEIVED for Main ID', qr);
  qrcode.generate(qr, { small: true });
});






mainID_Motion.on('ready', () => {
  console.log('Main ID is ready!');

  MainIdReady();




  //mainID_Motion.sendMessage('120363039577912932@g.us', 'Me izz ready!')
  // Authenticate();

});






async function getchat() {
  let chats = await mainID_Motion.getChats();
  console.log("Got All Chats Serching For A1")
  LOGG('mainID', "Got All Chats Serching For A1");

  for (const chat of chats) {

    //   //console.log(Object.keys(chat))
    //console.log([chat.id, chat.name])
    if (chat.name === 'A1(22-23) 19 Jan-(1)') {

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
    
    //console.log(messages)
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
        //console.log(message)
        let teacher;
        // if(message.body.toUpperCase().includes("LIVE CLASS BY")){
         teacher = message.body.toUpperCase().split("LIVE CLASS BY")[1].trim().split("\n")[0];//}else{
        //   teacher = message.body.toUpperCase().split("LIVE CLASS BY ")[1].split("\N")[0];  
        // }
        let timing = message.body.split("Start Time: ")[1].split("\n\nMeeting")[0];
        let link = message.links[0].link


        Upload(teacher,timing,link);
        //admin_id.sendMessage('120363039577912932@g.us', "Uploaded " + teacher + " : " + timing + "to Firebase Succesfully");

        //console.log(timing)




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
    console.log('Uploaded ' + teacher + ' : ' + timing + ' to Firebase Succesfully')
    admin_id.sendMessage('120363039577912932@g.us', 'Uploaded ' + teacher + ' : ' + timing + 'to Firebase Succesfully')
  }).catch((error)=>{
    console.log('Uploading ' + teacher + ' : ' + timing + 'to Firebase was UnSuccessfull..............        '+toString(error))
    admin_id.sendMessage('120363039577912932@g.us', 'Uploading ' + teacher + ' : ' + timing + 'to Firebase was UnSuccessfull..............        '+toString(error))
  })

}


// async function MainSpamSticker(message,chatID,Quantity){
//      let msg = await message.getQuotedMessage()
//      console.log(msg);
//      //const media = await msg.downloadMedia();
//      //sticker.mimetype = "image/jpg"
//      //await mainID_Motion.sendMessage(chatID,media, { sendMediaAsSticker: true });
     
//      //msg.forward(chatID)
//         // for(let i=0;i<Quantity;i++){

          
          
//         //   msg.forward(chatID)
//         // }
// }



async function MainSpamMsg(message,chatID,Quantity,id){

  //let SendingId = id;
  for(let i=0;i<=Quantity;i++){
    mainID_Motion.sendMessage(chatID,message)

  }
  


}
async function AdminSpamMsg(message,chatID,Quantity,id){

  //let SendingId = id;
  for(let i=0;i<=Quantity;i++){
    admin_id.sendMessage(chatID,message)

  }
  


}

async function Main_Warn(times,Warned_User){
  const media = await MessageMedia.fromFilePath('./media/jarvis.jpg')
  const audio = await MessageMedia.fromFilePath('./media/alert.mp3')
  audio.mimetype = "audio/mp3"
  media.mimetype = "image/jpg"
  media.filename = "Warning.png";
  await mainID_Motion.sendMessage(Warned_User,media,{caption: `Hi It's Sam's  🅹.🅰.🆁.🆅.🅸.🆂  𝗕𝗢𝗧\n\nᴡᴀʀɴɪɴɢ : ${times}/10 \n \nSam Has Added You To Suspect List.... So you Are In My Eye👁️ \n\n I Am Warning You 😡 Not To Message.. Otherwise You Will Be Automatically Blocked ⚠️ \n\n\n𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝘽𝙮 𝙎𝘼𝙈`})
  await mainID_Motion.sendMessage(Warned_User,audio,{sendAudioAsVoice:true});

}

async function MainBlockUser (UserToBlock) {
  
  const media = await MessageMedia.fromFilePath('./media/jarvis.jpg')
  media.mimetype = "image/jpg"
  media.filename = "Warning.png";
  

  mainID_Motion.sendMessage(UserToBlock,media,{caption: `Hi It's Sam's  🅹.🅰.🆁.🆅.🅸.🆂  𝗕𝗢𝗧\n\n  Crossed The LIMIT ........... \n\nLet's See How Blocking You... Tastes🤣\n\n⚠️⚠️  ＢＬＯＣＫＥＤ  ⚠️⚠️ \n\n\n𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝘽𝙮 𝙎𝘼𝙈`})
  const contact = await mainID_Motion.getContactById(UserToBlock);
  
  if(contact.isBlocked){
    contact.block();
    LOGG('mainID',`User Blocked ${UserToBlock.replace('@c.us','')}`)

  }
  
  
  
}

async function MainApproveUser(userToApprove){
  const media = await MessageMedia.fromFilePath('./media/jarvis.jpg')
  media.mimetype = "image/jpg"
  media.filename = "Warning.png";
  
  
  if(suspect.includes(userToApprove)){
    suspect.splice(suspect.indexOf(userToApprove), 1)
    mainID_Motion.sendMessage(userToApprove,'Hey You Are Approved To Chat With Sam 😊')
  }

  mainID_Motion.sendMessage(userToApprove,media,{caption: `It's Sam's 🅹.🅰.🆁.🆅.🅸.🆂  𝗕𝗢𝗧\n\nDude, Don't Forget To Thank Me... 😁  \n\nApproved to Chat But Please Don't Spam..\n\n😃😃  ＡＰＰＲＯＶＥＤ  😃😃 \n\n\n𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝘽𝙮 𝙎𝘼𝙈`})
  warnings[userToApprove] = 0;
  set(ref(db, '/Userbot/'),{
    "SuspectArray": suspect
  });

}

async function MainAddSuspect(UserToAddInSuspects){

  



  const media = await MessageMedia.fromFilePath('./media/jarvis.jpg')
  const audio = await MessageMedia.fromFilePath('./media/jarvis_alarm.mp3')
  audio.mimetype = "audio/mp3"
  media.mimetype = "image/jpg"
  media.filename = "Jarvis.png";
  await mainID_Motion.sendMessage(UserToAddInSuspects,media,{caption: `Hi It's Sam's  🅹.🅰.🆁.🆅.🅸.🆂  𝗕𝗢𝗧\n\n \nSam Has Added You To Suspect List.... So you Are In My Eye👁️ \n\n I Am Warning You 😡 Not To Message.. Otherwise You Will Be Automatically Blocked After 10 WARNINGS ⚠️ \n\n\n𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝘽𝙮 𝙎𝘼𝙈`});
  await mainID_Motion.sendMessage(UserToAddInSuspects,audio,{sendAudioAsVoice:true});
  suspect.push(UserToAddInSuspects)
  set(ref(db, '/Userbot/'),{
    "SuspectArray": suspect
  });

  
  warnings[UserToAddInSuspects] = 0;
  LOGG('mainID',`User Added To Suspect List ${UserToAddInSuspects.replace('@c.us','') } \n\n New Suspect List  ${suspect}`)

}

async function SayHello(UserToSayHello){
  const media = await MessageMedia.fromFilePath('./media/jarvis.jpg')
  const audio = await MessageMedia.fromFilePath('./media/Jarvis.mp3')
  media.mimetype = "image/jpg"
  audio.mimetype = "audio/mp3"
  media.filename = "Jarvis.png";
  mainID_Motion.sendMessage(UserToSayHello,media,{caption: `Hi It's  🅹.🅰.🆁.🆅.🅸.🆂  𝗕𝗢𝗧\n\n\nAn Extra Ordinary AI Bot Working For MY Master 𝙎𝘼𝙈 \n\n\n𝘿𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝘽𝙮 𝙎𝘼𝙈`});
  mainID_Motion.sendMessage(UserToSayHello,audio,{sendAudioAsVoice:true});
  

}

async function MainSendDPSticker(TargetUser){
  const contact = await mainID_Motion.getContactById(TargetUser);
  const profilePicUrl = await contact.getProfilePicUrl();
  //console.log(profilePicUrl);
  const sticker = await MessageMedia.fromUrl(profilePicUrl);
  sticker.mimetype = "image/jpg"

 await mainID_Motion.sendMessage(TargetUser,sticker, { sendMediaAsSticker: true });
 
}

async function MainSpamDP(TargetUser,spamCount){
  const contact = await mainID_Motion.getContactById(TargetUser);
  const profilePicUrl = await contact.getProfilePicUrl();
  //console.log(profilePicUrl);
  const sticker = await MessageMedia.fromUrl(profilePicUrl);
  sticker.mimetype = "image/jpg"

 const SentSticker = await mainID_Motion.sendMessage(TargetUser,sticker, { sendMediaAsSticker: true });
 for(let i=1;i<spamCount;i++){
  SentSticker.forward(TargetUser);
 }
}

async function AdminIdReady(){
  const audio = await MessageMedia.fromFilePath('./media/welcome_home.mp3')
  audio.mimetype = "audio/mp3"
  await admin_id.sendMessage('120363039577912932@g.us',audio,{sendAudioAsVoice:true});
} 

async function MainIdReady(){
  const audio = await MessageMedia.fromFilePath('./media/All_System_Ready.mp3')
  audio.mimetype = "audio/mp3"
  await mainID_Motion.sendMessage('120363039577912932@g.us',audio,{sendAudioAsVoice:true});
} 