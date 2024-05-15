// form selection elements
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');



//filtering numbers, only
amount.oninput = () =>{
    let value = amount.value.replace(/\D,/g, '');

    // passes the value to cents, so it can be properly formatted afterwards
    value = Number(value/100);

    amount.value = value=formatCurrencyToBrl(value);
}

function formatCurrencyToBrl(value){
     value.toLocaleString('pt-BR', {
        style: 'currency',
         currency: 'BRL'
    });

    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();
}    