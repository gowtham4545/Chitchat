const socket = io('http://localhost:8000')
var audio=new Audio('../ting.mp3')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append=(message,position)=>{
    const mesElement=document.createElement('div');
    mesElement.innerText=message;
    mesElement.classList.add('message');
    mesElement.classList.add(position);
    messageContainer.append(mesElement);
    if(position==='left'){
        audio.play()
    }
}

const nme=prompt('Enter your name to join.')
socket.emit('new-user-joined',nme);

socket.on('user-joined',data=>{
    append(`${data} joined the chat`,'right')
})

socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',data=>{
    append(`${data } left the chat`,'right')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You : ${message}`,'right'); 
    socket.emit('send',message);
    messageInput.value=''
})