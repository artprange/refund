// form selection elements

const amount = document.getElementById('amount');


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