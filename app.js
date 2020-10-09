window.addEventListener("DOMContentLoaded", () => renderBars(10));

function renderBars(n){
    const barHolder = document.querySelector(".squareHolder");
    for(let i=0; i < n; i++){
        let height = (25+i*10);
        let newBar = document.createElement("div");
        newBar.style.left = (6+i*15)+"px";
        newBar.style.top = (500-height)+"px";
        newBar.style.height = height + "px";
        newBar.style.backgroundColor = "green";
        newBar.classList.add("bar");
        barHolder.appendChild(newBar);
    }
}
