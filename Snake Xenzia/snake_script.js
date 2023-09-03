//board
var blocksize =25;
var row = 20;
var col = 20;
var board;
var context;

//sanke
//head
var snakeX =0;
var snakeY =0;
//motion
var velX=0;
var velY=0;
//body
var snakebody=[];
//food
// var foodX =5*blocksize;
// var foodY =5*blocksize;
// now can randonise
var foodX;
var foodY;

var game = true;


window.onload = function(){
    //here board is basically the id to be used
    board = document.getElementById("board");
    board.height = row * blocksize;
    board.width = col * blocksize;

    context = board.getContext("2d");
    placefood;
    document.addEventListener("keyup", changeDirec);
    // addEventListeneer has two value one input from user and second funation
    // (event, func)
    placefood();
    //put parenthesis here
    setInterval(update, 100);
    //word of caution - while using function don't put parenthesis in timeinterval!
}
function update(){
    if(game == false){
        return;
    }
    //the four co-ordinates start1, start2, width, height
    context.fillStyle="black";
    context.fillRect(0,0,board.height, board.width);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    //eating food
    if(snakeX==foodX && snakeY==foodY){
        snakebody.push([foodX,foodY]);
        console.log(snakebody);
        placefood();
    }
    //pushing the snake body
    for(let i = snakebody.length-1; i>0;i--){
        snakebody[i]= snakebody[i-1];
        console.log("change");
        console.log(snakebody);
    }
    //if the above part is comment out only two blocks will follow the head
    if(snakebody.length){
        snakebody[0] = [snakeX, snakeY];
    }


    //modfying snake
   
    context.fillStyle="green";
    // snakeX is the the x co-ordinate, we can say that velX is the speed(1,-1,0) therefore snakeX chnages everytime it moves
    snakeX+=velX*blocksize;
    snakeY+=velY*blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    // this causes the block on the red area to turn green and stay there
    for(let i=0; i<snakebody.length;i++){
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
        //here (x-co-ordinate, y-co-ordinate, blocksize, blocksize)
    }

    //game conditions
        //outof bounds condition
    if(snakeX < 0 || snakeY <0 || snakeX > (col*blocksize) || snakeY > (row*blocksize)){
        game = false;
        alert("Game Over");
    }

        //biting myself condition
    for(let i =0; i<snakebody.length; i++){
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
            game = false;
            alert("Game Over");
        }
    }
    
}

function changeDirec(e){
    if(e.code =="ArrowUp" && velY!=1){
        velX = 0;
        velY = -1;
    }
    if(e.code =="ArrowDown" && velY!=-1){
        velX = 0;
        velY = 1;
    }
    if(e.code =="ArrowLeft" && velX!=1){
        velX = -1;
        velY = 0;
    }
    if(e.code =="ArrowRight" && velX!=-1){
        velX = 1;
        velY = 0;
    }
}

function placefood(){
    // Math.random return integer in 0,1 therefore multiply by col, 0,19.9999 then floow converts it to neartest int
    // floor(float value)
    foodX = Math.floor(Math.random()*col) * blocksize;
    foodY = Math.floor(Math.random()*row) * blocksize;

}
