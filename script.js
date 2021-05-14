const addText = document.querySelector('.addText');
const btn = document.querySelector('.btn-outline-success');
const todo = document.querySelector('.todo');
let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    showMessage();
}

btn.addEventListener('click', () => {
    const newTodo = {
        todo: addText.value,
        important: false,
        checked: false
    }
    todoList.push(newTodo);
    showMessage()
    localStorage.setItem('todo', JSON.stringify(todoList));
    addText.value = '';
});

function showMessage() {
    let addTodo = '';

    todoList.forEach((item, i) => {
        addTodo += `
        <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class = '${item.important ? 'important' : ''}'>${item.todo}</label>
        <button type="button" id='recycle_${i}' class="btn btn-outline-success delete">&#x267A;</button>
        </li>
        `;
        todo.innerHTML = addTodo;
    });


    for (let i = 0; i < todoList.length; i++) {
        let recycleBtn = document.getElementById(`recycle_${i}`);
        recycleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            recycleBtn.parentNode.remove();
            todoList.splice(i, 1);
            localStorage.setItem('todo', JSON.stringify(todoList));
            console.log(todoList);
        })
    }


}



todo.addEventListener('change', (e) => {

    let forLabel = todo.querySelector('[for=' + e.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach((item, i) => {
        if (item.todo === forLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})

todo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    todoList.forEach (item => {
        if(item.todo === e.target.innerHTML) {
            item.important = !item.important;
            localStorage.setItem('todo', JSON.stringify(todoList));
            showMessage();
        }
    })
})





