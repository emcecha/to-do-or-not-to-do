document.addEventListener("DOMContentLoaded", function () {

    // var addTaskButton = document.querySelector("#addTaskButton");
    // var taskInput = document.querySelector("#taskInput");
    //
    // console.log(addTaskButton);
    // console.log(taskInput);
    //
    // addTaskButton.addEventListener("click", function () {
    //
    // })

    var createButton = document.querySelector(".button--create");
    var body = document.querySelector("body");
    var tasksList = document.querySelector(".tasks__list");

    function createNewTaskForm() {

        var shadowBox = document.createElement("div");
        shadowBox.classList.add("shadowbox");

        var form = document.createElement("form");
        form.classList.add("shadowbox__form");
        shadowBox.appendChild(form);
    }


    createButton.addEventListener("click", function () {



        var formTitle = document.createElement("h2");
        formTitle.innerText = "Wpisz co i kiedy masz do zrobienia:"
        formTitle.classList.add("shadowbox__form__title");
        form.appendChild(formTitle);

        var inputBox = document.createElement("formfield");
        inputBox.classList.add("shadowbox__form__inputbox");
        form.appendChild(inputBox);

        var taskTextInput = document.createElement("textarea");
        taskTextInput.classList.add("shadowbox__form__inputbox__text");
        inputBox.appendChild(taskTextInput);
        taskTextInput.addEventListener("input", resizeHeight);

        var taskDateInput = document.createElement("input");
        taskDateInput.type = "date";
        taskDateInput.classList.add("shadowbox__form__inputbox__date");
        inputBox.appendChild(taskDateInput);

        var addButton = document.createElement("button");
        addButton.classList.add("button");
        addButton.classList.add("button--add");
        addButton.type = "button";
        addButton.innerText = "+";
        form.appendChild(addButton);
        addButton.addEventListener("click", function () {

            var taskTextInput = document.querySelector(".shadowbox__form__inputbox__text");
            var taskDateInput = document.querySelector(".shadowbox__form__inputbox__date");

            if (taskTextInput.value.length > 0) {

                var newTaskBox = document.createElement("li");
                newTaskBox.classList.add("tasks__list__item");

                var newTaskText = document.createElement("p");
                newTaskText.classList.add("tasks__list__item__text");
                newTaskText.innerText = taskTextInput.value;
                newTaskBox.appendChild(newTaskText);

                var newTaskDate = document.createElement("p");
                newTaskDate.classList.add("tasks__list__item__date");
                newTaskDate.innerText = taskDateInput.value;
                console.log(new Date(taskDateInput.value).getTime());
                newTaskBox.appendChild(newTaskDate);

                tasksList.appendChild(newTaskBox);
                deleteShadowBox();

            }

        });

        var closeButton = document.createElement("button");
        closeButton.classList.add("button");
        closeButton.classList.add("button--close");
        closeButton.type = "button";
        closeButton.innerText = "x";
        form.appendChild(closeButton);
        closeButton.addEventListener("click", deleteShadowBox);
        body.appendChild(shadowBox);

    })


    function resizeHeight(event) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + 5 + "px";
    };

    function deleteShadowBox(event) {
        var shadowBox = document.querySelector(".shadowbox");
        body.removeChild(shadowBox);
    }






















})