function focused() {
    let inputs = [...document.querySelectorAll('input')];
    
    inputs.forEach(input => {
        input.addEventListener('focus', (event) => {
            event.target.parentElement.setAttribute('focused');
        });
        
        input.addEventListener('blur', (event) => {
            event.target.parentElement.classList.removeAttribute('focused');
        });
    });
}