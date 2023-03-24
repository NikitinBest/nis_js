class Product {
    constructor(name, p, f,c, ccal) {
        this.name = name
        this.p = +p
        this.f = +f
        this.c = +c
        this.ccal = +ccal
    }
}

let target = {
    p: 70,
    f: 100,
    c: 100,
    ccal: 2000
}

let today = []

let products = [
    new Product("borsh",20,10,10, 200)
]

function renderCards() {
    let container = document.getElementById('products')
    container.innerHTML=''
    for (const product of products) {
        container.innerHTML+= `
            <div class="product" id="${products.indexOf(product)}">
                <div class="params">
                    <p class="name">${product.name}</p>
                    <p class="p">${product.p.toString()}г белков</p>
                    <p class="f">${product.f.toString()}г жиров</p>
                    <p class="c">${product.c.toString()}г углеводов</p>
                    <p class="ccal">${product.ccal.toString()} кКал</p></div>
                <button class="delete" id="0" onclick="addToList(${products.indexOf(product)})">Добавить</button>
                <button class="delete" id="0" onclick="deleteProduct(${products.indexOf(product)})">Удалить</button>
            </div>
        `
    }
}

function renderList() {
    let container = document.getElementById('today')
    container.innerHTML=''
    for (const product of today) {
        container.innerHTML+= `
            <div class="product">
                <div class="params">
                    <p class="name">${product.name}</p>
                    <p class="p">${product.p.toString()}г белков</p>
                    <p class="f">${product.f.toString()}г жиров</p>
                    <p class="c">${product.c.toString()}г углеводов</p>
                    <p class="ccal">${product.ccal.toString()} кКал</p></div>
                <button class="delete" id="0" onclick="removeFromList(${today.indexOf(product)})">Убрать</button>
            </div>
        `
    }
}

function saveAll(){
    localStorage.setItem('products', JSON.stringify(products))
    localStorage.setItem('today', JSON.stringify(today))
}

function loadAll() {

    products = JSON.parse(localStorage.getItem('products'))
    today = JSON.parse(localStorage.getItem('today'))
    console.log(today)
}

function deleteProduct(id) {
    p = products[id]
    for (let i = 0; i < today.length; i++) {
        if (JSON.stringify(today[i]) === JSON.stringify(p)) {
            today.splice(i,1)
            i--
        }
    }
    products.splice(id, 1)

    saveAll()
    renderList()
    renderCards()
    renderStats()
    renderLeft()
}

function addToList(id) {
    today.push(products[id])
    saveAll()
    renderList()
    renderStats()
    renderLeft()
}

function removeFromList(id) {
    today.splice(id,1)
    saveAll()
    renderList()
    renderStats()
    renderLeft()
}

function renderStats() {
    let stats = document.getElementById('stats');
    let p = 0;
    let f = 0;
    let c = 0;
    let ccal = 0;

    for (const prod of today) {
        p+=prod.p;
        f+=prod.f;
        c+=prod.c;
        ccal+=prod.ccal;
    }
    stats.innerHTML = `
        <h2>Итого потреблено:</h2>
        <div class="product">
            <div class="params">
                <p class="p">${p.toString()}г белков</p>
                <p class="f">${f.toString()}г жиров</p>
                <p class="c">${c.toString()}г углеводов</p>
                <p class="ccal">${ccal.toString()} кКал</p></div>
        </div>
    `
}
function renderLeft() {
    let stats = document.getElementById('left');
    let p = 0;
    let f = 0;
    let c = 0;
    let ccal = 0;

    for (const prod of today) {
        p+=prod.p;
        f+=prod.f;
        c+=prod.c;
        ccal+=prod.ccal;
    }
    stats.innerHTML = `
        <h2>Осталось:</h2>
        <div class="product">
            <div class="params">
                <p class="p">${target.p - p}г белков</p>
                <p class="f">${target.f - f}г жиров</p>
                <p class="c">${target.c - c}г углеводов</p>
                <p class="ccal">${target.ccal - ccal} кКал</p></div>
        </div>
    `
}

document.addEventListener("DOMContentLoaded", () => {
    let name = document.getElementById('name')
    let p = document.getElementById('p')
    let f = document.getElementById('f')
    let c = document.getElementById('c')
    let ccal = document.getElementById('ccal')

    if (localStorage.length > 0) {
        loadAll()
    }


    let add_card_show = document.getElementById('add_button')
    let add_card = document.getElementById('add_card')
    add_card.style.display = 'none'

    add_card_show.addEventListener('click', () => {
        add_card.style.display = 'flex';
    })

    let add_product_button = document.getElementById('add_product_button')
    add_product_button.addEventListener('click', () =>
    {

        products.push(new Product(name.value, p.value, f.value, c.value, ccal.value))

        saveAll()
        renderCards()
        add_card.style.display = 'none'
        name.value = ''
        p.value = ''
        f.value = ''
        c.value = ''
        ccal.value = ''
    })

    document.getElementById('add_product_hide').addEventListener('click', () => {
        add_card.style.display = 'none'
    })

    renderCards()
    renderList()
    renderStats()
    renderLeft()
});
