function solution() {
    let inputBox = document.querySelector('section div input');
    let sectionBtn = document.getElementById("registerButton");
    let ul = document.querySelectorAll('section ul')[0];
    let sent = document.querySelectorAll('section ul')[1];

    sectionBtn.addEventListener('click', (ev) => {
        let li = document.createElement("li");
        li.textContent = inputBox.value
        let bnt = document.createElement("button")

        bnt.textContent = "Send"
        bnt.addEventListener('click' , (ev) => 
            {
                let lis = document.createElement("li");
                let li = ev.target.parentElement.textContent.replace(" Send", "")
                lis.textContent = li;
                sent.appendChild(lis);
                ev.target.parentElement.remove()
            })

        
        li.appendChild(bnt)
            
        ul.appendChild(li)
        ul.
        
        
        inputBox.value = ''
    })

    
    
}