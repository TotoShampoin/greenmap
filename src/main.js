import { input, onupdate, lock, unlock } from "./io.js";
import { c, drawImage, drawPoly } from "./grafx.js";
import "./march.js";
import { getMarches } from "./march.js";
import lineToPoly, { closeOOBPoly, removeDuplicatePolies } from "./lineToPoly.js";
import { zip } from "./exporter.js";

window.input = input;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
onupdate.click = async () => {
    lock();
    while(lines.length) lines.shift();
    while(polies.length) polies.shift();
    drawImage(input.image);
    const total_i = input.image.width / input.squar;
    const total_j = input.image.height / input.squar;
    for(let i = 0; i < total_i; i++) {
        for(let j = 0; j < total_j; j++) {
            const march = getMarches(i, j, input.squar, input.color, input.toler, 1);
            lines.push(...march);
            document.getElementById("prog").value = 100 * (i * total_j + j) / (total_i * total_j);
        }
        await sleep(1);
    }
    document.getElementById("prog").value = 100;
    polies = lineToPoly(lines);
    polies.forEach(p => {
        closeOOBPoly(p);
        drawPoly(p, "#00F");
        polies.push([...p]);
    });
    polies = removeDuplicatePolies(polies);
    console.log(polies);
    unlock();
}
onupdate.export = async () => {
    const data = await zip([
        input.file,
        {
            width: input.image.width,
            height: input.image.height,
            squar: input.squar,
            color: input.color,
            toler: input.toler
        },
        polies
    ]);
    const a = document.createElement("a");
    a.href = data;
    a.download = "poly.greenmap.zip";
    a.click();
}
