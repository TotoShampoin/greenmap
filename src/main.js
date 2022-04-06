import { input, onupdate } from "./io.js";
import { c, drawImage, drawPoly } from "./grafx.js";
import "./march.js";
import { getMarches } from "./march.js";
import lineToPoly, { closeOOBPoly } from "./lineToPoly.js";

const lines = [];

let polies = [];

onupdate.file = () => {
    c[0].width  = input.image.width;
    c[0].height = input.image.height;
    c.width("");
    if(c.height() > 640) {
        c.width( 640 * c.width() / c.height() );
    }
    drawImage(input.image);
}
onupdate.click = () => {
    while(lines.length) lines.shift();
    while(polies.length) polies.shift();
    drawImage(input.image);
    for(let i = 0; i < input.image.width/input.squar; i++) {
        for(let j = 0; j < input.image.height/input.squar; j++) {
            lines.push(...getMarches(i, j, input.squar, input.color, input.toler, 1));
        }
    }
    polies = lineToPoly(lines);
    polies.forEach(p => {
        closeOOBPoly(p);
        drawPoly(p, "#00F");
        polies.push([...p]);
    });
    console.log(polies);
}
onupdate.export = () => {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(polies));
    const a = document.createElement("a");
    a.href = data;
    a.download = "poly.json";
    a.click();
}