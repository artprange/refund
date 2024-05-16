// form selection elements
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');


//selects the list element
const expenseList = document.querySelector('ul');
const totalExpenses = document.querySelector('aside header h2');
const itemQuantity = document.querySelector(' aside header p span');



//filtering numbers, only
amount.oninput = () =>{
    let value = amount.value.replace(/\D/g, '');

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

    const newExpense={
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    addExpense(newExpense)
}    




function addExpense(newExpense){
  

    try{
        //creates the list element
        const expenseItem = document.createElement('li');
        expenseItem.classList.add("expense");

        //creates the category icon
        const expenseIcon = document.createElement('img');
        expenseIcon.setAttribute('src', `./img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute('alt', newExpense.category_name);

        // creates expense info

        const expenseInfo = document.createElement('div');
        expenseInfo.classList.add('expense-info');

        //creates the expense name
        const expenseName = document.createElement('strong');
        expenseName.textContent = newExpense.expense;

        //creates the expense category
        const expenseCategory = document.createElement('span');
        expenseCategory.textContent = newExpense.category_name;
        

        //adds the amount to the expense info
        const  expenseAmount = document.createElement('span');
        expenseAmount.classList.add('expense-amount');
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //adds the information to the expenseInfo div
        expenseInfo.append(expenseName, expenseCategory);

        //creates the remove icon
        const removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        removeIcon.setAttribute('src', '/img/remove.svg');
        removeIcon.setAttribute('alt', 'Remover despesa');
        removeIcon.onclick = () => {
            expenseItem.remove();
        }
        

        //adds the information to the , list element
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

        //adds the item to the list
        expenseList.append(expenseItem);

        //updates the totals
        updateTotals();

    } catch(error){
        alert("Não foi possível atualizar sua lista de despesas. Tente novamente em alguns minutos.")
    }
   
}

//updating the totals

function  updateTotals(){


    try{
        //recovers all the li from the ul
        const items= expenseList.children;

        //updates the list quantity
        itemQuantity.textContent = `${items.length} ${items.length > 1 ? 'itens' : 'item'}`;


        //variables to store the totals
        let total = 0;
        
        //goind through all the items
        for(let item=0; item < items.length; item++){
            const itemAmount = items[item].querySelector('.expense-amount');

            //removes the non-numeric characters and swaps the ',' for '.'
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(',', '.');

            //converting the value to a number
            value = parseFloat(value);

            //checks if it's a valid number
            if(isNaN(value)){
                return alert("Insira um número válido para o valor da despesa.");
            }
                //increments the total amount
        total += Number(value);
        }

        //creating the span element to display the total on the accurate format
        const brlSymbol = document.createElement('small');
        brlSymbol.textContent = 'R$';


        //formats and removes the R$ from the total
        total = formatCurrencyToBrl(total).toUpperCase().replace('R$', '');

        //resets the element content
        totalExpenses.innerHTML = '';

        //adds the total to the element
        totalExpenses.append(brlSymbol, total);
 

    
    } catch (error){
        console.log(error);
        alert("Não foi possível atualizar os totais. Tente novamente em alguns minutos.");

    }
}

