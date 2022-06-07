class Point {
    neighbors = [];
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    join(point) {
        if(!this.neighbors.includes(point)) {
            this.neighbors.push(point);
        }
    }
    equals(arr) {
        return this.x === arr[0] && this.y === arr[1];
    }
    exportArrayOfPoints(array = []) {
        if(array.includes(this)) {
            return array;
        }
        array.push(this);
        this.neighbors.forEach(p => p.exportArrayOfPoints(array));
        return array;
    }
    toArray() {
        return [this.x, this.y];
    }
}

export const closeOOBPoly = poly => {
    const first = poly[0];
    const last = poly[poly.length - 1];
    if(
        (first[0] === 0 && first[1] > 0 && last[0] > 0 && last[1] === 0) ||
        (first[1] === 0 && first[0] > 0 && last[1] > 0 && last[0] === 0)
    ) {
        poly.push([0, 0]);
    }
    return poly;
}

export const poliesEquals = (p1, p2) => {
    if(p1.length !== p2.length) {
        return false;
    }
    for(let i = 0; i < p1.length; i++) {
        if(p1[i] != p2[i]) {
            return false;
        }
    }
    return true;
}

export const removeDuplicatePolies = polies => {
    const newPolies = [];
    polies.forEach(poly => {
        if(!newPolies.some(p => poliesEquals(p, poly))) {
            newPolies.push(poly);
        }
    });
    return newPolies;
}

const lineToPoly = lines => {
    const points = [];
    lines.forEach(l => {
        let p0 = points.find(p => p.equals(l[0]));
        let p1 = points.find(p => p.equals(l[1]));
        if(!p0) {
            p0 = new Point(...l[0]);
            points.push(p0);
        }
        if(!p1) {
            p1 = new Point(...l[1]);
            points.push(p1);
        }
        p0.join(p1);
        p1.join(p0);
    });
    const pointLists = [];
    while(points.length > 0) {
        const poly = points[0].exportArrayOfPoints();
        pointLists.push(poly);
        poly.forEach(p => {
            const index = points.indexOf(p);
            if(index !== -1) {
                points.splice(index, 1);
            }
        })
    }
    const pol = pointLists.map(pl => pl.map(p => p.toArray()));
    return pol;
}

export default lineToPoly;