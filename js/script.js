const fileInput = document.querySelector('#pimg');
let base64String="";
let data = JSON.parse(localStorage.getItem('crud')) || [];

function renderProducts() {
    const tbody = document.querySelector('#table tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML += `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td><img src ="${item.img}" height=50px></td>
            <td>${item.price}</td>
            <td>${item.disc}</td>
            
            <td>
                <button onclick="editProduct(${item.id})">Edit</button>
                <button class="btn btn-primary" data-type="deldata" data-id="${item.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
renderProducts()

let idForUpadate = "" 

function editProduct(id) {

    const product = data.find(item => item.id === id);
document.getElementById("btn1").dataset.type="updateData"

    idForUpadate = id;
    document.getElementById('pname').value = product.name;
    document.getElementById('pprice').value = product.price;
    document.getElementById('ptext').value = product.disc;
    const previewImg = document.querySelector('#pimg');
    previewImg.src = product.img;
    previewImg.style.display = 'block'
}


document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.dataset.type) {
            case "adddata":
               
                let name = document.getElementById("pname").value;
                let price = document.getElementById("pprice").value;
                let disc = document.getElementById("ptext").value;
                let id = parseInt((data.length > 0) ? data[data.length - 1].id + 1 : 1);
                let data1 = {
                    id,
                    name,
                    img:base64String,
                    price,
                    disc,
                    
                }
                
                data.push(data1);
                console.log(data);
                localStorage.setItem('crud', JSON.stringify(data));
                renderProducts();
                break;

            case "updateData":

               
                const updatedName = document.getElementById("pname").value;
                const updatedImg = base64String;

                const updatedPrice = document.getElementById("pprice").value;
                const updatedDesc = document.getElementById("ptext").value;
                

                const updatedProduct = {
                    id: parseInt(idForUpadate),  
                    name: updatedName,
                    price: updatedPrice,
                    disc: updatedDesc,
                    img: updatedImg,
                };


                const productIndex = data.findIndex(item => item.id == parseInt(idForUpadate));
                if (productIndex !== -1) {
                    data[productIndex] = updatedProduct;
                }

                localStorage.setItem('crud', JSON.stringify(data));


                renderProducts();

                // document.getElementById("productForm").reset();
                break;

            case "deldata":
                
                const productId = button.dataset.id; 
                console.log(productId)
                deleteProduct(productId); 
                break;
        }
    });
});

fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        base64String = reader.result;
        console.log(base64String);
    };

    reader.readAsDataURL(file);
});
function deleteProduct(id) {

    const productIndex = data.findIndex(item => item.id == id);
    console.log(productIndex)
    if (productIndex !== -1) {
        data.splice(productIndex, 1);
        localStorage.setItem('crud', JSON.stringify(data));
        renderProducts();
    }
}