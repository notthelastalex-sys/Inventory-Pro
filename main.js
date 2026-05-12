const inventory = [];

function addItem(){

    const nameInput =
        document.getElementById("item-name");

    const qtyInput =
        document.getElementById("item-qty");

    const itemName =
        nameInput.value.trim();

    const itemQty =
        Number(qtyInput.value);

    if(itemName === "" || itemQty <= 0){
        alert("Enter valid item data.");
        return;
    }

    const item = {
        id: Date.now(),
        name: itemName,
        qty: itemQty
    };

    inventory.push(item);

    renderInventory();

    nameInput.value = "";
    qtyInput.value = "";

}

function deleteItem(id){

    const index =
        inventory.findIndex(
            item => item.id === id
        );

    if(index !== -1){
        inventory.splice(index, 1);
    }

    renderInventory();

}

function renderInventory(){

    const inventoryList =
        document.getElementById("inventory-list");

    inventoryList.innerHTML = "";

    inventory.forEach(function(item){

        const container =
            document.createElement("div");

        container.classList.add(
            "inventory-item"
        );

        const info =
            document.createElement("div");

        info.classList.add(
            "item-info"
        );

        let warning = "";

        if(item.qty < 5){
            warning = "⚠ LOW STOCK";
        }

        info.innerHTML =
            `${item.name} (${item.qty})
             <span class="low-stock">
             ${warning}
             </span>`;

        const deleteBtn =
            document.createElement("button");

        deleteBtn.textContent =
            "Delete";

        deleteBtn.classList.add(
            "delete-btn"
        );

        deleteBtn.onclick =
            function(){
                deleteItem(item.id);
            };

        container.appendChild(info);
        container.appendChild(deleteBtn);

        inventoryList.appendChild(
            container
        );

    });

}