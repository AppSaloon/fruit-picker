const choicesTest = document.getElementById('choicesTest')
const choices = new Choices(choicesTest, {
    items: [],
    choices: [{ label: 'apple', value: 'apple' }],
    addItems: true,
    maxItemCount: 1,
    removeItemButton: true
})

choicesTest.addEventListener(
    'addItem',
    function (event) {
        // do something creative here...
        console.log(event.detail.id);
        console.log(event.detail.value);
        console.log(event.detail.label);
        console.log(event.detail.customProperties);
        console.log(event.detail.groupValue);
    },
    false,
);