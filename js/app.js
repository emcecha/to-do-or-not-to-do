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

    var formButton = document.querySelector(".button--create");
    var labelsButton = document.querySelector(".button--labels");
    var body = document.querySelector("body");
    var tasksList = document.querySelector(".tasks__list");
    var labelsList = document.querySelector(".labels__list");
    var taskFormText = document.querySelector(".task-form__text");
    var allTasksArr = [];
    var labelsArr = [];
    var colorPalleteArr = ["#ee534f", "#ec407a", "#aa47bc", "#7e57c2", "#5c6bc0", "#42a5f6", "#28b6f6", "#25c6da", "#26a59a", "#66bb6a", "#9ccc66", "#d4e056", "#ffee58", "#ffc928", "#ffa827", "#ff7143", "#8c6e64", "#bdbdbd", "#78909c", "#546f7a"];

    for (var i = 0; i < colorPalleteArr.length; i++) {

        var div = document.createElement("div");
        tasksList.appendChild(div);
        div.style.backgroundColor = colorPalleteArr[i];
        div.style.width = "100px";
        div.style.height = "100px";
        div.style.display = "inline-block";
        div.style.margin = "10px";
    }

    function createNewTaskForm(event) {

        var shadowBox = createShadowbox();

        var taskForm = document.createElement("form");
        taskForm.classList.add("task-form");
        shadowBox.appendChild(taskForm);

        var taskFormTitle = document.createElement("h2");
        taskFormTitle.innerText = "Wpisz co i kiedy:";
        taskFormTitle.classList.add("task-form__title");
        taskForm.appendChild(taskFormTitle);

        var closeButton = createButton(taskForm);
        closeButton.classList.add("button--close");
        closeButton.classList.add("fas");
        closeButton.addEventListener("click", deleteShadowBox);
        closeButton.addEventListener("mouseover", setDarkButton);
        closeButton.addEventListener("mouseout", resetDarkButton);

        var taskFormInputBox = document.createElement("formfield");
        taskFormInputBox.classList.add("task-form__inputbox");
        taskForm.appendChild(taskFormInputBox);

        var taskFormTextInput = document.createElement("textarea");
        taskFormTextInput.classList.add("task-form__text");
        taskFormInputBox.appendChild(taskFormTextInput);


        var taskFormDateInput = document.createElement("input");
        taskFormDateInput.type = "date";
        taskFormDateInput.classList.add("task-form__date");
        taskFormInputBox.appendChild(taskFormDateInput);

        var priorityThreeButton = document.createElement("button");
        priorityThreeButton.classList.add("button");
        priorityThreeButton.classList.add("button--priority-three");
        priorityThreeButton.classList.add("fas");
        priorityThreeButton.type = "button";
        taskFormInputBox.appendChild(priorityThreeButton);

        var priorityTwoButton = document.createElement("button");
        priorityTwoButton.classList.add("button");
        priorityTwoButton.classList.add("button--priority-two");
        priorityTwoButton.classList.add("fas");
        priorityTwoButton.type = "button";
        taskFormInputBox.appendChild(priorityTwoButton);

        var priorityOneButton = document.createElement("button");
        priorityOneButton.classList.add("button");
        priorityOneButton.classList.add("button--priority-one");
        priorityOneButton.classList.add("fas");
        priorityOneButton.type = "button";
        taskFormInputBox.appendChild(priorityOneButton);

        var addTaskButton = createButton(taskForm);
        addTaskButton.classList.add("button--add");
        addTaskButton.classList.add("fas");
        addTaskButton.addEventListener("mouseover", setDarkButton);
        addTaskButton.addEventListener("mouseout", resetDarkButton);
        addTaskButton.addEventListener("click", addNewTaskObj)

    }

    function Task(id,content,date,finished) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.finished = false;

    }

    function addNewTaskObj(event) {

        var id = new Date().getTime();
        var content = document.querySelector(".task-form__text").value;
        var inputDate = document.querySelector(".task-form__date");
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
        this.style.height = this.scrollHeight + 6 + "px";

    }

    function deleteShadowBox(event) {

        var shadowBox = document.querySelector(".shadowbox");
        body.removeChild(shadowBox);

    }

    function createShadowbox() {

        var shadowBox = document.createElement("div");
        shadowBox.classList.add("shadowbox");
        body.appendChild(shadowBox);
        return shadowBox;

    }

    function createButton(el) {

        var button = document.createElement("button");
        button.classList.add("button");
        button.type = "button";
        el.appendChild(button);
        return button;

    }

    function setDarkButton(event) {

        if (this.className.indexOf("button--dark") === -1) {
            this.classList.add("button--dark");
        }

    }

    function resetDarkButton(event) {

        if (this.className.indexOf("button--dark") > -1) {
            this.classList.remove("button--dark");
        }

    }

    function createNewLabelForm(event) {

        var shadowBox = createShadowbox();

        var labelForm = document.createElement("form");
        labelForm.classList.add("label-form");
        shadowBox.appendChild(labelForm);

        var labelFormTitle = document.createElement("h2");
        labelFormTitle.innerText = "Nazwij etykietę:";
        labelFormTitle.classList.add("label-form__title");
        labelForm.appendChild(labelFormTitle);

        var labelFormInputBox = document.createElement("formfield");
        labelFormInputBox.classList.add("label-form__inputbox");
        labelForm.appendChild(labelFormInputBox);

        var closeButton = createButton(labelForm);
        closeButton.classList.add("button--close");
        closeButton.classList.add("fas");
        closeButton.addEventListener("click", deleteShadowBox);
        closeButton.addEventListener("mouseover", setDarkButton);
        closeButton.addEventListener("mouseout", resetDarkButton);

        var pickColorButton = createButton(labelFormInputBox);
        pickColorButton.classList.add("button--pick-color");
        pickColorButton.classList.add("fas");
        pickColorButton.addEventListener("mouseover", setDarkButton);
        pickColorButton.addEventListener("mouseout", resetDarkButton);
        pickColorButton.addEventListener("click", createColorPicker);

        var labelFormInput = document.createElement("input");
        labelFormInput.classList.add("label-form__text");
        labelFormInput.type = "text";
        labelFormInputBox.appendChild(labelFormInput);

        var addLabelButton = createButton(labelFormInputBox);
        addLabelButton.classList.add("button--add");
        addLabelButton.classList.add("fas");
        addLabelButton.addEventListener("mouseover", setDarkButton);
        addLabelButton.addEventListener("mouseout", resetDarkButton);
        addLabelButton.addEventListener("click", addNewLabelObj);

    }

    function createColorPicker(event) {

        if (event.target != event.currentTarget) {
            return;
        }

        if (this.className.indexOf("button--clicked") > 0) {

            this.classList.remove("button--clicked");
            this.removeChild(this.firstElementChild);
            return;

        } else {

            this.classList.add("button--clicked");

        }

        var colorBox = document.createElement("div");
        this.appendChild(colorBox);
        colorBox.classList.add("label-form__color-box");

        for (var i = 0; i < colorPalleteArr.length; i++) {

            var color = document.createElement("div");
            color.classList.add("label-form__color");
            color.style.backgroundColor = colorPalleteArr[i];
            color.addEventListener("click", colorOnClick);
            colorBox.appendChild(color);

        }

    }

    function colorOnClick(event) {

        var selectedColor = this.style.backgroundColor;
        var pickColorButton = this.parentElement.parentElement;

        pickColorButton.style.backgroundColor = selectedColor;
        pickColorButton.classList.remove("button--clicked");
        pickColorButton.classList.remove("button--dark");

        var toDelete = this.parentElement;
        toDelete.parentElement.removeChild(toDelete);

    }

    function Label(name,color) {

        this.name = name;
        this.color = color;

    }

    function addNewLabelObj(event) {

        var name = document.querySelector(".label-form__text").value;
        var color = document.querySelector(".button--pick-color").style.backgroundColor;

        var newLabel = new Label(name,color);
        labelsArr.push(newLabel);

        console.log(labelsArr);
        sortLabelsArrOnName(labelsArr);
        console.log(labelsArr);
        createLabelList(labelsArr);

    }

    function sortLabelsArrOnName(arr) {

        arr.sort(function(a, b) {

            var nameOne = a.name.toLowerCase();
            var nameTwo = b.name.toLowerCase();

            if (nameOne < nameTwo) {
                return -1;
            }

            if (nameOne > nameTwo) {
                return 1;
            }

            return 0;

        });

    }

    function createLabelList(arr) {

        for (var i = 0; i < arr.length; i++) {

            var listItem = document.createElement("li");
            listItem.classList.add("labels__item");
            labelsList.appendChild(listItem);

            var itemColor = document.createElement("span");
            console.log(itemColor);
            itemColor.classList.add("labels__color");
            itemColor.style.backgroundColor = arr[i].color;
            listItem.appendChild(itemColor);

            var itemName = document.createElement("p");
            itemName.classList.add("labels__name");
            itemName.innerText = arr[i].name;
            listItem.appendChild(itemName);

        }
    }


    taskFormText.addEventListener("input", resizeHeight);
    formButton.addEventListener("click", createNewTaskForm);
    labelsButton.addEventListener("click", createNewLabelForm);






















})
