//board
var blocksize =25;
// var size = 30;
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

//colors
var clr = ["blue", "yellow", "orange", "purple", "pink", "magenta", "grey"];
//pink,magenta,grey

//food
// var foodX =5*blocksize;
// var foodY =5*blocksize;
// now can randonise
var foodX;
var foodY;

var spc_foodX;
var spc_foodY;
var game = true;

var score = 0;
var count = 0;
var spc_eat = true;
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
    spc_placefood();

    //put parenthesis here
    setInterval(update, 100);
    //word of caution - while using function don't put parenthesis in timeinterval!
}
function update(){
    if(game == false){
        return;
    }
    //the four co-ordinates start1, start2, width, height
    context.fillStyle="#6AFF14";
    context.fillRect(0,0,board.height, board.width);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if((count%3==0 || count==0) && spc_eat==true){
        // special food
        context.fillStyle="white";
        context.fillRect(spc_foodX, spc_foodY, blocksize, blocksize);
        }

    //eating food
    if(snakeX==foodX && snakeY==foodY){
        snakebody.push([foodX,foodY]);
        console.log(snakebody);
        score++; 
        count++;
        document.getElementById("writeup").innerHTML="Score "+score;
        spc_eat=true;
        console.log("count " + count);
        placefood();
        if(count%3==0){
            spc_placefood();
        }
    }

    //eating special food
    if(snakeX==spc_foodX && snakeY==spc_foodY){
        snakebody.push([spc_foodX,spc_foodY]);
        snakebody.push([spc_foodX,spc_foodY]);
        snakebody.push([spc_foodX,spc_foodY]);
        console.log(snakebody);
        score+=3;
        document.getElementById("writeup").innerHTML="Score "+score +" (Eaten Special Bonus)";
        // context.fillStyle="white";
        context.clearRect(spc_foodX, spc_foodY, blocksize, blocksize);
        spc_eat=false;
        spc_foodX= 0; spc_foodY=0;
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
    
    context.fillStyle="black";
    // snakeX is the the x co-ordinate, we can say that velX is the speed(1,-1,0) therefore snakeX chnages everytime it moves
    snakeX+=velX*blocksize;
    snakeY+=velY*blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    // this causes the block on the red area to turn green and stay there
    for(let i=0; i<snakebody.length;i++){
        context.fillStyle=clr[gen()];
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
        //here (x-co-ordinate, y-co-ordinate, blocksize, blocksize)
    }

    //game conditions
        //outof bounds condition
    if(snakeX < 0 || snakeY <0 || snakeX > (col*blocksize) || snakeY > (row*blocksize)){
        game = false;
        document.getElementById("writeup").innerHTML="Final Score "+score;
        document.getElementById("writeup2").innerHTML="Game Over!";
        // alert("Game Over");
    }

        //biting myself condition
    for(let i =0; i<snakebody.length; i++){
        if(snakeX == snakebody[i][0] && snakeY == snakebody[i][1]){
            game = false;
            document.getElementById("writeup").innerHTML="Final Score "+score;
            document.getElementById("writeup2").innerHTML="Game Over!";
            // alert("Game Over");
            
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

function spc_placefood(){
    // Math.random return integer in 0,1 therefore multiply by col, 0,19.9999 then floow converts it to neartest int
    // floor(float value)
    spc_foodX = Math.floor(Math.random()*col) * blocksize;
    spc_foodY = Math.floor(Math.random()*row) * blocksize;

}

function reload(){
    window.location.reload(true);
}

//this gives disco colors as the color update after every 100ms
function gen(){
    return Math.floor(Math.random()*7);
}