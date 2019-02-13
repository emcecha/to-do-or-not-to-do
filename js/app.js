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
    var allTasksArr = [];

    function createNewTaskForm(event) {

        var shadowBox = document.createElement("div");
        shadowBox.classList.add("shadowbox");

        var form = document.createElement("form");
        form.classList.add("form");
        shadowBox.appendChild(form);

        var formTitle = document.createElement("h2");
        formTitle.innerText = "Wpisz co i kiedy:"
        formTitle.classList.add("form__title");
        form.appendChild(formTitle);

        var inputBox = document.createElement("formfield");
        inputBox.classList.add("form__inputbox");
        form.appendChild(inputBox);

        var taskTextInput = document.createElement("textarea");
        taskTextInput.classList.add("form__text");
        inputBox.appendChild(taskTextInput);
        taskTextInput.addEventListener("input", resizeHeight);

        var taskDateInput = document.createElement("input");
        taskDateInput.type = "date";
        taskDateInput.classList.add("form__date");
        inputBox.appendChild(taskDateInput);

        var priorityThreeButton = document.createElement("button");
        priorityThreeButton.classList.add("button");
        priorityThreeButton.classList.add("button--priority-three");
        priorityThreeButton.classList.add("fas");
        priorityThreeButton.type = "button";
        inputBox.appendChild(priorityThreeButton);

        var priorityTwoButton = document.createElement("button");
        priorityTwoButton.classList.add("button");
        priorityTwoButton.classList.add("button--priority-two");
        priorityTwoButton.classList.add("fas");
        priorityTwoButton.type = "button";
        inputBox.appendChild(priorityTwoButton);

        var priorityOneButton = document.createElement("button");
        priorityOneButton.classList.add("button");
        priorityOneButton.classList.add("button--priority-one");
        priorityOneButton.classList.add("fas");
        priorityOneButton.type = "button";
        inputBox.appendChild(priorityOneButton);

        var closeButton = document.createElement("button");
        closeButton.classList.add("button");
        closeButton.classList.add("button--close");
        closeButton.type = "button";
        closeButton.innerText = "x";
        form.appendChild(closeButton);
        closeButton.addEventListener("click", deleteNewTaskForm);
        body.appendChild(shadowBox);

        var addButton = document.createElement("button");
        addButton.classList.add("button");
        addButton.classList.add("button--add");
        addButton.type = "button";
        addButton.innerText = "+";
        form.appendChild(addButton);
        addButton.addEventListener("click", addNewTaskObj)
    }

    function Task(id,content,date,finished) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.finished = false;

    }

    function addNewTaskObj(event) {

        var id = new Date().getTime();
        var content = document.querySelector(".form__text").value;
        var inputDate = document.querySelector(".form__date");
        var date = new Date(inputDate.value);
        var finished = false;

        var newTask = new Task(id,content,date,finished);
        allTasksArr.push(newTask);

        sortTaskArrOnDate(allTasksArr);

        createTaskList(allTasksArr);
    }

    function createTaskList(arr) {

        for (var i = 0; i < arr.length; i++) {

            var listItem = document.createElement("li");
            listItem.classList.add("tasks__item");
            listItem.dataset.id = arr[i].id;
            tasksList.appendChild(listItem);

            var taskText = document.createElement("p");
            taskText.classList.add("tasks__text");
            taskText.innerText = arr[i].content;
            listItem.appendChild(taskText);

            var taskDate = document.createElement("p");
            taskDate.classList.add("tasks__date");
            var dayNum = arr[i].date.getDate();
            var monthNum = arr[i].date.getMonth();
            taskDate.innerText = dayNum + " " + getMonthName(monthNum);
            listItem.appendChild(taskDate);
        }
    }

    function getMonthName(num) {

        if (num === 0) {return "styczeń";}
        if (num === 1) {return "luty";}
        if (num === 2) {return "marzec";}
        if (num === 3) {return "kwiecień";}
        if (num === 4) {return "maj";}
        if (num === 5) {return "czerwiec";}
        if (num === 6) {return "lipiec";}
        if (num === 7) {return "lipiec";}
        if (num === 8) {return "sierpień";}
        if (num === 9) {return "wrzesień";}
        if (num === 10) {return "październik";}
        if (num === 11) {return "listopad";}
        if (num === 12) {return "grudzień";}

    }

    function sortTaskArrOnDate(arr) {
        arr.sort(function (a,b) {
            return a.date - b.date;
        });
    }

    function resizeHeight(event) {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + 5 + "px";
    }

    function deleteNewTaskForm(event) {
        var shadowBox = document.querySelector(".shadowbox");
        body.removeChild(shadowBox);
    }

    createButton.addEventListener("click", createNewTaskForm)






















})
