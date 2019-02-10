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

    var newTask = document.querySelector("textarea");
    var createButton = document.querySelector(".button--create");
    var body = document.querySelector("body");
    var tasksList = document.querySelector(".tasks__list");

    createButton.addEventListener("click", function () {

        var shadowBox = document.createElement("div");
        shadowBox.classList.add("shadowbox");

        var form = document.createElement("div");
        form.classList.add("shadowbox__form");
        shadowBox.appendChild(form);

        var formTitle = document.createElement("h2");
        formTitle.innerText = "Wpisz co i kiedy masz do zrobienia:"
        formTitle.classList.add("shadowbox__form__title");
        form.appendChild(formTitle);

        var inputBox = document.createElement("div");
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
        addButton.innerText = "+";
        form.appendChild(addButton);
        addButton.addEventListener("click", function () {

            var taskTextInput = document.querySelector(".shadowbox__form__inputbox__text");
            var newTask = document.createElement("li");
            newTask.innerText = taskTextInput.value;

            tasksList.appendChild(newTask);

            closeShadowBox();

        });

        var closeButton = document.createElement("button");
        closeButton.classList.add("button");
        closeButton.classList.add("button--close");
        closeButton.innerText = "x";
        form.appendChild(closeButton);
        closeButton.addEventListener("click", closeShadowBox);
        body.appendChild(shadowBox);

    })

    // console.log(newTask);

    function resizeHeight(event) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + 5 + "px";
    };

    function closeShadowBox(event) {
        var shadowBox = document.querySelector(".shadowbox");
        body.removeChild(shadowBox);
    }






















})
