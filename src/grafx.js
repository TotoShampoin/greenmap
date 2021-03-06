/** @type {JQuery<HTMLCanvasElement>} */
export const c = $("#c");
export const ctx = c[0].getContext("2d");

export const clearGraph = () => {
    ctx.clearRect(0, 0, c.width(), c.height());
}

export const drawImage = (image) => {
    ctx.drawImage(image, 0, 0);
}

export const drawSquare = (x0, y0, w, h, c, l = 2) => {
    ctx.lineWidth = l;
    ctx.strokeStyle = c;
    ctx.strokeRect( x0, y0, w, h );
    ctx.globalAlpha = 1;
}

export const drawLine = ([x0, y0], [x1, y1], c) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = c
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
}

export const drawPoly = (poly, c) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = c;
    ctx.beginPath();
    ctx.moveTo(...poly[0]);
    poly.slice(1).forEach(p => ctx.lineTo(...p));
    ctx.closePath();
    ctx.stroke();
}

export const getPixel = (x, y) => ctx.getImageData(x, y, 1, 1).data;

export const getSquare = (x0, y0, size) => [
    getPixel(x0       , y0       ),
    getPixel(x0+size  , y0       ),
    getPixel(x0       , y0+size  ),
    getPixel(x0+size  , y0+size  ),
    getPixel(x0+size/2, y0+size/2),
];

window.getSquare = getSquare;
window.drawLine = drawLine;