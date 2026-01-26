function attachGradientEvents() {
    let hoverEl = document.getElementById('gradient');
    let output = document.getElementById("result");

    hoverEl.addEventListener("mousemove", (ev) => {
        let offX = ev.offsetX;
        let elWhidth = ev.target.offsetWidth;
        let result = offX / elWhidth *100;
        
        output.textContent = Math.floor(result) + "%";
    })
}