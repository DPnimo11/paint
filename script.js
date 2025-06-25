const whiteboard = document.querySelector("#whiteboard");
document.documentElement.addEventListener("mouseup", () => draw = false);
let width = 64;
let draw = false;
let rainbow = false;
let eraser = false;
let gradient = false;
let toolbar = Array.from(document.querySelector("#toolbar").children);
console.log(toolbar);
let board = [];
let color = "black";

function initBoard() {
    for (let i = 0; i < width; i++) {
        let row = document.createElement("div");
        let temp = []
        row.setAttribute("class", "row");
        
/* TODO: handle opacity, things to consider: inline style? rgba? color equality? */

        for (let j = 0; j < width; j++) {
            let box = document.createElement("div");
            box.setAttribute("class", "box");
            box.style.backgroundColor = "white";
            box.addEventListener("mousedown", (e) => {
                draw = true;
                if (eraser) {
                    e.target.style.backgroundColor = "white";
                } else if (rainbow) {
                    e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)})`;
                } else if (gradient) {
                    if (e.target.style.backgroundColor === "rgb(255, 0, 0)") {
                        e.target.style.opacity = e.target.style.opacity + 0.1;
                    } else {

                        e.target.style.opacity = 0.1;
                    }
                } else {
                    e.target.style.backgroundColor = color;
                }
            })
            box.addEventListener("mouseenter", e => {
                if (draw) {
                    if (eraser) {
                        e.target.style.backgroundColor = "white";
                    } else if (rainbow) {
                        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                    } else if (gradient) {
                        console.log(e.target.style.backgroundColor);
                        if (e.target.style.backgroundColor === "rgb(255, 0, 0)") {
                            console.log(e.target.style.opacity);
                            e.target.style.opacity = e.target.style.opacity + 0.1;
                        } else {
                            e.target.style.opacity = 0.1;
                        }
                    } else {
                        e.target.style.backgroundColor = color;
                }
                }
            })
            box.addEventListener('dragstart', e => {
                e.preventDefault();
            });
            row.appendChild(box);
            temp.push(box)
        }
        board.push(temp)
        whiteboard.appendChild(row);
    }
}

function clearBoard() {
    for (let row of board) {
        for (let box of row) {
            box.style.backgroundColor = "white";
        }
    }
}


/*TODO: get rid of ugly toolbar work, add global event listener dispatcher for highlighting, fix stupid if staements */

toolbar[5].addEventListener("click", () => clearBoard())

toolbar[4].addEventListener("click", (e) => {
    if (e.target.style.backgroundColor != "rgb(192, 146, 199)") {
        for (let i = 1; i < toolbar.length; i++) {
            toolbar[i].style.background = "#FCB1A6";
        }
        e.target.style.backgroundColor = "#C092C7";
        eraser = true;
        rainbow = false;
        gradient = false;
    }
})


/* todo: make this only highlight the border, not whole background */
toolbar[3].addEventListener("click", (e) => {
    if (e.target.style.backgroundColor != "rgb(192, 146, 199)") {
        for (let i = 1; i < toolbar.length; i++) {
            toolbar[i].style.background = "#FCB1A6";
        }
        e.target.style.backgroundColor = "#C092C7";
    }
    rainbow = false;
    eraser = false;
    /*gradient = !gradient;*/
    color = toolbar[0].value;
});

toolbar[2].addEventListener("click", (e) => {
    if (e.target.style.backgroundColor != "rgb(192, 146, 199)") {
        for (let i = 1; i < toolbar.length; i++) {
            toolbar[i].style.background = "#FCB1A6";
        }
        e.target.style.backgroundColor = "#C092C7";
    }
    rainbow = true;
    eraser = false;
    gradient = false;
})

toolbar[1].addEventListener("click", (e) => {
    if (e.target.style.backgroundColor != "rgb(192, 146, 199)") {
        for (let i = 1; i < toolbar.length; i++) {
            toolbar[i].style.background = "#FCB1A6";
        }
        e.target.style.backgroundColor = "#C092C7";
    }
    eraser = false;
    rainbow = false;
    color = toolbar[0].value;
})

toolbar[0].addEventListener("input", (e) => {
    if (!(rainbow || eraser)) {
        color = e.target.value;
    }
})

initBoard();
toolbar[1].click()