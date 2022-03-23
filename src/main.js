import { input, onupdate } from "./io.js";
import { c, ctx, drawImage, drawLine, drawSquare } from "./grafx.js";
import "./march.js";
import { drawMarches, getMarches } from "./march.js";

const lines = [];

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
    drawImage(input.image);
    for(let i = 0; i < input.image.width/input.squar; i++) {
        for(let j = 0; j < input.image.height/input.squar; j++) {
            lines.push(...getMarches(i, j, input.squar, input.color, input.toler));
        }
    }
    lines.forEach(l => drawLine(...l, "#F00"));
}
