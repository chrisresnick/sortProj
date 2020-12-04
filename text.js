const colors = [
                "Red indicates unsorted bars",
                "Yellow indicates bars that are being compared to each other",
                "Green indicates bars that are sorted or  provisionally sorted"

               ]

const text = {

    bubbleSort : {
        title: "Bubble Sort",
        dds : [
            ["Time Complexity:", "O(n<sup>2</sup>)"],
            ["Space Complexity:", "O(1)"]
        ],
        info: colors
    },

    insertionSort : {
        title: "Insertion Sort",
        dds : [
            ["Time Complexity:", "O(n<sup>2</sup>)"],
            ["Space Complexity:", "O(1)"]
        ],
        info: colors
    },

    mergeSort : {
        title: "Merge Sort",
        dds : [
            ["Time Complexity:", "O(n log n)"],
            ["Space Complexity:", "O(n)"]
        ],
        info: colors
    },

    quickSort : {
        title: "Quick Sort",
        dds : [
            ["Time Complexity:", "O(n log n)"],
            ["Space Complexity:", "O(n)"]
        ],
        info: colors
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
            'You can use the "Animation Speed" slider to speed up or slow down the animation. Slow it down to see more detail.',
            'You can change the number of bars on the dispay with the "Number of Bars" slider.'
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
        innerHTML += '<dl class="bodyText">';
        innerHTML += data.dds.map(dd => `<dt>${dd[0]}</dt><dd>${dd[1]}</dd>`).join("");
        innerHTML += "</dl>";
    }
    if(data.info){
        innerHTML += '<ul class = "bodyText">'
        innerHTML += data.info.map(t => `<li>${t}</li>`).join("");
        innerHTML += "</ul>"
    }
    return innerHTML

}
