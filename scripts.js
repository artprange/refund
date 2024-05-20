
// form selection elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//selects the list element
const expenseList = document.querySelector("ul")
const totalExpenses = document.querySelector("aside header h2")
const itemQuantity = document.querySelector("aside header p span")

//filtering numbers, only
amount.oninput = () => {
   
    let value = amount.value.replace(/\D/g, "")

    // passes the value to cents, so it can be properly formatted afterwards
    value = Number(value) / 100

 
    amount.value = formatCurrencyToBrl(value)
}

function formatCurrencyToBrl(value) {
   
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })


    return value
}

// Captura o evento de submit do formulário para obter os valores 
form.onsubmit = (event) => {
    // Previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }

  
    addExpense(newExpense)
}

// Adiciona um novo item na lista
function addExpense(newExpense) {
    try {
        //creates the list element
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

           //creates the category icon
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

       // creates expense info
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //creates the expense category
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //adds the information to the expenseInfo div
        expenseInfo.append(expenseName, expenseCategory)

       //adds the amount to the expense info
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`



       /* const removeIcon = document.createElement('img');
        removeIcon.classList.add('remove-icon');
        removeIcon.setAttribute('src', '/img/remove.svg');
        removeIcon.setAttribute('alt', 'Remover despesa');
        removeIcon.onclick = () => {
        expenseItem.remove();
        }*/
        
        //creates the remove icon
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        //adds the information to the , list element
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

         //adds the item to the list
        expenseList.append(expenseItem)

        // Limpa o formulário para adicionar um item novo
        resetForm()

        // Atualiza os totais
        updateTotals()


    } catch (error) {
        alert("Não foi possível atualizar sua lista de despesas. Tente novamente em alguns minutos.")
        console.log(error)
    }
}

//updating the totals
function updateTotals() {
    try {
         //recovers all the li from the ul
        const items = expenseList.children

        //updates the list quantity
        itemQuantity.textContent =  `${items.length} ${items.length > 1 ? 'itens' : 'item'}`;

        //variables to store the totals
        let total = 0

        ///going through all the items
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")

            //removes the non-numeric characters and swaps the ',' for '.'
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

            //converting the value to a number
            value = parseFloat(value)

            //checks if it's a valid number
            if (isNaN(value)) {
                return alert("Insira um número válido para o valor da despesa.");
            }

                //increments the total amount
        total += Number(value);
        }

         //creating the span element to display the total on the accurate format
        const brlSymbol = document.createElement("small")
        brlSymbol.textContent = "R$"

        //formats and removes the R$ from the total
        total = formatCurrencyToBrl(total).toUpperCase().replace("R$", "")

     //resets the element content
        totalExpenses.innerHTML = ""

        //adds the total to the element
        totalExpenses.append(brlSymbol, total);

    } catch (error) {
        alert("Não foi possível atualizar os totais.")
        console.log(error)
    }
}


//event listener to remove an item
expenseList.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-icon")){
        const item = event.target.closest('.expense')
        item.remove()
        
    }
    updateTotals()

})


function resetForm(){
    expense.value = "";
    amount.value = "";
    category.value = "";

    expense.focus();
}