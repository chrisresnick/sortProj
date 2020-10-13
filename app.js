let values;
let divs;
let animationSpeed;
const frames = [];
const hole = document.createElement("div");
hole.classList.add("hole");
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".squareHolder").appendChild(hole);
    let numBars = document.querySelector("#range").value
    values = [];
    for(let i=0; i<numBars;i++){
        values.push(i);
    }
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
    let result = merge(left, right, start, start+split);
    console.log(result);
    if(top) {
        //frames.push(["allGreen"]);
        values = result;
        lockInputs();
        requestAnimationFrame(animate);
    }
    return result;

}

function merge(array1, array2, array1start, array2start){
    let red = [];
    for(let a=0; a<array1.length+array2.length;a++){
        red.push(array1start+a);
    }
    // for(let a=0; a<array2.length;a++){
    //     red.push(array2start+a);
    // }
    frames.push(["red", ...red]);
    let pointer1=0;
    let pointer2=0;
    const result = [];
    let offset = 0;
    while(result.length < array1.length+array2.length){
        if(pointer1 < array1.length) frames.push(["yellow", pointer1+array1start+offset]);
        if(pointer2 < array2.length) frames.push(["yellow", pointer2+array2start])
        let val1 = pointer1 >= array1.length ? Infinity : array1[pointer1];
        let val2 = pointer2 >= array2.length ? Infinity : array2[pointer2];
        if(val1 < val2){
            result.push(val1);
            frames.push(["green", pointer1+array1start+offset]);
            pointer1++;
        } else {
            result.push(val2);
            frames.push(["msShift", array1start, array2start, pointer1, pointer2, offset++]);
            pointer2++;
        }
    }
    return result;
}
function msShift(frame){
    let [_, a1start, a2start, ptr1, ptr2, offset] = frame;
    let pos2 = a2start+ptr2;
    let pos1 = a1start+ptr1+offset;
    divs = divs.map((div, index) => {
        if(index < pos1) return div;
        if(index === pos1) return cloneDiv(pos2, divs[pos1].style.left , 1);
        if(index <= pos2) return cloneDiv(index-1, divs[index].style.left, 2);
        return div;
    });
    divs[pos1].style.backgroundColor = "green";
    const sh = document.querySelector(".squareHolder");
    document.querySelectorAll(".squareHolder div").forEach(div => sh.removeChild(div));
    divs.forEach(div => sh.appendChild(div));
}

function cloneDiv(num, left=null, code) {
    //console.log(num, code);
    let div = document.createElement("div");
    let oldDiv = divs[num];
    div.style.left = left === null ? oldDiv.style.left : left;
    div.style.top = oldDiv.style.top;
    div.style.backgroundColor = "red";
    div.style.height = oldDiv.style.height;
    div.className = oldDiv.className;
    return div;
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
        case "msShift":
            msShift(frame);
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
