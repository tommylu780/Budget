async function handleDeleteExpense(event) {
    event.preventDefault();
    const expense_id = event.target.id
    console.log(expense_id)
    if (expense_id) {
        const response = await fetch(`/purchase/expense/${expense_id}`, {
            method: 'DELETE',
            body: JSON.stringify({
                expense_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

const deleteBtns = document.getElementsByClassName('delete-btn');

for (i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', handleDeleteExpense)
}
