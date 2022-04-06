function hexToRgb(hex) {
    var res = hex.match(/[a-f0-9]{2}/gi);
    return res && res.length === 3
        ? res.map(function(v) { return parseInt(v, 16) })
        : null;
}

export const input = {
    file: "",
    image: new Image(),
    color: [0,0,0],
    toler: 30,
    squar: 20
};
export const onupdate = {
    file: () => {},
    click: () => {},
    export: () => {}
}

export const output = () => {};

const $c = $("#c");
const $inputfile = $("#inputfile");
const $exportbut = $("#exportbut");
const $updatebut = $("#updatebut");
const $colorrang = $("#input-color");
const $tolerrang = $("#input-toler");
const $sqaresize = $("#input-sqrz");

$inputfile.on("change", function() {
    /** @type {File} */ const file = $(this).prop("files")[0];
    input.file = URL.createObjectURL(file);
    input.image.src = input.file;
    input.image.addEventListener("load", ev => {onupdate.file()});
});
$updatebut.on("click", function() {
    input.color = [...hexToRgb($colorrang.val()), 255];
    input.toler = parseInt($tolerrang.val());
    input.squar = parseInt($sqaresize.val());
    onupdate.click();
});
$exportbut.on("click", function() {
    onupdate.export();
});
