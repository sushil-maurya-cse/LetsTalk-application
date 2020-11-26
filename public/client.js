const socket=io()
let name;

let textarea=document.querySelector('#textarea')
let msgarea= document.querySelector('.msg_area')
do{
       name  =    prompt('Please enter Your name : ')
}
while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }

})
function sendMessage(mssg){
    let msg={
        user: name,
        message:mssg.trim()
    }
    //apppend
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    

    //send to server\
socket.emit('message', msg)

}

function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'msg')
    
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    msgarea.appendChild(mainDiv)
}

// reciave a message
socket.on('send',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})
function scrollToBottom()
{
    msgarea.scrollTop=msgarea.scrollHeight
}