var task_input = document.getElementById("taskInput"),
    task_btn = document.getElementById("taskBtn"),
    task_output = document.getElementById("tasksOutput"),
    counter_1 = document.getElementById("counterr"),
    finishT = document.getElementById("finishTASK"),
    text_content = JSON.parse(localStorage.getItem("task")) ? JSON.parse(localStorage.getItem("task")) : [];


window.onload = function() {
    for (let index = 0; index < text_content.length; index++) {
        const element = text_content[index];
        task_output.innerHTML += `<li class="list-group-item d-flex justify-content-between align-item-center task">${element} 
    <i class="fa-solid fa-trash text-danger"></i>
    
   </li>`
    }
    countTasks();
    deleteIcons();
}


task_input.addEventListener("keyup", function(ev) {
    if (ev.key === "Enter") {
        let taskValue = task_input.value
        if (taskValue !== "") {
            if (text_content.includes(task_input.value)) {
                alert("this task is founded ")
                afterTask();
            } else {

                addNewtask();
                afterTask();
                countTasks();
                finishTask();
                deleteIcons();
                updateTask();
                saveInlocalstorage();
            }
        } else {
            alert("this is empty")
        }
    }
})
task_btn.addEventListener("click", function() {
    let taskValue = task_input.value
    if (taskValue !== "") {
        if (text_content.includes(task_input.value)) {
            alert("this task is founded ")
            afterTask();
        } else {

            addNewtask();
            afterTask();
            countTasks();
            finishTask();
            deleteIcons();
            updateTask();
            saveInlocalstorage();
        }
    } else {
        alert("this is empty")
    }
})


function addNewtask() {
    task_output.innerHTML += `<li class="list-group-item d-flex justify-content-between align-item-center task">${task_input.value} 
     <i class="fa-solid fa-trash text-danger"></i>
     
    </li>`
}

function afterTask() {
    task_input.focus();
    task_input.value = "";
}

function countTasks() {
    counter_1.innerHTML = task_output.children.length

}

function finishTask() {
    for (let index = 0; index < task_output.children.length; index++) {
        const element = task_output.children[index];
        element.onclick = function() {
            element.classList.toggle("finish")
                // console.log(document.getElementsByClassName("finish").length)
            countfinish();
        }

    }
}

function countfinish() {
    finishT.innerHTML = document.getElementsByClassName("finish").length
}

function deleteIcons() {
    var delete_icons = document.getElementsByClassName("fa-trash")
    for (let index = 0; index < delete_icons.length; index++) {
        const delete_icon = delete_icons[index];
        delete_icon.onclick = function(ev) {
            ev.stopPropagation();
            delete_icon.parentElement.remove();
            countTasks();
            finishTask();
            countfinish();
            updateTask();
            saveInlocalstorage();
        }
    }
}

function updateTask() {
    text_content = [];
    for (let index = 0; index < task_output.children.length; index++) {
        const element = task_output.children[index];
        text_content.push(element.textContent.trim())
    }
}

function saveInlocalstorage() {
    localStorage.setItem("task", JSON.stringify(text_content))
}