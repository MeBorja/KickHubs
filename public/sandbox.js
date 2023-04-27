

//DOM Elements
let objImage = document.querySelector('.object'); //player
let enemy = document.querySelector(".enemy") //enemy npc
let scoreboard = document.querySelector('.scoreboard') //scoreboard




//variabels
let leftPosition = (window.innerWidth - 100) // player start nd current position 
let topPosition = (window.innerHeight - 100) // player start nd current position 
let topEnemy = 78 // enemy current and start position
let leftEnemy = 0 // enemyt current and start position
const speed = 10// game speed
let enemySpeed = speed
let score = 0 //current score
let isInside = 0 // if enemy is inside player
let hp = 3
const startTopPostion = topPosition
const startLeftPostion = leftPosition
const enemyStartLeftPostion = topEnemy
const enemyStartTopPostion = leftEnemy
const bounds = {    
  left: 0,
  top: 78,
  right: window.innerWidth - 100,
  bottom: window.innerHeight - 100
}; // bound (where player and enemy could move)
function startRun () {
    objImage.style.left = leftPosition + "px" 
    objImage.style.top = topPosition + "px"
} //function for starting the game ( moves player to start position)
function moveLeft() {
    leftPosition -= speed;
    if (leftPosition < bounds.left) {
      leftPosition = bounds.left;// sets player position to bounds position  
    } //cheacks if player is inside bounds
    objImage.style.left = leftPosition + "px";
} // moves the player left

function moveUp() {
    topPosition -= speed;
    if (topPosition < bounds.top) {
      topPosition = bounds.top;// sets player position to bounds position  
    }//cheacks if player is inside bounds
    objImage.style.top = topPosition + "px";
}// moves the player up

function moveRight() {
    leftPosition += speed;
    if (leftPosition > bounds.right) {
      leftPosition = bounds.right;// sets player position to bounds position  
    }//cheacks if player is inside bounds
    objImage.style.left = leftPosition + "px";
}// moves the player right

function moveDown() {
    topPosition += speed;
    if (topPosition > bounds.bottom) {
      topPosition = bounds.bottom;// sets player position to bounds position  
    }//cheacks if player is inside bounds
    objImage.style.top = topPosition + "px";
}// moves the player down
startRun() // runs function to set players
document.querySelector('body').addEventListener("keydown", function (e) { //anonym functon to cheack whitch key was pressed
    let key_code = e.keyCode; //saves key press value
    switch (key_code) {
        case 37:// key pressed left
            moveLeft();
            break;
        case 38:// key pressed up
            moveUp();
            break;
        case 39://key pressed right
            moveRight();
            break;
        case 40://key pressed down
            moveDown();
            break;
        default:// breakes code if up donw left right was not pressed
            break;
    }
});



function enemyMoveRight() {
    leftEnemy += enemySpeed;
    if (leftEnemy > bounds.right) {
      leftEnemy = bounds.right;// sets enemy position to bounds position  
    }//cheacks if enemy is inside bounds
    enemy.style.left = leftEnemy + "px";
}// moves the enemy down



function enemyMoveLeft() {
    leftEnemy -= enemySpeed;
    if (leftEnemy > bounds.right) {
      leftEnemy = bounds.right;// sets enemy position to bounds position  
    }//cheacks if enemy is inside bounds
    enemy.style.left = leftEnemy + "px";
}// moves the enemy down



function enemyMoveUp() {
    topEnemy -= enemySpeed;
    if (topEnemy < bounds.top) {
      topEnemy = bounds.top;// sets enemy position to bounds position  
    }//cheacks if enemy is inside bounds
    enemy.style.top = topEnemy + "px";
}// moves the enemy down
function enemyMoveDown() {
    topEnemy += enemySpeed;
    if (topEnemy > bounds.bottom) {
        topEnemy = bounds.bottom;// sets enemy position to bounds position  
      }//cheacks if enmy is inside bounds
    enemy.style.top = topEnemy + "px";
}// moves the enemy down

function followObject() {
    const objRect = objImage.getBoundingClientRect(); //get current position of player
    const enemyRect = enemy.getBoundingClientRect();//get current position of enemy
    
    // calculate distance between objImage and enemy
    const distanceX = objRect.x - enemyRect.x;
    const distanceY = objRect.y - enemyRect.y;
    
    // move enemy closer to objImage
    if (distanceX > 0) {
      enemyMoveRight();
    } else if (distanceX < 0) {
      enemyMoveLeft();
    }
    
    if (distanceY > 0) {
      enemyMoveDown();
    } else if (distanceY < 0) {
      enemyMoveUp();
    }
    
    if (!(
        objRect.right < enemyRect.left || 
        objRect.left > enemyRect.right || 
        objRect.bottom < enemyRect.top || 
        objRect.top > enemyRect.bottom
      )) {
        isInside = 1 
        //cheacks if enemy is inside player
    }
    else {
      //else is not inside
        isInside = 0
    }
  }
  function addScore () {
    if (isInside == 1) //cheack if enemy inside player
        {
            hp = hp - 1
            if (hp == 0) {
              const topScore = score
              const query = new Score({
                username: user.username,
                score: topScore
            })
            query.save().catch((err) => {
              console.log(err);
            })
            
        
            }
            console.log(hp)
            topPosition = startTopPostion
            leftPosition =startLeftPostion
            topEnemy = enemyStartLeftPostion
            leftEnemy = enemyStartTopPostion
            objImage.style.top = topPosition + "px";
            objImage.style.left = leftPosition + "px";
            enemy.style.left = leftEnemy + "px";
            enemy.style.top = topEnemy + "px";
            ; //takes away score if enemy is inside player
    } else { // if not player gets score
        score = score + 1
        scoreboard.innerText = score
    }
  }
  
  // call followObject() function every 1000 milliseconds to move enemy
  setTimeout(setInterval(followObject, 50), 1000)
  setInterval(addScore, 1000) // turns on score counter