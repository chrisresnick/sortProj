const text = {

    instructions : {
        title : "Instructions",
        instructions : [
            "Press shuffle",
            "Choose a sort",
            "Learn about sorts",
            "????",
            "Profit"
        ],
        info : [
            "You can use the Animation speed slider to speed up or slow down the animation.",
            "You can change the number of bars on the dispay with the Number of Bars slider."
        ]
    }

}

export default function getText(name) {
    const data = text[name];
    let innerHTML = "";
    if(name==="instructions"){
        innerHTML += `<h2 id="title">${data.title}</h2>`;
        innerHTML += '<ol class="bodyText">';
        innerHTML += data.instructions.map(t => `<li>${t}</li>`).join("");
        innerHTML += "</ol>";
        innerHTML += '<ul class = "bodyText">'
        innerHTML += data.info.map(t => `<li>${t}</li>`).join("");
        innerHTML += "</ul>"
    }

    return innerHTML

}
