var cvs = document.getElementById("canvas")
var ctx = cvs.getContext("2d")

const bird = new Image();
var bg = new Image(); 
const fg = new Image(); 
const pipeUp = new Image(); 
const pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly = new Audio()
var score_audio = new Audio()
var gameOver = new Audio()

fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"
gameOver.src = "audio/gameover.mp3"

var gap = 130
var xPos = 10
var yPos = 150
var grav = 1.6
var score = 0
let distancePipe=100

function moveUp() {
    yPos-=25
    fly.play()
}
var pipe = []
pipe[0] = {
    x : cvs.clientWidth,
    y : -125
}

function draw() {

    ctx.drawImage(bg, 0, 0)

    for(let i=0;i<pipe.length;i++){

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap )
        pipe[i].x--

        if(pipe[i].x==distancePipe)
        {
            pipe.push({
                x : cvs.clientWidth,
                y : Math.floor(Math.random()*pipeUp.height)-pipeUp.height
            })
            grav+=0.01
        }
        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                gameOver.play()
                ctx.drawImage(fg, 0, cvs.height - fg.height)
                ctx.font = "35px normal"
                ctx.fillText("GAME OVER", 35, cvs.height - 300)
                ctx.font = "25px Verdana"
                ctx.fillText("Score is "+score, 70, cvs.height - 260)
                i=pie.length-1
                break;
            }
        if(pipe[i].x == 5) {
            score++
            score_audio.play()
        }
        if(pipe[i].x==bg.width-1)
        {
            if(gap>=bird.height*2+20) gap-=2
        }
    }
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.drawImage(bird, xPos, yPos)

    ctx.font = "24px Verdana"
    ctx.fillText("Score: " + score, 15, cvs.height - 40)
    
    yPos += grav
    requestAnimationFrame(draw)
}

document.addEventListener("keydown", moveUp)
pipeBottom.onload=draw