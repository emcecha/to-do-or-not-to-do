document.addEventListener("DOMContentLoaded", function () {

    // localStorage.clear();

    var body = document.querySelector("body");
    var tasks = document.querySelector(".tasks");
    var shadowbox = document.querySelector(".shadowbox");

    var newTaskButton = document.querySelector(".button-big--new-task");
    var newTaskForm = document.querySelector(".task-form");
    var newTaskText = document.querySelector(".task-form__text");
    var newTaskDate = document.querySelector(".task-form__date");
    var pickLabelButton = document.querySelector(".button-big--label-picker");
    var labelPicker = document.querySelector(".label-picker");
    var pickedLabelsBox = document.querySelector(".task-form__labels-box");
    var pickedLabelsList = document.querySelector(".task-labels");
    var selectPriorityButton = document.querySelector(".button-big--priority");
    var priorityButtons = document.querySelector(".task-form__priority-list").children;
    var priorityOneButton = document.querySelector(".button-big--priority-one");
    var priorityTwoButton = document.querySelector(".button-big--priority-two");
    var priorityThreeButton = document.querySelector(".button-big--priority-three");
    var addTaskButton = document.querySelector(".button-big--add-task");
    var editTaskButton = document.querySelector(".button-big--edit-task");

    var labelsDiv = document.querySelector(".labels");
    var newLabelButton = document.querySelector(".button-small--new-label");
    var newLabelForm = document.querySelector(".label-form");
    var newLabelName = document.querySelector(".label-form__text");
    var pickColorButton = document.querySelector(".button-big--color-picker");
    var colorPicker = document.querySelector(".color-picker");
    var addLabelButton = document.querySelector(".button-big--add-label");
    var editLabelButton = document.querySelector(".button-big--edit-label");

    var closeButtons = document.querySelectorAll(".button-small--close");

    var tasksList = document.querySelector(".tasks__list");
    var labelsList = document.querySelector(".labels__list");

    var allTasksArr = [];
    var labelsArr = [];
    var colorPalleteArr = ["#ee534f", "#ec407a", "#aa47bc", "#7e57c2", "#5c6bc0", "#42a5f6", "#28b6f6", "#25c6da", "#26a59a", "#66bb6a", "#9ccc66", "#d4e056", "#ffee58", "#ffc928", "#ffa827", "#ff7143", "#8c6e64", "#bdbdbd", "#78909c", "#546f7a"];

    function showForm(event) {

        shadowbox.classList.add("visible");

        if (this.className.indexOf("button-big--new-task") > -1) {
            newTaskForm.classList.add("visible");
            addTaskButton.classList.add("visible");
        }

        if (this.className.indexOf("button-small--new-label") > -1) {
            newLabelForm.classList.add("visible");
            addLabelButton.classList.add("visible");
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
            var priorityClassToRemove = selectPriorityButton.classList[3];
            selectPriorityButton.classList.remove(priorityClassToRemove);
            selectPriorityButton.classList.add("button-big--priority-one");

            newTaskText.style.height = "45px";

            if (addTaskButton.className.indexOf("visible") > -1) {
                addTaskButton.classList.remove("visible");
            }

            if (editTaskButton.className.indexOf("visible") > -1) {
                editTaskButton.classList.remove("visible");
            }

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

            if (addLabelButton.className.indexOf("visible") > -1) {
                addLabelButton.classList.remove("visible");
            }

            if (editLabelButton.className.indexOf("visible") > -1) {
                editLabelButton.classList.remove("visible");
            }
        }
    }

    function createColorPicker() {

        for (var i = 0; i < colorPalleteArr.length; i++) {

            var color = document.createElement("div");
            color.classList.add("button-small");
            color.classList.add("button-small--color");
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

        for (var i = 0; i < labelsArr.length; i++) {

            if (labelsArr[i].name.toLowerCase() === name.toLowerCase()) {
                return;
            }
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
        updateLocalStorage("labels",labelsArr);
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

        if (labelsArr.length === 0) {
            return;
        }

        labelsList = document.querySelector(".labels__list");

        if (labelsList != null) {
            labelsList.parentElement.removeChild(labelsList);
        }

        labelsList = document.createElement("ul");
        labelsList.classList.add("labels__list");
        labelsDiv.appendChild(labelsList);

        for (var i = 0; i < arr.length; i++) {

            var listItem = document.createElement("li");
            listItem.classList.add("labels__item");
            listItem.dataset.id = arr[i].name;
            labelsList.appendChild(listItem);

            var colorNameBox = document.createElement("div");
            colorNameBox.classList.add("labels__left-box");
            listItem.appendChild(colorNameBox);

            var itemColor = document.createElement("div");
            itemColor.classList.add("button-big");
            itemColor.classList.add("button-big--label-color");
            itemColor.style.backgroundColor = arr[i].color;
            colorNameBox.appendChild(itemColor);

            var itemName = document.createElement("p");
            itemName.classList.add("labels__name");
            itemName.innerText = arr[i].name;
            colorNameBox.appendChild(itemName);

            var editBox = document.createElement("div");
            editBox.classList.add("labels__right-box");
            listItem.appendChild(editBox);

            createEditButtons(editBox,labelsList);
        }
    }

    function createEditButtons(element) {

        var editButton = document.createElement("div");
        editButton.classList.add("button-small");
        editButton.addEventListener("click", buttonEditOnClick);
        element.appendChild(editButton);

        var editIcon = document.createElement("i");
        editIcon.className = "fas fa-pencil-alt";
        editButton.appendChild(editIcon);

        var trashButton = document.createElement("div");
        trashButton.classList.add("button-small");
        trashButton.addEventListener("click", buttonTrashOnClick);
        element.appendChild(trashButton);

        var trashIcon = document.createElement("i");
        trashIcon.className = "fas fa-trash-alt";
        trashButton.appendChild(trashIcon);
    }

    function createLabelPicker() {

        if (labelsArr.length === 0) {
            return;
        }

        labelPicker = document.querySelector(".label-picker");

        if (labelPicker != null) {
            labelPicker.parentElement.removeChild(labelPicker);
        }

        labelPicker = document.createElement("ul");
        labelPicker.classList.add("label-picker");
        pickLabelButton.appendChild(labelPicker);

        for (var i = 0; i < labelsArr.length; i++) {

            var labelPickerItem = document.createElement("div");
            labelPickerItem.classList.add("label-picker__item");
            labelPickerItem.addEventListener("click", addLabelToTask);
            labelPicker.appendChild(labelPickerItem);

            var labelPickerColor = document.createElement("div");
            labelPickerColor.classList.add("button-small");
            labelPickerColor.classList.add("button-small--label-picker");
            labelPickerColor.style.backgroundColor = labelsArr[i].color;
            labelPickerItem.appendChild(labelPickerColor);

            var labelPickerName = document.createElement("div");
            labelPickerName.classList.add("label-picker__name");
            labelPickerName.innerText = labelsArr[i].name;
            labelPickerItem.appendChild(labelPickerName);
        }
    }

    function addLabelToTask(color,name) {

        var pickedLabelsList = document.querySelector(".task-labels");

        if (pickedLabelsList === null) {
            pickedLabelsList = document.createElement("ul");
            pickedLabelsList.classList.add("task-labels");
            pickedLabelsBox.appendChild(pickedLabelsList);
        }

        if (this != window) {

            var color = this.children[0].style.backgroundColor;
            var name = this.children[1].innerText;

            for (var i = 0; i < pickedLabelsList.children.length; i++) {

                if (pickedLabelsList.children[i].innerText === name) {
                    return;
                }
            }
        }

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

        var item = this.parentElement;
        var list = this.parentElement.parentElement;
        item.parentElement.removeChild(item);

        if (list.children.length === 0) {
            list.parentElement.removeChild(list);
        }
    }

    function selectTaskPriority(priority) {

        var priorityClassToRemove = selectPriorityButton.classList[3];
        selectPriorityButton.classList.remove(priorityClassToRemove);
        var iconToReplace = selectPriorityButton.firstElementChild;
        var iconClone;
        var priorityClassToAdd;

        if (this != window) {

            priorityClassToAdd = this.classList[2];
            iconClone = this.firstElementChild.cloneNode(true);

        } else {

            if (priority === 1) {
                priorityClassToAdd = "button-big--priority-one";
                iconClone = priorityOneButton.firstElementChild.cloneNode(true);
            }

            if (priority === 2) {
                priorityClassToAdd = "button-big--priority-two";
                iconClone = priorityTwoButton.firstElementChild.cloneNode(true);
            }

            if (priority === 3) {
                priorityClassToAdd = "button-big--priority-three";
                iconClone = priorityThreeButton.firstElementChild.cloneNode(true);
            }
        }

        selectPriorityButton.classList.add(priorityClassToAdd);
        selectPriorityButton.replaceChild(iconClone, iconToReplace);
    }

    function Task(id,content,date,arr,priority,finished) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.labels = arr;
        this.priority = priority;
        this.finished = false;
    }

    function addNewTaskObj(event) {

        var id = new Date().getTime();
        var content = document.querySelector(".task-form__text").value;

        if (content === "") {
            return;
        }

        var date = "";
        var inputDate = document.querySelector(".task-form__date");

        if (inputDate.value != "") {
            date = new Date(inputDate.value);
        }

        pickedLabelsList = document.querySelector(".task-labels");
        var pickedLabelsArr = [];

        if (pickedLabelsList != null) {

            for (var i = 0; i < pickedLabelsList.children.length; i++) {

                var pickedLabelName = pickedLabelsList.children[i].innerText;
                pickedLabelsArr.push(pickedLabelName);
            }
        }

        var priority = 1;

        if (selectPriorityButton.className.indexOf("priority-two") > -1) {
            priority = 2;
        }

        if (selectPriorityButton.className.indexOf("priority-three") > -1) {
            priority = 3;
        }

        var finished = false;

        var newTask = new Task(id,content,date,pickedLabelsArr,priority,finished);
        allTasksArr.push(newTask);

        sortTaskArrOnPriority(allTasksArr);
        allTasksArr = sortTaskArrOnDate(allTasksArr);
        createTaskList(allTasksArr);
        updateLocalStorage("tasks",allTasksArr)
        hideForm();
    }

    function createTaskList(arr) {

        if (allTasksArr.length === 0) {
            return;
        }

        tasksList = document.querySelector(".tasks__list");

        if (tasksList != null) {
            tasksList.parentElement.removeChild(tasksList);
        }

        tasksList = document.createElement("ul");
        tasksList.classList.add("tasks__list");
        tasks.appendChild(tasksList);

        for (var i = 0; i < arr.length; i++) {

            var listItem = document.createElement("li");
            listItem.classList.add("tasks__item");
            listItem.dataset.id = arr[i].id;
            tasksList.appendChild(listItem);

            var finishButtonTextLabelBox = document.createElement("div");
            finishButtonTextLabelBox.classList.add("tasks__left-box")
            listItem.appendChild(finishButtonTextLabelBox);

            var finishButton = document.createElement("div");
            finishButton.classList.add("button-small");
            finishButton.classList.add("button-small--finish");

            var finishIcon = document.createElement("i");
            finishIcon.className = "fas fa-check";
            finishButton.appendChild(finishIcon);

            if (arr[i].priority === 1) {
                finishButton.classList.add("button-big--priority-one");
            }

            if (arr[i].priority === 2) {
                finishButton.classList.add("button-big--priority-two");
            }

            if (arr[i].priority === 3) {
                finishButton.classList.add("button-big--priority-three");
            }

            finishButtonTextLabelBox.appendChild(finishButton);

            var textLabelBox = document.createElement("div");
            textLabelBox.classList.add("tasks__text-label-box");
            finishButtonTextLabelBox.appendChild(textLabelBox);

            var taskText = document.createElement("p");
            taskText.classList.add("tasks__text");
            taskText.innerText = arr[i].content;
            textLabelBox.appendChild(taskText);

            var dateEditBox = document.createElement("div");
            dateEditBox.classList.add("tasks__right-box");
            listItem.appendChild(dateEditBox);

            var taskDate = document.createElement("p");
            taskDate.classList.add("tasks__date");

            if (arr[i].date != "") {

                var dayNum = new Date(arr[i].date).getDay();
                var monthDayNum = new Date(arr[i].date).getDate();
                var monthNum = new Date(arr[i].date).getMonth();
                taskDate.innerText =
                    getDayName(dayNum) + ", " + monthDayNum + " " + getMonthName(monthNum);
                dateEditBox.appendChild(taskDate);
            }

            createEditButtons(dateEditBox);

            var taskLabelList = document.createElement("ul");
            taskLabelList.classList.add("tasks__task-label-list");
            textLabelBox.appendChild(taskLabelList);

            for (var j = 0; j < arr[i].labels.length; j++) {

                var taskLabelItem = document.createElement("li");
                taskLabelItem.classList.add("tasks__task-label-item");
                taskLabelList.appendChild(taskLabelItem);

                taskLabelItem.innerText = arr[i].labels[j];

                for (var k = 0; k < labelsArr.length; k++) {

                    if (labelsArr[k].name === arr[i].labels[j] ) {

                        taskLabelItem.style.backgroundColor = labelsArr[k].color;
                        k = labelsArr.length;
                    }
                }
            }
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

    function getDayName(num) {

        if (num === 0) {return "niedziela";}
        if (num === 1) {return "poniedziałek";}
        if (num === 2) {return "wtorek";}
        if (num === 3) {return "środa";}
        if (num === 4) {return "czwartek";}
        if (num === 5) {return "piątek";}
        if (num === 6) {return "sobota";}
    }

    function sortTaskArrOnPriority(arr) {

        arr.sort(function (a,b) {
            return b.priority - a.priority;
        });
    }

    function sortTaskArrOnDate(arr) {

        var tasksWithDateArr = [];
        var tasksWithoutDateArr = [];

        for (var i = 0; i < arr.length; i++) {

            if (arr[i].date != "") {
                tasksWithDateArr.push(arr[i]);
            }

            if (arr[i].date === "") {
                tasksWithoutDateArr.push(arr[i]);
            }
        }

        tasksWithDateArr.sort(function (a,b) {
            var dateA = new Date(a.date).getTime();
            var dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });

        var sortedArr = tasksWithDateArr.concat(tasksWithoutDateArr);

        return sortedArr;
    }

    function resizeHeight(event) {

        this.style.height = "45px";
        this.style.height = this.scrollHeight + 7 + "px";
    }

    function updateLocalStorage(key,object) {

        var objectString = JSON.stringify(object);
        localStorage.setItem(key,objectString);
    }

    function buttonTrashOnClick(event) {

        var listItem = this.parentElement.parentElement;
        var id = listItem.dataset.id;

        if (listItem.className.indexOf("labels__item") > -1) {
            removeLabel(id);
        }

        if (listItem.className.indexOf("tasks__item") > -1) {
            removeTask(id);
        }
    }

    function removeLabel(id) {

        for (var i = 0; i < labelsArr.length; i++) {

            if (labelsArr[i].name === id) {

                labelsArr.splice(i,1);
                i = labelsArr.length;
            }
        }

        for (var i = 0; i < allTasksArr.length; i++) {

            for (var j = 0; j < allTasksArr[i].labels.length; j++) {

                if (id === allTasksArr[i].labels[j]) {

                    allTasksArr[i].labels.splice(j,1);
                }
            }
        }

        if (labelsArr.length === 0) {
            labelsList.parentElement.removeChild(labelsList);
            labelPicker.parentElement.removeChild(labelPicker);
        }

        updateLocalStorage("labels",labelsArr);
        createLabelsList(labelsArr);
        createLabelPicker();
        updateLocalStorage("tasks",allTasksArr);
        createTaskList(allTasksArr);
    }

    function removeTask(id) {

        for (var i = 0; i < allTasksArr.length; i++) {

            if (allTasksArr[i].id == id) {

                allTasksArr.splice(i,1);
                i = allTasksArr.length;
            }
        }

        if (allTasksArr.length === 0) {
            tasksList.parentElement.removeChild(tasksList);
        }

        updateLocalStorage("tasks",allTasksArr);
        createTaskList(allTasksArr);
    }

    function buttonEditOnClick(event) {

        var listItem = this.parentElement.parentElement;
        var id = listItem.dataset.id;

        if (listItem.className.indexOf("labels__item") > -1) {
            showEditLabelForm(id);
        }

        if (listItem.className.indexOf("tasks__item") > -1) {
            showEditTaskForm(id);
        }
    }

    function showEditLabelForm(id) {

        shadowbox.classList.add("visible");
        newLabelForm.classList.add("visible");
        editLabelButton.classList.add("visible");

        newLabelName.value = id;
        editLabelButton.dataset.id = id;

        for (var i = 0; i < labelsArr.length; i++) {

            if (labelsArr[i].name === id) {

                pickColorButton.style.backgroundColor = labelsArr[i].color;
                i = labelsArr.length;
            }
        }

    }

    function saveLabelChange(event) {

        if (newLabelName.value === "") {
            return;
        }

        var oldName = editLabelButton.dataset.id;
        var newName = newLabelName.value;
        var newColor = pickColorButton.style.backgroundColor;

        for (var i = 0; i < allTasksArr.length; i++) {

            for (var j = 0; j < allTasksArr[i].labels.length; j++) {

                if (allTasksArr[i].labels[j] === oldName) {
                    allTasksArr[i].labels.splice(j,1,newName);
                    j = allTasksArr[i].labels.length;
                }
            }
        }

        for (var i = 0; i < labelsArr.length; i++) {

            if (labelsArr[i].name === oldName) {

                labelsArr[i].name = newName;
                labelsArr[i].color = newColor;
                i = labelsArr.length;
            }
        }

        sortLabelsArrOnName(labelsArr);
        createLabelsList(labelsArr);
        createLabelPicker();
        updateLocalStorage("labels",labelsArr);
        updateLocalStorage("tasks",allTasksArr);
        createTaskList(allTasksArr);
        hideForm();
    }

    function showEditTaskForm(id) {

        shadowbox.classList.add("visible");
        newTaskForm.classList.add("visible");
        editTaskButton.classList.add("visible");

        editTaskButton.dataset.id = id;

        for (var i = 0; i < allTasksArr.length; i++) {

            if (allTasksArr[i].id == id) {

                newTaskText.value = allTasksArr[i].content;

                var dateString = allTasksArr[i].date;

                if (typeof dateString === "object") {
                    dateString = dateString.toISOString();
                }

                dateString = dateString.slice(0,10);
                newTaskDate.value = dateString;

                for (var j = 0; j < allTasksArr[i].labels.length; j++) {

                    for (var k = 0; k < labelsArr.length; k++) {

                        if (allTasksArr[i].labels[j] === labelsArr[k].name) {

                            var color = labelsArr[k].color;
                            var name = labelsArr[k].name;

                            addLabelToTask(color,name)
                        }
                    }
                }

                var priority = allTasksArr[i].priority;
                selectTaskPriority(priority);
            }
        }
    }

    function saveTaskChange() {

        var id = this.dataset.id;
        var content = document.querySelector(".task-form__text").value;

        if (content === "") {
            return;
        }

        for (var i = 0; i < allTasksArr.length; i++) {

            if (allTasksArr[i].id == id) {

                allTasksArr[i].content = content;

                var date = "";
                var inputDate = document.querySelector(".task-form__date");

                if (inputDate.value != "") {
                    date = new Date(inputDate.value);
                };

                allTasksArr[i].date = date

                pickedLabelsList = document.querySelector(".task-labels");
                var pickedLabelsArr = [];

                if (pickedLabelsList != null) {

                    for (var j = 0; j < pickedLabelsList.children.length; j++) {

                        var pickedLabelName = pickedLabelsList.children[j].innerText;
                        pickedLabelsArr.push(pickedLabelName);
                    }

                }

                allTasksArr[i].labels = pickedLabelsArr;

                var priority = 1;

                if (selectPriorityButton.className.indexOf("priority-two") > -1) {
                    priority = 2;
                }

                if (selectPriorityButton.className.indexOf("priority-three") > -1) {
                    priority = 3;
                }

                allTasksArr[i].priority = priority;
            }
        }

        sortTaskArrOnPriority(allTasksArr);
        allTasksArr = sortTaskArrOnDate(allTasksArr);
        createTaskList(allTasksArr);
        updateLocalStorage("tasks",allTasksArr)
        hideForm();
    }


    newTaskText.addEventListener("input", resizeHeight);
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
    editLabelButton.addEventListener("click", saveLabelChange);
    addTaskButton.addEventListener("click", addNewTaskObj);
    editTaskButton.addEventListener("click", saveTaskChange);

    if (localStorage.getItem("labels") === null) {

        localStorage.setItem("labels", labelsArr);

    } else if (localStorage.getItem("labels") != "") {

        labelsArr = JSON.parse(localStorage.getItem("labels"));

        if (labelsArr.length === undefined) {
            labelsArr = [];
        }

        createLabelsList(labelsArr);
        createLabelPicker();
    }

    if (localStorage.getItem("tasks") === null) {

        localStorage.setItem("tasks", allTasksArr);

    } else if (localStorage.getItem("tasks") != ""){

        allTasksArr = JSON.parse(localStorage.getItem("tasks"));

        if (allTasksArr.length === undefined) {
            allTasksArr = [];
        }

        createTaskList(allTasksArr);
    }
















})
