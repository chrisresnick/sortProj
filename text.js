const text = {

    bubbleSort : {
        title: "Bubble Sort",
        dds : [
            ["Time Complexity", "O(n^2)"],
            ["Space Complexity", "O(n^2)"]
        ],
    },

    insertionSort : {
        title: "Insertion Sort",
        dds : [
            ["Time Complexity", "O(n^2)"],
            ["Space Complexity", "O(n^2)"]
        ],
    },

    mergeSort : {
        title: "Merge Sort",
        dds : [
            ["Time Complexity", "O(n Log n)"],
            ["Space Complexity", "O(n log n)"]
        ],
    },

    quickSort : {
        title: "Quick Sort",
        dds : [
            ["Time Complexity", "O(n Log n)"],
            ["Space Complexity", "O(n log n)"]
        ],
    },

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
    innerHTML += `<h2 id="title">${data.title}</h2>`;
    if(data.instructions){
        innerHTML += '<ol class="bodyText">';
        innerHTML += data.instructions.map(t => `<li>${t}</li>`).join("");
        innerHTML += "</ol>";
    }
    if(data.dds){
        innerHTML += "<dl>";
        innerHTML += data.dds.map(dd => `<dt>${dd[0]}</dt><dd>${dd[1]}</dd>`);
        innerHTML += "</dl>";
    }
    if(data.info){
        innerHTML += '<ul class = "bodyText">'
        innerHTML += data.info.map(t => `<li>${t}</li>`).join("");
        innerHTML += "</ul>"
    }
    return innerHTML

}