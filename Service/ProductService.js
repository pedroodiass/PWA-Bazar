var products = [];

function GetProducts() {
  return this.products;
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function RemoveProduct(ID) {
  products = products.filter((t) => t.ID != ID);
  console.log("entrou");
  SaveProducts();
  render(products);
}

function AddProduct() {
  let inputName = document.querySelector("#inputName");
  let inputPrice = document.querySelector("#inputPrice");
  let inputInfo = document.querySelector("#inputInfo");
  let inputUrlImage = document.querySelector("#inputUrlImage");
  let valueName = inputName.value;
  let valuePrice = inputPrice.value;
  let valueInfo = inputInfo.value;
  let valueUrlImage = inputUrlImage.value;

  this.products.push({
    ID: Math.random().toString().replace("0.", ""),
    Name: valueName,
    Price: valuePrice,
    Info: valueInfo,
    Image: valueUrlImage,
  });

  SaveProducts();
  render(products);
}

var listProducts = document.querySelector("#listProducts");

function render(products) {
  const t = JSON.parse(localStorage.getItem("products"));
  if (t) products = t;

  SaveProducts();

  let list = "";
  console.log(products);
  if (Array.isArray(products)) {
    products.forEach((product) => {
      list += `
        <div class="card" style="background-image: url(${product.Image}); background-size: cover;">
         <div class="shader">
         <button class="deleteButton" type="button" onclick="RemoveProduct(${product.ID})">
          Delete</button>
          <div class="textcard">
            <h3>${product.Name}</h3>
            <h4>R$ ${product.Price}</h4>
            <p>${product.Info}</p>
          </div>
         </div>
        </div>
        `;
    });
    listProducts.innerHTML = list;
  }
}

const SaveProducts = () => {
  localStorage.setItem("products", JSON.stringify(products));
};

render(products);

navigator.serviceWorker.register("/cookies-sw.js");
