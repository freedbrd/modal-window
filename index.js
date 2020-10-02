const fruits = [
  {
    id: 1,
    title: 'Apple',
    price: 20,
    img: 'https://i5.walmartimages.ca/images/Large/094/514/6000200094514.jpg',
  },
  {
    id: 2,
    title: 'Lemon',
    price: 30,
    img: 'https://i5.walmartimages.ca/images/Large/094/504/6000200094504.jpg',
  },
  {
    id: 3,
    title: 'Banana',
    price: 40,
    img: 'https://images-na.ssl-images-amazon.com/images/I/61fZ%2BYAYGaL._SX569_.jpg',
  },
];

const toHtml = fruit => `
<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <p class="card-text">Product: ${fruit.title}</p>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Show the price</a>
      <a href="#" class="btn btn-danger">Remove</a>
    </div>
  </div>
</div>
`;

function render() {
  document.getElementById('fruits').innerHTML = fruits.map(toHtml).join('');
}

render();

const modal = $.modal({
  title: 'Product price',
  closable: true,
  width: '450px',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        modal.close();
      },
    },
  ],
});

document.addEventListener('click', event => {
  const btnType = event.target.dataset.btn;
  const fruitId = event.target.dataset.id;
  console.log(fruits);

  if (btnType === 'price') {
    const fruit = fruits.find(item => item.id === +fruitId);

    modal.open();
    modal.setContent(`Price is ${fruit.price}$`);
  }
});
