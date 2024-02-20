document.getElementById("mainTitle").innerText = "Point and Click adventure";

//Game window refrence
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");
//playerCharacter
const mainCharacter = document.getElementById("playerCharacter");
const offsetCharacter = 16;

const tree1 =document.getElementById("testTree");
const keyElement =document.getElementById("key");


gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    mainCharacter.style.left = x - offsetCharacter + "px";
    mainCharacter.style.top = y - offsetCharacter + "px";

    switch(e.target.id){
        case "testTree": tree1.style.opacity = 0.5;
        break;

        case "key":
            document.getElementById("key").remove();
            keyElement.id = "inv-key";
            keyElement.innerText= "key";
            inventoryList.appendChild(keyElement);
            break;
        default: tree1.style.opacity = 1;
    }
}