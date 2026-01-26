function solve() {
    let genBtn = document.querySelector('button');
    let tbody = document.querySelector('tbody');
    let BuyBtn = document.querySelectorAll('button')[1];
    let firstArea = document.querySelector('textarea')

    genBtn.addEventListener("click" , (ev) => {
        
        JSON.parse(firstArea.value).forEach((obj) => {
            tbody.innerHTML += `
                                    <tr>
                                        <td>
                                            <img src="${obj.img}">
                                        </td>
                                        <td>
                                            <p>${obj.name}</p>
                                        </td>
                                        <td>
                                            <p>${obj.price}</p>
                                        </td>
                                        <td>
                                            <p>${obj.decFactor}</p>
                                        </td>
                                        <td>
                                            <input type="checkbox"/>
                                        </td>
                                    </tr>
                                `;
        });  
    });

    BuyBtn.addEventListener('click', (ev) => {
        let inputs = [...document.querySelectorAll('tr input')];
        let checkboxInput = inputs.filter(el => el.checked);
        let res = {};
        checkboxInput.forEach(i => {
            let currTr = i.parentElement.parentElement;
            let tds = [...currTr.children];
            tds.forEach(td => {
                //let currInfo = [...]
            })
        })
    })
}