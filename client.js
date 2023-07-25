var chats=document.querySelector(".chats");
var users_list=document.querySelector(".users-list");
var users_count=document.querySelector(".users-count");
var msg_send=document.querySelector("#user_send");
var user_msg=document.querySelector("#user_msg");

do{
    username=prompt("Enter your name: ");

}while(!username);

/*It will be called when user is join*/
socket.emit("new-user-joined",username);

/*notifying when user is joined*/
socket.on('user-connected',(socket_name)=>{
    userJoinLeft(socket_name,'joined');
});

/*function to create joined/left status div*/
function userJoinLeft(name,status){
    let div=document.createElement("div");
    div.classList.add('user-join');
    let content=`<p><b> ${name}</b> ${status} the chat</p>`;
    div.innerHTML=content;
    chats.appendChild(div);
    chats.scrollTop=chats.scrollHeight;
}
/*notifying that user has left*/
socket.on('user-disconnected',(user)=>{
    userJoinLeft(user,'left');
})
/*for updating users list and users counts*/
socket.on('user-list',(users)=>{
    users_list.innerHTML="";
    users_arr=Object.values(users);
    for(i=0;i<users_arr.length;i++){
        let p=document.createElement('p');
        p.innerText=users_arr[i];
        users_list.appendChild(p);
    }
    users_count.innerHTML=users_arr.length;
})
/*for sending msgs*/
msg_send.addEventListener('click',()=>{
    let data={
        user:username,
        msg:user_msg.value
    };
    if(user_msg.value!=''){
    appendMessage(data,'message-outgoing');
    socket.emit('message',data);
    user_msg.value='';
    }
});
function appendMessage(data,status){
    let div=document.createElement('div');
    div.classList.add('message',status);
    let content=`
    <h5>${data.user}</h5>
    <p>${data.msg}</p>
    `;
    div.innerHTML=content;
    chats.appendChild(div);
    chats.scrollTop=chats.scrollHeight;
}
socket.on('message',(data)=>{
    appendMessage(data,'message-incoming');
});


//socket.on('user-disconnected',(user)=>{
    //chats.scrollTop=chats.scrollHeight;

//})*/