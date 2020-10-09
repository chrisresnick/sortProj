let values;
let divs;
let animationSpeed;
const frames = [];
window.addEventListener("DOMContentLoaded", () => {
    values = [0, 1, 2, 3, 4, 5, 6, 7, 8 ,9];
    divs = renderBars(values.length);
    animationSpeed = 100
    document.querySelector("#range").addEventListener("input", e => {
        values = [];
        for(let i=0; i<e.target.value;i++){
            values.push(i);
        }
        divs = renderBars(values.length);
    });
    document.querySelector("#speed").addEventListener("input", e => animationSpeed = e.target.value);
    document.querySelector("#shuffle").addEventListener("click", shuffle);
    document.querySelector("#bubble").addEventListener("click", bubbleSort);
});

function renderBars(n){
    const barHolder = document.querySelector(".squareHolder");
    document.querySelectorAll(".bar").forEach(bar => barHolder.removeChild(bar));
    const divArray = [];
    for(let i=0; i < n; i++){
        let height = (25+i*10);
        let newBar = document.createElement("div");
        newBar.style.left = (5+i*15)+"px";
        newBar.style.top = (500-height)+"px";
        newBar.style.height = height + "px";
        newBar.style.backgroundColor = "green";
        newBar.classList.add("bar");
        divArray.push(newBar);
        barHolder.appendChild(newBar);
    }
    return divArray;
}

function shuffle() {
    const shuffleRate = values.length * 3
    for(i=0; i<shuffleRate;i++){
        let random = Math.floor(values.length*Math.random());
       // console.log(random, divs[random])
        let index = i%values.length;
        [values[index], values[random]] = [values[random], values[index]];
        [divs[random].style.left, divs[index].style.left] = [divs[index].style.left, divs[random].style.left];
        [divs[random], divs[index]] = [divs[index], divs[random]];
    }
    divs.forEach(bar => bar.style.backgroundColor = "red");
}

function bubbleSort(){
    for(let upperLimit=values.length-1; upperLimit >= 0; upperLimit--){
        let sorted = true;
        for(let i=0;i<upperLimit;i++){
            frames.push(["yellow", i, i+1])
            if(values[i] > values[i+1]){
                [values[i], values[i+1]] = [values[i+1], values[i]];
                frames.push(["swap", i, i+1]);
                sorted = false
            }
            frames.push(["red", i, i+1])
        }
        frames.push(["green", upperLimit])
        if(sorted) break;
    }
    console.log(values);
    frames.push(["allGreen"]);
    lockInputs();
    requestAnimationFrame(animate);
}
function animate(){
    let frame = frames.shift();
    switch(frame[0]) {
        case "swap":
            let [_, a, b] = frame;
            [divs[a].style.left, divs[b].style.left] = [divs[b].style.left, divs[a].style.left];
            [divs[a], divs[b]] = [divs[b], divs[a]];
            break;
        case "green":
            frame.slice(1).forEach(i => divs[i].style.backgroundColor = "green");
            break;
        case "allGreen":
            divs.forEach(div => div.style.backgroundColor = "green");
            break;
        case "yellow":
            frame.slice(1).forEach(i => divs[i].style.backgroundColor = "yellow");
            break;
        case "red":
            frame.slice(1).forEach(i => divs[i].style.backgroundColor = "red");
            break;
    }
    if(frames.length > 0) setTimeout(requestAnimationFrame, 100-animationSpeed, animate);
    else unlockInputs();
}

function lockInputs() {
    document.querySelectorAll("button").forEach(b => b.disabled=true);
    document.querySelector("#range").disabled=true;

}
function unlockInputs(){
    document.querySelectorAll("button").forEach(b => b.disabled=false);
    document.querySelector("#range").disabled=false;
}
