function validate() {
    let input = document.getElementById("email");
    let pattern = /[a-z]+@[a-z]+\.[a-z]+/

    input.addEventListener("blur", (ev) => {
        //console.log(ev.target.value);
        if(pattern.test(ev.target.value)){
            ev.target.removeAttribute('class');
        } else{
            ev.target.setAttribute("class", 'error')
        }
    })
}