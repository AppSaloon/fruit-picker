
let orders = []
const fruitSelect = document.getElementById("fruit")
// generate amount selector
const amountSelect = document.getElementById("aantal")

const renderAmountSelect = (amountSelect) => {
	for (var i = 1; i < 10; i++) {
		const option = document.createElement("option")
		option.textContent = i
		option.value = i
		amountSelect.appendChild(option)
	}
}
const renderFruitSelect = (fruitSelect) => {
	// generate fruit selector
	fetch("https://scripts.appsaloon.be/api/fruit")
		.then(response => response.json())
		.then(function (result) {
			console.log(result)
			fruitSelect.innerHTML = ''
			const kies = document.createElement("option")
			kies.text = 'kies'
			fruitSelect.add(kies, null)
			const fruits = result.sort()
			for (const fruit of fruits) {
				const option = document.createElement("option")
				option.text = fruit.name
				option.value = fruit.name
				fruitSelect.add(option, null)
			}
		})
		.catch(error => console.log('error', error))
}

const renderOrderList = () => {
	const orderList = document.getElementById('orderList')
	// delete content of orderList
	orderList.innerHTML = ""
	for (const order of orders) {
		// create deleteButton
		const deleteButton = document.createElement('span')
		deleteButton.setAttribute('class', "deletebutton btn btn-sm btn-danger")
		//deleteButton.setAttribute('id', 'deleteButton1') op deze manier een "id" creeren voor de delete button ! 

		deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>'
		deleteButton.addEventListener('click', (e) => {
			deleteOrder(order)
		})

		// create order list item
		const orderItem = document.createElement('li')
		orderItem.setAttribute('class', 'clickme')
		// add text to order list item
		orderItem.innerHTML = order.amount + ' x ' + order.fruit + ' '
		// append delete button to order list item
		orderItem.appendChild(deleteButton)
		// onClick load values into select fields
		orderItem.addEventListener('click', (e) => {
			amountSelect.value = order.amount
			fruitSelect.value = order.fruit
		})
		orderList.appendChild(orderItem)
	}
}

renderAmountSelect(amountSelect)
renderFruitSelect(fruitSelect)
renderOrderList()

/* ORDER */
const addOrder = (order) => {
	const existingFruitOrderIndex = orders.findIndex(item => item.fruit === order.fruit)

	if (existingFruitOrderIndex === -1) {
		// add order 
		orders.push(order)
	} else {
		// udpate order
		const existingFruitOrder = orders[existingFruitOrderIndex]
		orders[existingFruitOrderIndex].amount = order.amount
	}

}
const deleteOrder = (order) => {
	console.log('deleteOrder', order)
	const newOrders = orders.filter(function (item) {
		console.log(item, order)
		return (item.amount !== order.amount && item.fruit !== order.fruit)
	})
	orders = newOrders
	console.log(orders)
	renderOrderList()
}
const sendOrder = (e) => {
	const naamInput = document.getElementById('name')
	const naam = naamInput.value
	if (naam === '') {
		return alert('De naam veld mag niet leg zijn !!')
	}
	const data = { naam, orders }
	console.log(data)
}
const addFruitButton = document.getElementById('addFruit')
addFruitButton.addEventListener('click', function (e) {
	const amount = amountSelect.value
	const fruit = fruitSelect.value

	if (amount === 'kies' || fruit === 'kies') {
		return alert('selecteer hoeveelheid en fruit')
	}
	addOrder({
		amount: Number.parseInt(amount),
		fruit
	})
	amountSelect.value = 'kies'
	fruitSelect.value = 'kies'
	renderOrderList()
})

const sendButton = document.getElementById('send')
sendButton.addEventListener('click', sendOrder)

/* FRUIT */
const fruittoevoegenButton = document.getElementById('extrafruittoevoegen')
fruittoevoegenButton.addEventListener('click', function (e) {
	const fruittoevoegenInput = document.getElementById('extrafruit')
	const fruitName = fruittoevoegenInput.value
	addFruitToFruitList(fruitName)
	fruittoevoegenInput.value = ''
})

const addFruitToFruitList = (fruitName) => {
	const url = 'https://scripts.appsaloon.be/api/fruit';
	// The data we are going to send in our request
	let data = {
		name: fruitName
	}
	// The parameters we are gonna pass to the fetch function
	let fetchData = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({ "Content-Type": "application/json" })
	}
	fetch(url, fetchData)
		.then(function () {
			renderFruitSelect(fruitSelect)
		});
}
