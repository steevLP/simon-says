const btn_red = document.getElementById("btn-red");
const btn_green = document.getElementById("btn-green");
const btn_blue = document.getElementById("btn-blue");
const btn_yellow = document.getElementById("btn-yellow");

const disp_points = document.getElementById("points");
const statusText = document.getElementById("status");

// Datastorage
let points = 0
let hasPressed = 0;
let shouldPress = [];
let pressed = [];
let options = ["red", "green", "blue", "yellow"];
let isLoading = false;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function genStep(){
    isLoading = true;
    console.log(isLoading)
    let color = options[Math.floor(Math.random() * options.length)]
    shouldPress.push(color);
    displaySteps();
}

async function displaySteps(){
    for (let i = 0; i < shouldPress.length; i++){
        setTimeout(async function(){
            document.getElementById("btn-" + shouldPress[i]).classList.add("btn-" + shouldPress[i] + "-glow");
            setTimeout(async function(){
                document.getElementById("btn-" + shouldPress[i]).classList.remove("btn-" + shouldPress[i] + "-glow");
            }, 500);
        }, 1000)
        await wait(1000)
    }
    isLoading = false;
    console.log(isLoading)
}

function clickHandler(color) {
    if (isLoading) return;
    if (shouldPress[hasPressed] != color) {
        disp_points.innerText = points;
        statusText.innerText = "You Lost!";
        setTimeout(function(){
            statusText.innerText = ""
        }, 1000)
        hasPressed = 0;
        pressed = [];
        return;
    }
    pressed.push(color);
    hasPressed++;

    if (pressed.length == shouldPress.length) {
        for (let i = 0; i < shouldPress; i++) {
            if (pressed[i] != shouldPress[i]) {
                disp_points.innerText = points;
                statusText.innerText = "You Lost!";
                setTimeout(function(){
                    statusText.innerText = ""
                }, 1000)
                hasPressed = 0;
                pressed = [];
                return;
            }
        }
        points++;
        disp_points.innerText = points;
        statusText.innerText = "You Won!";
        setTimeout(function(){
            statusText.innerText = ""
        }, 1000)
        genStep();
        hasPressed = 0;
        pressed = [];
    }
}

// Eventlisteners
btn_red.addEventListener("click", function(e) {
    console.log("red pressed");
    clickHandler("red");
});
btn_green.addEventListener("click", function(e) {
    console.log("green pressed");
    clickHandler("green");
});
btn_blue.addEventListener("click", function(e) {
    console.log("blue pressed");
    clickHandler("blue");
});
btn_yellow.addEventListener("click", function(e) {
    console.log("yellow pressed");
    clickHandler("yellow");
})