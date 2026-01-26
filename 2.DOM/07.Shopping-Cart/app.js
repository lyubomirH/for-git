function solve() {
    let addBtns = [...document.querySelectorAll('.add-product')];
    let textarae = document.getElementById('textarea');
    let checkoutBtn = document.getElementById('checkout');
    let result = [];

    addBtns.forEach(btn => {
        btn.addEventListener('click', (ev)=>{
            let div = ev.target.parentElement.parentElement;
            let productName = div.querySelector('.product-title');
            let price = div.querySelector('.product-line-price');
            let match = result.find(str => str.startsWith(`Added ${productName} for ${price} to the cart.`))
            if(!match){
            result.push(`Added ${productName} for ${price} to the cart`)
            textarae.value = result.join("\n")
            } else{
                let index = result.indexOf(match);
                let newPrice = Number(match.split(" ")[3]) + +price;

                let newValue = `Added ${productName} for ${newPrice} to the cart.`
                result.splice(index, 1 , newValue);
            }
            textarae,value = result.join("\n");
        });
        checkoutBtn.addEventListener('click', (ev) => {
            let sum = result.map(el => Number(el.splice(" ")[3])).reduce((acc, cv) => acc +cv , 0);
            textarae.value += `\nYpu bougth ${result.map(el => Number(el.splice(" ")[3])).reduce((acc, cv)}` 
        })
    });
}