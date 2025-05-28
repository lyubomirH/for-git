// filepath: c:\Users\Mr_Blaza\Desktop\LUYBCHO\ИТ\JS\for git\proekti\quiz_10V_LyubomirHristov\select.js
document.addEventListener('DOMContentLoaded', () => {
    const optionButtons = document.querySelectorAll('.option-button');
    const proceedButton = document.getElementById('proceedButton');

    let selectedOption = null;

    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedOption = button.dataset.value;
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    proceedButton.addEventListener('click', () => {
        if (selectedOption) {
            localStorage.setItem('selectedOption', selectedOption);
            window.location.href = 'index.html'; // Redirect to the quiz page
        } else {
            alert('Моля, изберете опция преди да продължите.');
        }
    });
});