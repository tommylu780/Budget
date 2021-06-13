async function handleViewCategory(event) {
    event.preventDefault();

    const category_id = document.getElementById("category").value;
    const totalEl = document.getElementById("renderCategoryTotal");

    if (category_id) {
        const response = await fetch('/purchase/category', {
            method: 'POST',
            body: JSON.stringify({
                category_id,
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const body = await response.json();
            console.log(body)
            totalEl.innerHTML = "";
            let h3 = document.createElement('h3');
            h3.innerHTML = `$${body.totalSpent}`
            totalEl.appendChild(h3);
        } else {
            totalEl.innerHTML = ""
            let h3 = document.createElement('h3');
            h3.innerHTML = `$0`
            totalEl.appendChild(h3);
        }
    }
}

document.querySelector('#viewCategory').addEventListener('submit', handleViewCategory);