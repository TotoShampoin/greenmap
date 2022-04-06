import Color from "../includes/color.esm.js";
import { drawLine, getSquare } from "./grafx.js";

export function lerp(x, x0, x1, y0 = 0, y1 = 1) {
	if (x0 === x1) {
		return null;
	}
	return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
}

function inRange(y, y0 = 0, y1 = 1) {
    return y ? y >= y0 && y < y1 : false;
}

function getDistance(a, b) {
    const ara = [...a].map(c => c/255);
    const arb = [...b].map(c => c/255);
    const ca = new Color("", ara);
    const cb = new Color("", arb);
    const d = ca.deltaE2000(cb);
    return d;
}

export function getMarchSquare(x, y, s, color) {
    return getSquare(x*s, y*s, s).map(rgb => getDistance(rgb, color));
}

function marchOne(x, y, s, color, l, mode = 0) {
    const lines = [];
    const [a00, a01, a10, a11, c] = getMarchSquare(x, y, s, color);
    const   pu = lerp(l, a00, a01),
            pd = lerp(l, a10, a11),
            pl = lerp(l, a00, a10),
            pr = lerp(l, a01, a11);
    const   iu = inRange(pu),
            id = inRange(pd),
            il = inRange(pl),
            ir = inRange(pr);
    switch(mode) {
        case 0:
            if(iu && il && !id && !ir) {
                lines.push([[pu,  0], [ 0, pl]]);
            }
            if(il && id && !iu && !ir) {
                lines.push([[ 0, pl], [pd,  1]]);
            }
            if(id && ir && !iu && !il) {
                lines.push([[pd,  1], [ 1, pr]]);
            }
            if(ir && iu && !id && !il) {
                lines.push([[ 1, pr], [pu,  0]]);
            }
            if(iu && id && !il && !ir) {
                lines.push([[pu,  0], [pd,  1]]);
            }
            if(il && ir && !iu && !id) {
                lines.push([[ 0, pl], [ 1, pr]]);
            }
            if(iu && id && il && ir) {
                if(a00 < l && a11 < l && c < l) {
                    lines.push([[pu,  0], [ 1, pr]]);
                    lines.push([[ 0, pl], [pd,  1]]);
                } else {
                    lines.push([[pu,  0], [ 0, pl]]);
                    lines.push([[ 1, pr], [pd,  1]]);
                }
            }
            break;
        case 1:
            if(iu && il && !id && !ir) {
                lines.push([[.5,  0], [ 0, .5]]);
            }
            if(il && id && !iu && !ir) {
                lines.push([[ 0, .5], [.5,  1]]);
            }
            if(id && ir && !iu && !il) {
                lines.push([[.5,  1], [ 1, .5]]);
            }
            if(ir && iu && !id && !il) {
                lines.push([[ 1, .5], [.5,  0]]);
            }
            if(iu && id && !il && !ir) {
                lines.push([[.5,  0], [.5,  1]]);
            }
            if(il && ir && !iu && !id) {
                lines.push([[ 0, .5], [ 1, .5]]);
            }
            if(iu && id && il && ir) {
                if(a00 < l && a11 < l && c < l) {
                    lines.push([[.5,  0], [ 1, .5]]);
                    lines.push([[ 0, .5], [.5,  1]]);
                } else {
                    lines.push([[.5,  0], [ 0, .5]]);
                    lines.push([[ 1, .5], [.5,  1]]);
                }
            }
            break;
    }
    return lines;
}


export function getMarches(x, y, s, color, l, mode = 0) {
    const marches = marchOne(x, y, s, color, l, mode);
    const march_output = [];
    marches.forEach(march => {
        if(march) {
            march_output.push( march.map(([px,py]) => [(x+px)*s,(y+py)*s]) );
        }
    });
    return march_output;
}

export function drawMarches(x, y, s, color, l) {
    const marches = marchOne(x, y, s, color, l);
    const march_output = [];
    marches.forEach(march => {
        if(march) {
            drawLine(...( march.map(([px,py]) => [(x+px)*s,(y+py)*s]) ));
            march_output.push( march.map(([px,py]) => [(x+px)*s,(y+py)*s]) );
        }
    });
    return march_output;
}
