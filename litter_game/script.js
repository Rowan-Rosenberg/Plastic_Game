document.addEventListener("DOMContentLoaded", function() {
    const bins = document.querySelectorAll(".bin");
    const messageContainer = document.getElementById("message");
    const scoreContainer = document.getElementById("score");
    const litterContainer = document.querySelector(".litter");
    let score = 0;

    bins.forEach(bin => {
        bin.addEventListener("dragover", dragOver);
        bin.addEventListener("dragenter", dragEnter);
        bin.addEventListener("dragleave", dragLeave);
        bin.addEventListener("drop", dragDrop);
    });

    function initLitter(){
        litterItems = [
            { id: "item1", type: "1-PET", src: "1-bottle.png", alt: "1" },
            { id: "item2", type: "2-HDPE", src: "2-milk_bottle.png", alt: "2" },
            { id: "item3", type: "3-PVC", src: "3-gum_boots.png", alt: "3" },
            { id: "item4", type: "4-LDPE", src: "4-bubble_wrap.jpg", alt: "4" },
            { id: "item5", type: "5-PP", src: "5-bottle_cap.jpg", alt: "5" },
            { id: "item6", type: "6-PS", src: "6-polystyrene_container.jpg", alt: "6" },
            { id: "item7", type: "7-OTHER", src: "7-cd.png", alt: "7" },
        ];
    }

    function dragStart(event) {
        event.dataTransfer.setData("text/plain", event.target.id);
        // Hide when dragged
        setTimeout(() => {
            event.target.style.display = "none";
        }, 0);
    }

    function dragEnd() {
        // Show the item again if not dropped in a bin
        setTimeout(() => {
            const item = document.getElementById(target.id);
            if (item) {
                item.style.display = "block";
            }
        }, 0);
        target.classList.remove("dragging");
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragEnter(event) {
        event.preventDefault();
        this.classList.add("hovered");
    }

    function dragLeave() {
        this.classList.remove("hovered");
    }

    function dragDrop(event) {
        // Clear existing messages
        clearMessages();

        const itemId = event.dataTransfer.getData("text/plain");
        const item = document.getElementById(itemId);
        const binType = this.getAttribute("data-type");
        const itemType = item.getAttribute("data-type");

        if (binType === itemType) {
            this.classList.remove("hovered");
            this.appendChild(item);
            item.style.display = "none"; // Hide the item
            updateScore(2); // Increase score
            showNextLitterItem(); // Show the next litter item
        } else {
            showMessage("Wrong bin! Please try again.", "error");
            item.style.display = "block";
            updateScore(-1); // Decrease score
            event.preventDefault();
        }
    }


    function showMessage(text, type) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = text;
        messageDiv.classList.add("message", type);

        messageContainer.appendChild(messageDiv);

        // Remove the message after 2 seconds
        setTimeout(function() {
            messageDiv.remove();
        }, 2000); // 2000 milliseconds = 2 seconds
    }

    function clearMessages() {
        while (messageContainer.firstChild) {
            messageContainer.removeChild(messageContainer.firstChild);
        }
    }

    function updateScore(points) {
        score += points;
        scoreContainer.textContent = `Score: ${score}/30`;
    }

    function showNextLitterItem() {
        if (score >= 30){
            showMessage("Congratulations! You've sorted all the litter.", "success");
        }
        if (litterItems.length === 0) {
            initLitter();
        }
        const randomIndex = Math.floor(Math.random() * litterItems.length);
        const nextItem = litterItems.splice(randomIndex, 1)[0];

        const itemDiv = document.createElement("div");
        itemDiv.id = nextItem.id;
        itemDiv.classList.add("item");
        itemDiv.setAttribute("data-type", nextItem.type);
        itemDiv.setAttribute("draggable", "true");
        itemDiv.innerHTML = `<img src="${nextItem.src}" alt="${nextItem.alt}" draggable="false">`;

        itemDiv.addEventListener("dragstart", dragStart);
        itemDiv.addEventListener("dragend", dragEnd);

        litterContainer.appendChild(itemDiv);
    }

    // Start the game by showing the first litter item
    initLitter();
    showNextLitterItem();
});
