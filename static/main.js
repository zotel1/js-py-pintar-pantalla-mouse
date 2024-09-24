/*var box = document.getElementById('box');
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
*/


var box = document.getElementById('box');
box.width = window.innerWidth;
box.height = window.innerHeight;
var papel = box.getContext('2d');

var estado = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0;

var x = "black",
    y = document.getElementById('brushSize').value; // Valor inicial del tamaño del pincel

// Array para almacenar las líneas dibujadas
var lines = [];

// Cambiar el tamaño del pincel cuando se ajuste la barra
document.getElementById('brushSize').addEventListener('input', function () {
    y = this.value;
});

// Eventos de mouse
box.addEventListener("mousemove", function (e) {
    encontrarxy('move', e);
}, false);
box.addEventListener("mousedown", function (e) {
    if (e.button === 0) { // Click izquierdo para dibujar
        estado = true;
        prevX = currX;
        prevY = currY;
    } else if (e.button === 2) { // Click derecho para borrar
        borrarLinea(e.clientX, e.clientY);
    }
}, false);
box.addEventListener("mouseup", function (e) {
    if (estado) {
        estado = false; // Se detiene el dibujo al soltar el mouse
        lines.push({ prevX, prevY, currX, currY, color: x, width: y });
    }
}, false);
box.addEventListener("mouseout", function (e) {
    estado = false; // Se detiene el dibujo al salir del canvas
}, false);

// Evento para clic derecho
box.addEventListener("contextmenu", function (e) {
    e.preventDefault(); // Evitar el menú contextual
});

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
    currX = e.clientX - box.offsetLeft;
    currY = e.clientY - box.offsetTop;

    if (estado) {
        dibujar();
        prevX = currX;
        prevY = currY;
    }
}

// Función para borrar líneas cercanas
function borrarLinea(mouseX, mouseY) {
    lines = lines.filter(line => {
        var dx = line.currX - line.prevX;
        var dy = line.currY - line.prevY;
        var len = Math.sqrt(dx * dx + dy * dy);
        var dot = ((mouseX - line.prevX) * dx + (mouseY - line.prevY) * dy) / (len * len);

        if (dot < 0 || dot > 1) {
            return true; // Mantener línea si no está en el segmento
        }

        var closestX = line.prevX + dot * dx;
        var closestY = line.prevY + dot * dy;
        var distance = Math.sqrt((closestX - mouseX) ** 2 + (closestY - mouseY) ** 2);

        return distance >= 5; // Mantener línea si no está cerca del mouse
    });

    redraw(); // Redibujar las líneas restantes
}

// Función para redibujar todas las líneas
function redraw() {
    papel.clearRect(0, 0, box.width, box.height); // Limpiar el canvas
    lines.forEach(line => {
        papel.beginPath();
        papel.moveTo(line.prevX, line.prevY);
        papel.lineTo(line.currX, line.currY);
        papel.strokeStyle = line.color;
        papel.lineWidth = line.width;
        papel.stroke();
        papel.closePath();
    });
}
