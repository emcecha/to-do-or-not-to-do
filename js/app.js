document.addEventListener("DOMContentLoaded", function () {

    var body = document.querySelector("body");
    var shadowbox = document.querySelector(".shadowbox");

    var newTaskButton = document.querySelector(".button--new-task");
    var newTaskForm = document.querySelector(".task-form");
    var newTaskText = document.querySelector(".task-form__text");
    var newTaskDate = document.querySelector(".task-form__date");
    var pickLabelButton = document.querySelector(".button--label-picker");
    var labelPicker = document.querySelector(".label-picker");
    var pickedLabelsBox = document.querySelector(".task-form__labels-box");
    var pickedLabelsList = document.querySelector(".task-labels");
    var pickColorButton = document.querySelector(".button--color-picker");
    var colorPicker = document.querySelector(".color-picker");
    var selectPriorityButton = document.querySelector(".button--priority");
    var priorityButtons = document.querySelector(".task-form__priority-list").children;
    var priorityOneButton = document.querySelector(".button--priority-one");

    var labelsDiv = document.querySelector(".labels");
    var labelsList = document.querySelector(".labels__list");
    var newLabelButton = document.querySelector(".button--new-label");
    var newLabelForm = document.querySelector(".label-form");
    var newLabelName = document.querySelector(".label-form__text");
    var addLabelButton = document.querySelector(".button--add-label");

    var closeButtons = document.querySelectorAll(".button--close");

    var tasksList = document.querySelector(".tasks__list");
    var labelsList = document.querySelector(".labels__list");
    var taskFormText = document.querySelector(".task-form__text");

    var allTasksArr = [];
    var labelsArr = [];
    var colorPalleteArr = ["#ee534f", "#ec407a", "#aa47bc", "#7e57c2", "#5c6bc0", "#42a5f6", "#28b6f6", "#25c6da", "#26a59a", "#66bb6a", "#9ccc66", "#d4e056", "#ffee58", "#ffc928", "#ffa827", "#ff7143", "#8c6e64", "#bdbdbd", "#78909c", "#546f7a"];

    function showForm(event) {

        shadowbox.classList.add("visible");

        if (this.className.indexOf("button--new-task") > -1) {
            newTaskForm.classList.add("visible");
        }

        if (this.className.indexOf("button--new-label") > -1) {
            newLabelForm.classList.add("visible");
        }
    }

    function hideForm(event) {

        shadowbox.classList.remove("visible");

        if (newTaskForm.className.indexOf("visible") > -1) {

            newTaskForm.classList.remove("visible");

            newTaskText.value = "";
            newTaskDate.value = "";

            var iconClone = priorityButtons[0].firstElementChild.cloneNode(true);
            var iconToReplace = selectPriorityButton.firstElementChild;
            selectPriorityButton.replaceChild(iconClone, iconToReplace);
            var priorityClassToRemove = selectPriorityButton.classList[2];
            selectPriorityButton.classList.remove(priorityClassToRemove);
            selectPriorityButton.classList.add("button--priority-one");

            var pickedLabelsList = document.querySelector(".task-labels");

            if (pickedLabelsList != null) {
                pickedLabelsBox.removeChild(pickedLabelsList);
                return pickedLabelsList;
            }
        }

        if (newLabelForm.className.indexOf("visible") > -1) {

            newLabelForm.classList.remove("visible");
            newLabelName.value = "";
            pickColorButton.style.backgroundColor = "";
        }
    }

    function createColorPicker() {

        for (var i = 0; i < colorPalleteArr.length; i++) {

            var color = document.createElement("div");
            color.classList.add("color-picker__color");
            color.style.backgroundColor = colorPalleteArr[i];
            color.addEventListener("click", colorOnClick);
            colorPicker.appendChild(color);
        }
    }

    function colorOnClick(event) {

        var selectedColor = this.style.backgroundColor;
        pickColorButton.style.backgroundColor = selectedColor;
    }

    function Label(name,color) {

        this.name = name;
        this.color = color;
    }

    function addNewLabelObj(event) {

        var name = newLabelName.value;

        if (name === "") {
            return;
        }

        var color = pickColorButton.style.backgroundColor;

        if (color === "") {
            return;
        }

        var newLabel = new Label(name,color);
        labelsArr.push(newLabel);

        sortLabelsArrOnName(labelsArr);
        createLabelsList(labelsArr);
        createLabelPicker();
        hideForm();
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

    function createLabelsList(arr) {

        if (labelsList != null) {
            labelsDiv.removeChild(labelsList);
        }

        labelsList = document.createElement("ul");
        labelsList.classList.add("labels__list");
        labelsDiv.appendChild(labelsList);

        for (var i = 0; i < arr.length; i++) {

            var listItem = document.createElement("li");
            listItem.classList.add("labels__item");
            labelsList.appendChild(listItem);

            var itemColor = document.createElement("div");
            itemColor.classList.add("labels__color");
            itemColor.style.backgroundColor = arr[i].color;
            listItem.appendChild(itemColor);

            var itemName = document.createElement("p");
            itemName.classList.add("labels__name");
            itemName.innerText = arr[i].name;
            listItem.appendChild(itemName);
        }
    }

    function createLabelPicker() {

        if (labelPicker != null) {
            pickLabelButton.removeChild(labelPicker);
        }

        if (labelsList === null) {
            return;
        }

        labelPicker = labelsList.cloneNode(true);
        labelPicker.classList.add("label-picker");
        labelPicker.classList.remove("labels__list");
        pickLabelButton.appendChild(labelPicker);

        for (var i = 0; i < labelPicker.children.length; i++) {

            labelPicker.children[i].classList.add("label-picker__item");
            labelPicker.children[i].classList.remove("labels__item");
            labelPicker.children[i].addEventListener("click", addLabelToTask);

            for (var j = 0; j < labelPicker.children[i].children.length; j++) {

                labelPicker.children[i].children[0].classList.add("label-picker__color");
                labelPicker.children[i].children[0].classList.remove("labels__color");

                labelPicker.children[i].children[1].classList.add("label-picker__name");
                labelPicker.children[i].children[1].classList.remove("labels__name");
            }
        }
    }

    function addLabelToTask(event) {

        var pickedLabelsList = document.querySelector(".task-labels");

        if (pickedLabelsList === null) {
            pickedLabelsList = document.createElement("ul");
            pickedLabelsList.classList.add("task-labels");
            pickedLabelsBox.appendChild(pickedLabelsList);
        }

        var color = event.currentTarget.children[0].style.backgroundColor;
        var name = event.currentTarget.children[1].innerText;

        var pickedLabel = document.createElement("li");
        pickedLabel.classList.add("task-labels__item");
        pickedLabel.style.backgroundColor = color;
        pickedLabel.innerText = name;
        pickedLabelsList.appendChild(pickedLabel);

        var removeLabelButton = document.createElement("span");
        removeLabelButton.classList.add("task-labels__remove")
        var closeIcon = closeButtons[0].firstElementChild.cloneNode(true);
        removeLabelButton.addEventListener("click", removeListItem)
        removeLabelButton.appendChild(closeIcon);
        pickedLabel.appendChild(removeLabelButton);
    }

    function removeListItem(event) {
        
        var toDelete = this.parentElement;
        toDelete.parentElement.removeChild(toDelete);
    }

    function selectTaskPriority(event) {

        var priorityClassToRemove = selectPriorityButton.classList[2];
        selectPriorityButton.classList.remove(priorityClassToRemove);

        var priorityClassToAdd = this.classList[1];
        selectPriorityButton.classList.add(priorityClassToAdd);

        var iconClone = this.firstElementChild.cloneNode(true);
        var iconToReplace = selectPriorityButton.firstElementChild;
        selectPriorityButton.replaceChild(iconClone, iconToReplace);
    }

    function Task(id,content,date,arr,finished) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.labels = arr;
        this.priority = 1;
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

        this.style.height = "45px";
        this.style.height = this.scrollHeight + 6 + "px";

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










    taskFormText.addEventListener("input", resizeHeight);
    newTaskButton.addEventListener("click", showForm);

    for (var i = 0; i < priorityButtons.length; i++) {
        priorityButtons[i].addEventListener("click", selectTaskPriority);
    }

    newLabelButton.addEventListener("click", showForm);

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", hideForm);
    }

    createColorPicker();
    addLabelButton.addEventListener("click", addNewLabelObj);
    // formButton.addEventListener("click", createNewTaskForm);
    // labelsButton.addEventListener("click", createNewLabelForm);






















})
