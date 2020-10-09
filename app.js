let values;
let divs;
let animationSpeed;
const frames = [];
const hole = document.createElement("div");
hole.classList.add("hole");
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".squareHolder").appendChild(hole);
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
    document.querySelector("#insertion").addEventListener("click", insertionSort);
    document.querySelector("#merge").addEventListener("click", e => mergeSort(values, 0, true));
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
        //frames.push("allRed");
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

function insertionSort() {
    for(let insert = 1; insert<values.length;insert++){
        for(let i=insert; i>0;i--){
            frames.push(["yellow", i, i-1]);
            if(values[i-1] > values[i]){
                frames.push(["swap", i, i-1]);
                [values[i-1], values[i]] = [values[i], values[i-1]];
                frames.push(["green", i, i-1]);
            }
            else{
                frames.push(["green", i, i-1]);
                break;
            }
        }
    }
    lockInputs();
    requestAnimationFrame(animate);
}

function mergeSort(array, start, top){
    if(array.length <= 1) return array;
    let split = Math.floor(array.length/2);
    let left = mergeSort(array.slice(0, split), start, false);
    let right = mergeSort(array.slice(split), start+split, false);
    let result = merge(left, right, start, split);
    console.log(result);
    if(top) requestAnimationFrame(animate)
    return result;

}

function merge(array1, array2, array1start, array2start){
    let red = [];
    for(let a=0; a<array1.length;a++){
        red.push(array1start+a);
    }
    for(let a=0; a<array2.length;a++){
        red.push(array2start+a);
    }
    frames.push(["red", ...red]);
    let pointer1=0;
    let pointer2=0;
    let destitnation = array1start
    const result = [];
    while(result.length < array1.length+array2.length){
        if(pointer1 < array1.length) frames.push(["yellow", pointer1+array1start]);
        if(pointer2 < array2.length) frames.push(["yellow", pointer2+array2start])
        let val1 = pointer1 >= array1.length ? Infinity : array1[pointer1];
        let val2 = pointer2 >= array2.length ? Infinity : array2[pointer2];
        if(val1 < val2){
            result.push(val1);
            frames.push(["green", pointer1+array1start]);
            pointer1++;
        } else {
            result.push(val2);
            frames.push(["green", pointer2+array2start]);
            pointer2++;
        }
    }
    return result;
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
        case "allRed":
            divs.forEach(div => div.style.backgroundColor = "red");
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
