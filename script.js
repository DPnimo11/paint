const whiteboard = document.querySelector("#whiteboard");
document.documentElement.addEventListener("mouseup", () => draw = false);
let width = 64;
let draw = false;
let rainbow = false;
let eraser = false;
let gradient = false;
let toolbar = Array.from(document.querySelector("#toolbar").children);
let board = [];
let color = "#000000";

function hexConverter (hexColor) {
    rgb = "rgb(";
    for (let i = 1; i < hexColor.length; i += 2) {
        rgb += parseInt(hexColor.slice(i, i + 2), 16) + ", ";
    }
    return rgb.slice(0, -2) + ")";

}

function drawHandler(e) {
    if (eraser) {
        e.target.style.backgroundColor = "rgb(255, 255, 255)";
        e.target.style.opacity = 1;
    } else if (rainbow) {
        e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)})`;
        e.target.style.opacity = 1;
    } else if (gradient) {
        /*
        const computedStyle = window.getComputedStyle(box);
        const opacity = computedStyle.opacity;
        */
        console.log(hexConverter(color), color);
        if (e.target.style.backgroundColor === hexConverter(color)) {
            e.target.style.opacity = +e.target.style.opacity + 0.1;
        } else {
            e.target.style.backgroundColor = color;
            e.target.style.opacity = 0.1;
        }
    } else {
        e.target.style.backgroundColor = color;
        e.target.style.opacity = 1;
    }
}

function initBoard() {
    whiteboard.replaceChildren();
    for (let i = 0; i < width; i++) {
        let row = document.createElement("div");
        let temp = []
        row.setAttribute("class", "row");
        
/* TODO: handle opacity, things to consider: inline style? rgba? color equality? */

        for (let j = 0; j < width; j++) {
            let box = document.createElement("div");
            box.setAttribute("class", "box");
            box.style.backgroundColor = "rgb(255, 255, 255)";
            box.style.opacity = 1;
            box.addEventListener("mousedown", (e) => {
                draw = true;
                drawHandler(e);
            })
            box.addEventListener("mouseenter", e => {
                if (draw) {
                    drawHandler(e);
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
            box.style.backgroundColor = "rgb(255, 255, 255)";
            box.style.opacity = 1;
        }
    }
}


/*TODO: get rid of ugly toolbar work, add global event listener dispatcher for highlighting, fix stupid if staements */

/* Temporary: Reformat */
toolbar[6].addEventListener("click", () => {
    width = + prompt("Choose the new number of squares per side!");
    while (isNaN(width) || width <= 0) {
        width = + prompt("Invalid number! Choose the new number of squares per side!");
    }
    document.documentElement.style.setProperty("--board-dim",`${width}`);
    initBoard();
});


/* RESET */
toolbar[5].addEventListener("click", () => clearBoard())

/* ERASER */
toolbar[4].addEventListener("click", (e) => {
    for (let i = 1; i < toolbar.length; i++) {
        toolbar[i].style.backgroundColor = "#FCB1A6";
    }
    e.target.style.backgroundColor = "#C092C7";
    eraser = true;
    rainbow = false;
    gradient = false;
})

/* GRADIENT */
/* todo: make this only highlight the border, not whole background */
toolbar[3].addEventListener("click", (e) => {
    for (let i = 1; i < toolbar.length; i++) {
        toolbar[i].style.backgroundColor = "#FCB1A6";
    }
    if (!gradient) {
        e.target.style.backgroundColor = "#C092C7";
    } else {
        e.target.style.backgroundColor = "#FCB1A6";
    }
    toolbar[1].style.backgroundColor = "#C092C7"
    rainbow = false;
    eraser = false;
    gradient = !gradient;
    color = toolbar[0].value;
});

/* RAINBOW */
toolbar[2].addEventListener("click", (e) => {
    for (let i = 1; i < toolbar.length; i++) {
        toolbar[i].style.backgroundColor = "#FCB1A6";
    }
    e.target.style.backgroundColor = "#C092C7";
    rainbow = true;
    eraser = false;
    gradient = false;
})

/* COLOR */
toolbar[1].addEventListener("click", (e) => {
    for (let i = 1; i < toolbar.length; i++) {
        if (toolbar[i].id === "gradient") continue;
        toolbar[i].style.backgroundColor = "#FCB1A6";
    }
    e.target.style.backgroundColor = "#C092C7";
    eraser = false;
    rainbow = false;
    color = toolbar[0].value;
})

/* COLOR SELECTOR */
toolbar[0].addEventListener("input", (e) => {
    if (!(rainbow || eraser)) {
        color = e.target.value;
    }
})

initBoard();
toolbar[1].click()