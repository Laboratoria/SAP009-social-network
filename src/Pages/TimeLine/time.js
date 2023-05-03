export function timeline() {
    const containertimeLine = document.createElement("div");
    containertimeLine.id = "containertimeLine"
    containertimeLine.innerHTML =`
    <form action="/pagina-processa-dados-do-form" method="post">
  
    <div>
        <label for="msg">Seu post:</label>
        <textarea id="msg" name="usuario_msg"></textarea>
    </div>
   
    <div class="btn">
        <button type="submit">Postar</button>
</div>
</form>`

return containertimeLine
}