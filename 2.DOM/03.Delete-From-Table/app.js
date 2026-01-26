function deleteByEmail() {
    let td = [...document.querySelectorAll('tr td:nth-child(2)')];
    let input = document.querySelector("input");
    let result = document.getElementById("result")

    let match = td.filter(el => el.textContent == input.value);
    if(match.length != 0){
    match.forEach(el => {el.target.parentElement.remove()})
    result.textContent = "Deleted.";
    } else {
    result.textContent = 'Not Found.'
    }
    input.value = '';
}