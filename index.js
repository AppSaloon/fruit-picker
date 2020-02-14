let orders = []

// generate amount selector
const amountSelect = document.getElementById("aantal")
for (var i = 1; i < 10; i++) {
	const option = document.createElement("option")
	option.textContent = i
	option.value = i
	amountSelect.appendChild(option)
}

// generate fruit selector
const fruitSelect = document.getElementById("fruit")
const fruits = ['apple', 'citroen', 'mango']
for (const fruit of fruits) {
	const option = document.createElement("option")
	option.text = fruit
	option.value = fruit
	fruitSelect.add(option, null)
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

const renderOrderList = () => {
	const orderList = document.getElementById('orderList')
	orderList.innerHTML = ""
	for (const order of orders) {
		// create deleteButton
		const deleteButton = document.createElement('button')
		deleteButton.innerText = 'delete'
		deleteButton.addEventListener('click', (e) => {
			deleteOrder(order)
		})

		// create order list item
		const orderItem = document.createElement('li')
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

renderOrderList()

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

const sendButton = document.getElementById('send')
sendButton.addEventListener('click', function (e) {
	const naamInput = document.getElementById('name')
	const naam = naamInput.value
	if (naam === ' ') {
		return alert('vul uw naam in aub !!')
	}

	const oderInput = document.getElementById('orderList')
	const order = oderInput.value
	// console.log('verzenden')
	//console.dir(oderInput)

})




