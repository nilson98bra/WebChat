const socket = io("http://localhost:4000")

const btn = document.getElementById("btn-submit")

let blocoMensagens = document.querySelector(".msg-box ul");

function renderizarMensagens(ul, data){
    var user = document.createElement("strong");
    var userTextname = document.createTextNode(`${data.userName}: `);
    user.appendChild(userTextname)

    var msg = document.createElement("p");
    var msgText = document.createTextNode(data.mensagem);
    msg.appendChild(msgText)

    var li = document.createElement("li");
    li.appendChild(user)
    li.appendChild(msg)
    ul.appendChild(li)

}

socket.on("mensagensAnteriores",(data)=>{
    for (element of data) {
        renderizarMensagens(blocoMensagens,element)
    }
        
  
})
socket.on("mensagemRecebida",(data)=>{
    renderizarMensagens(blocoMensagens,data)
})
btn.addEventListener("click",(event)=>{
    event.preventDefault()
    
    let userName = document.getElementsByName("usuario")[0].value
    let mensagem = document.getElementsByName("mensagem")[0].value
    
    if(userName.length && mensagem.length){
        let msgObj = {
            userName: userName,
            mensagem: mensagem
        }

        renderizarMensagens(blocoMensagens,msgObj)
        socket.emit("msg",msgObj)
    }
    else{
        alert("Os campos devem ser preenchidos")
    }
})