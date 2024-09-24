var box = document.getElementById('box');
box.width = window.innerWidth;
box.height = window.innerHeight;
var papel = box.getContext('2d');

var estado = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    punto = false;

var x = "black",
    y = 2;

// Eventos de mouse
box.addEventListener("mousemove", function (e) {
    encontrarxy('move', e);
}, false);
box.addEventListener("mousedown", function (e) {
    encontrarxy('down', e);
}, false);
box.addEventListener("mouseup", function (e) {
    encontrarxy('up', e);
}, false);
box.addEventListener("mouseout", function (e) {
    encontrarxy('out', e);
}, false);

// Eventos de touch
box.addEventListener("touchstart", function (e) {
    encontrarxy('down', e.touches[0]);
    e.preventDefault(); // Evita el desplazamiento en móviles mientras se dibuja
}, false);
box.addEventListener("touchmove", function (e) {
    encontrarxy('move', e.touches[0]);
    e.preventDefault(); // Evita el desplazamiento en móviles mientras se dibuja
}, false);
box.addEventListener("touchend", function (e) {
    encontrarxy('up', e.changedTouches[0]);
    e.preventDefault();
}, false);

// Función para dibujar
function dibujar() {
    papel.beginPath();
    papel.moveTo(prevX, prevY);
    papel.lineTo(currX, currY);
    papel.strokeStyle = x;
    papel.lineWidth = y;
    papel.stroke();
    papel.closePath();
}

// Función para encontrar la posición (x, y)
function encontrarxy(res, e) {
    if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - box.offsetLeft;
        currY = e.clientY - box.offsetTop;

        estado = true;
        punto = true;
        if (punto) {
            papel.beginPath();
            papel.fillStyle = x;
            papel.fillRect(currX, currY, 2, 2);
            papel.closePath();
            punto = false;
        }
    }
    if (res === 'up' || res === "out") {
        estado = false;
    }
    if (res === 'move') {
        if (estado) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - box.offsetLeft;
            currY = e.clientY - box.offsetTop;
            dibujar();
        }
    }
}
