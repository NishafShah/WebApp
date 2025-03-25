const inputbox = document.getElementById('input-box');
const listcontainer = document.getElementById('list-container');

function AddTask() {
    if (inputbox.value === '') {
        alert("You must write something here");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputbox.value = "";
    savedata();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

listcontainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        let currentText = e.target.childNodes[0].textContent;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        e.target.innerHTML = "";
        e.target.appendChild(input);
        input.focus();

        input.addEventListener("blur", function () {
            if (input.value === '') {
                alert("You must write something here");
                input.focus();
            } else {
                e.target.innerHTML = input.value;
                let span = document.createElement('span');
                span.innerHTML = '\u00d7';
                e.target.appendChild(span);
                savedata();
            }
        });

        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
});

function savedata() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showtask() {
    listcontainer.innerHTML = localStorage.getItem("data");
}

showtask();
