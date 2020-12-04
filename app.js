"use strict"

import Frames from './frames.js';
import getText from './text.js'
let values = [];
let divs;
let animationSpeed = 100;
const frames = new Frames();
window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".info").innerHTML = getText("instructions");
    let numBars = document.querySelector("#range").value
    for(let i=0; i<numBars;i++){
        values.push(i);
    }
    divs = renderBars(values.length);
    shuffle();
    document.querySelector("#range").addEventListener("input", e => blank(e.target.value));
    document.querySelector("#speed").addEventListener("input", e => animationSpeed = e.target.value);
    document.querySelector("#shuffle").addEventListener("click", shuffle);
    document.querySelector("#bubble").addEventListener("click", bubbleSort);
    document.querySelector("#insertion").addEventListener("click", insertionSort);
    document.querySelector("#merge").addEventListener("click", e => mergeSort(values, 0, true));
    document.querySelector("#quick").addEventListener("click", e => quickSort(values, 0, true));
    document.querySelector("#github").addEventListener("click", e => window.location="https://github.com/chrisresnick/animateSort");
    document.querySelector("#linkedin").addEventListener("click", e => window.location="https://www.linkedin.com/in/chris-resnick/");
});

function blank(n) {
    values = [];
    for(let i=0; i<n;i++){
        values.push(i);
    }
    divs = renderBars(values.length);
}

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
    for(let i=0; i<shuffleRate;i++){
        let random = Math.floor(values.length*Math.random());
        let index = i%values.length;
        [values[index], values[random]] = [values[random], values[index]];
        [divs[random].style.left, divs[index].style.left] = [divs[index].style.left, divs[random].style.left];
        [divs[random], divs[index]] = [divs[index], divs[random]];
    }
    divs.forEach(bar => bar.style.backgroundColor = "red");
}

function bubbleSort(){
    frames.push(["allRed"]);
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
    //console.log(values);
    frames.push(["allGreen"]);
    startAnimation("bubbleSort");
}

function insertionSort() {
    frames.push(["allRed"]);
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
    startAnimation("insertionSort");
}
function quickSort(arr, start, top){
    if(arr.length <= 1) {
        if(start < divs.length) frames.push(["green", start]);
        return arr;
    }
    const indexes = [];
    for(let i=0; i<arr.length;i++) indexes.push(i+start);
    const pivot = Math.floor(Math.random()*arr.length);
    frames.push(["yellow", pivot+start]);
    const pivotVal = arr[pivot];
    let lesser = [];
    let greater = [];
    let lesserIndexes = [];
    let greaterIndexes = [];
    arr.forEach((val, index) => {
        if(index===pivot) return;
        frames.push(["yellow", index+start]);
        frames.push(["red", index+start]);
        if(val < pivotVal) {
            lesser.push(val);
            lesserIndexes.push(index+start);
        }
        else {
            greater.push(val);
            greaterIndexes.push(index+start);
        }
    });
    frames.push(["red", ...indexes]);
    frames.push(["quicksort", start, lesserIndexes, pivot+start, greaterIndexes]);
    lesser = quickSort(lesser, start, false);
    greater  = quickSort(greater, start+lesser.length+1, false)
    frames.push(["green", ...indexes]);
    if(top){
        frames.push(["done"]);
        frames.unshift(["allRed"]);
        startAnimation("quickSort");
    }

    return [...lesser, pivotVal, ...greater];
}

function qsAnimate(frame){
    let [_, start, lesserIndexes, pivotIndex, greaterIndexes] = frame;
    const lenOfNew = lesserIndexes.length + greaterIndexes.length + 1;
    let lesserPointer = 0;
    let greaterPointer = 0;
    let pivotIncluded = false;
    let pIndex;
    const newDivs = [];
    divs.forEach((div, index) => {
        if(index < start) newDivs.push(div);
        else if(index < start+lesserIndexes.length){
            newDivs.push(cloneDiv(lesserIndexes[lesserPointer++], div.style.left));
        }
        else if(!pivotIncluded){
            pivotIncluded = true;
            pIndex = index;
            newDivs.push(cloneDiv(pivotIndex, div.style.left));
        }
        else if(index <  start+lenOfNew) newDivs.push(cloneDiv(greaterIndexes[greaterPointer++], div.style.left));
        else newDivs.push(div);
    });
    const sh = document.querySelector(".squareHolder");
    document.querySelectorAll(".bar").forEach(bar => sh.removeChild(bar));
    newDivs[pIndex].style.backgroundColor = "green";
    newDivs.forEach(div => sh.appendChild(div));
    divs = newDivs;
}

function mergeSort(array, start, top){
    if(array.length <= 1) return array;
    let split = Math.floor(array.length/2);
    let left = mergeSort(array.slice(0, split), start, false);
    let right = mergeSort(array.slice(split), start+split, false);
    let result = merge(left, right, start, start+split);
    //console.log(result);
    if(top) {
        values = result;
        frames.unshift(["allRed"])
        startAnimation("mergeSort");
    }
    return result;

}

function merge(array1, array2, array1start, array2start){
    let red = [];
    for(let a=0; a<array1.length+array2.length;a++){
        red.push(array1start+a);
    }
    frames.push(["red", ...red]);
    let pointer1=0;
    let pointer2=0;
    const result = [];
    let offset = 0;
    while(result.length < array1.length+array2.length){
        const f = ["yellow"]
        if(pointer1 < array1.length) f.push(pointer1+array1start+offset);
        if(pointer2 < array2.length) f.push(pointer2+array2start);
        frames.push(f);
        let val1 = pointer1 >= array1.length ? Infinity : array1[pointer1];
        let val2 = pointer2 >= array2.length ? Infinity : array2[pointer2];
        if(val1 < val2){
            result.push(val1);
            frames.push(["green", pointer1+array1start+offset]);
            pointer1++;
        } else {
            result.push(val2);
            frames.push(["msShift", array1start, array2start, pointer1, pointer2++, offset++]);
        }
    }
    return result;
}
function msShift(frame){
    let [_, a1start, a2start, ptr1, ptr2, offset] = frame;
    let endShift = a2start+ptr2;
    let startShift = a1start+ptr1+offset;
    divs = divs.map((div, index) => {
        if(index < startShift) return div;
        if(index === startShift) return cloneDiv(endShift, divs[startShift].style.left , 1);
        if(index <= endShift) return cloneDiv(index-1, divs[index].style.left);
        return div;
    });
    divs[startShift].style.backgroundColor = "green";
    const sh = document.querySelector(".squareHolder");
    document.querySelectorAll(".squareHolder div").forEach(div => sh.removeChild(div));
    divs.forEach(div => sh.appendChild(div));
}

function cloneDiv(num, left=null) {
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
        case "quicksort":
            qsAnimate(frame);
            break;
        case "done":
            blank(divs.length);
            break;
    }
    if(frames.length === 0) return unlockInputs();
    if(animationSpeed < 100) return setTimeout(requestAnimationFrame, 100-animationSpeed, animate);
    return requestAnimationFrame(animate);
}

function startAnimation(sortName) {
    document.querySelectorAll("button").forEach(b => b.disabled=true);
    document.querySelector("#range").disabled=true;
    document.querySelector(".info").innerHTML = getText(sortName);
    requestAnimationFrame(animate);
}

function unlockInputs(){
    document.querySelector(".info").innerHTML = getText("instructions");
    document.querySelectorAll("button").forEach(b => b.disabled=false);
    document.querySelector("#range").disabled=false;
}
