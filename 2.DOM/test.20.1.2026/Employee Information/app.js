function deleteByID() {
    let tr = [...document.querySelectorAll('tbody tr td:nth-child(3)')];
    let IdToBeDeleted = document.querySelector('input')
    let outPut = document.getElementById("result")

    let match = tr.filter(el => el.textContent == IdToBeDeleted.value);
    if(match.length != 0){
    match.forEach(el => {el.parentElement.remove()})
    outPut.textContent = "Deleted.";
    } else {
    outPut.textContent = 'Not found.'
    }
}   