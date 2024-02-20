document.getElementById("mainTitle").innerText = "Point and Click adventure";

//Game window refrence
const gameWindow = document.getElementById("gameWindow");
//inventory
let inventory = [];
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

    if(e.target.id !== "heroImage")
    {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    
    }

   
    switch(e.target.id){

        case "key":
          getItem("Rusty key", "rustyKey");
            break;
        case "well":
            getItem("Coin", "coin");
              break;
        case "bigHousDoor":
            if(checkItem("Rusty key")){
                console.log("yess the door is open now")
            }   else if(checkItem("Coin")){
                removeItem("Coin", "coin");
                console.log("O shit. there goos my coin. and the door is still closed")
            }else{
                console.log("yess the door is opend")
            }
        break;
              default: break;
            case "statue":
                console.log("hey there")
                break;
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
            keyElement.id = itemId;
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




}