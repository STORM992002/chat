const socket=io()
let uname;
let messageArea=document.querySelector('.chat')
let textarea=document.querySelector('#textarea')
do{
    uname=prompt('enter your name :')
}while(!uname)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg ={
        user:uname,
        message:message.trim()
    }


//append
appendMessage(msg,'outgoing')
textarea.value=''
scrolltobottom()

// send to server
socket.emit('message',msg)

}

function appendMessage(msg,type){
let mainDiv=document.createElement('div')
let className=type
mainDiv.classList.add(className,'outgoing')

let markup=`
<h4>${msg.user}</h4>
<p>${msg.message}</p>`

mainDiv.innerHTML=markup
messageArea.appendChild(mainDiv) 
}



// recive

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltobottom()
})


function scrolltobottom(){
     messageArea.scrollTop=messageArea.scrollHeight
}