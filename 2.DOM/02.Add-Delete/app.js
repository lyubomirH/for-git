function addItem() {
    let input = document.getElementById('newItemText');
    let ul = document.getElementById("items")

    let li = document.createElement("li");
    
    let a = document.createElement("a");
    a.textContent = "[Delete]"
    a.setAttribute('href',"#");
    a.addEventListener('click', (ev) => {
        ev.target.parentElement.remove()
    });

    li.textContent = input.value
    
    li.appendChild(a);
    ul.appendChild(li);
    input.value = '';
    

}