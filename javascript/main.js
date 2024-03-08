document.getElementById("mainTitle").innerText = "Point and Click adventure";

//Game window refrence
const gameWindow = document.getElementById("gameWindow");
//inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList");
//playerCharacter
const mainCharacter = document.getElementById("playerCharacter");
const offsetCharacter = 16;
//speach bubbles
const mainSpeetch = document.getElementById("playerSpeech");
const counterSpeech = document.getElementById("ncpSpeech");
//audio sialouge
const heroAudio = document.getElementById("heroAudio")
const counterAudio = document.getElementById("counterAudio")

//objects
const tree1 =document.getElementById("testTree");
const keyElement =document.getElementById("key");

//avatar
const counterAvatar = document.getElementById("npcCharacter");

//game state
let gameState ={
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false
}

localStorage.removeItem("gameState");

if(Storage){
    if(localStorage.gameState){
        // parseturns string in object
        gameState = JSON.parse(localStorage.gameState);
    }else{
     //JSON.stringify turns a object into a string
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}



let checkDialoge = false;



gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    

    if(e.target.id !== "heroImage" && counterSpeech.style.opacity== 0 && mainSpeetch.style.opacity==0)
    {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    
    }

   
    switch(e.target.id){

        case "key":
          getItem("Rusty key", "rustyKey");
          removeItem("Rusty key", "key");
          setTimeout(showMassage,500, mainSpeetch,"hey i found a key here",);
          gameState.keyPickedUp = true;
          saveGamestate(gameState);
            break;
        case "well":
            getItem("Coin", "coin");
              break;
        case "bigHousDoor":
            if(gameState.keyPickedUp = true){
                setTimeout(showMassage,0,mainSpeetch,"yess i can leave finally leave now",);
                console.log("he its open")
            }   else if(checkItem("Coin")){
                console.log("o no the door is loched");
                removeItem("Coin", "coin");
            }else{
                console.log("shi i need a key")
            }
        break;
             
            case "statue":
                setTimeout(function() {counterAvatar.style.opacity= 1;}, 4000)
                setTimeout(showMassage,0,counterSpeech,"aaaaaa a scary ghost!!",);
                setTimeout(showMassage,4000, mainSpeetch,"e no worrys i am friendly",);
                setTimeout(showMassage,8000,counterSpeech,"a pffff i was scared for a monent",);
                setTimeout(showMassage,12000,mainSpeetch,"do you know by any chance how i can enter that boat?",);
                setTimeout(showMassage,16000,counterSpeech,"yes there is a key in one of the pots.",);
                setTimeout(showMassage,20000,mainSpeetch,"thank you",)
                setTimeout(function(){counterAvatar.style.opacity= 0;},22000);
                break;
                default: break;
    }

    function getItem(itemName, itemId){
        if(!checkItem(itemName)){
            inventory.push(itemName);
            showItem(itemName, itemId);  
        }  
        console.log(inventory);
    }

    function checkItem(itemId){
        return inventory.includes(itemId);
    }

    /**
     * naads a name for dispaly 
     * @param {string*} itemName 
     * @param {string*} itemId 
     */
    function showItem(itemName, itemId){
            const keyElement = document.createElement("li");
            keyElement.id = 'inv-'+ itemId;
            keyElement.innerText= itemName;
            inventoryList.appendChild(keyElement);
    }
 /**
  * removes iten form array. and the element in the html
  * @param {string*} itemName 
  * @param {string*} itemId 
  */
    function removeItem(itemName, itemId){
        //removes item in Array
        inventory = inventory.filter(function(newInventory){
            return newInventory !== itemName;
        });
        document.getElementById(itemId).remove();
    }

    /**
     * add or remove items in the inventory
     * @param {string} itemName 
     * @param {string} action 
     */
    function changeInventory(itemName, action){
        if(itemName == null || action == null){
            console.error("wrong ")
            return;
        }

        switch(action){
            case 'add':
                inventory.push(itemName);
                break;
            case 'delete':
                inventory = inventory.filter(function(newInventory){
                    return newInventory !== itemName;
                });
                document.getElementById(itemId).remove();
                break;
        }
        updateInventory(inventory, inventoryList);
    }
    

    function updateInventory(inventory, inventoryList){
        inventoryList.innerHTML ='';
        inventory.forEach(function(item){
            const inventoryItem = document.createElement("li");
            inventoryItem.id = 'inv-'+ item;
            inventoryItme.innerText= item;
            inventoryList.appendChild(inventoryItem);
        })
    };


    function showMassage(targetBubble, message, targetSound){
        targetSound.currentTime = 0;
        targetSound.play();
        targetBubble.innerText = message;
        targetBubble.style.opacity = "1";
        setTimeout(hideMessage, 4000, targetBubble, targetSound);
    }

    function hideMessage(targetBubble, targetSound){
        targetSound.pause();
        targetBubble.innerText = "...";
        targetBubble.style.opacity = 0;
    }

    function saveGamestate(){
        localStorage.gameState = JSON.stringify(gameState);
    }

}