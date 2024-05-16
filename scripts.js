// form selection elements
const form = document.querySelector('form');
const amount = document.getElementById('amount');
const expense = document.getElementById('expense');
const category = document.getElementById('category');

//selects the list element
const expenseList = document.querySelector('ul');



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

        //adds the information to the expenseInfo div

        expenseInfo.append(expenseName, expenseCategory);
        

        //adds the information to the , list element
        expenseItem.append(expenseIcon, expenseInfo);

        //adds the item to the list
        expenseList.append(expenseItem);

    } catch(error){
        alert("Não foi possível atualizar sua lista de despesas. Tente novamente em alguns minutos.")
    }
   
}