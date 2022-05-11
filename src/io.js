function hexToRgb(hex) {
    var res = hex.match(/[a-f0-9]{2}/gi);
    return res && res.length === 3
        ? res.map(function(v) { return parseInt(v, 16) })
        : null;
}

export const input = {
    name: "",
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
const $tolerrang2= $("#input-toler-2");
const $sqaresize = $("#input-sqrz");

$inputfile.on("change", function() {
    /** @type {File} */ const file = $(this).prop("files")[0];
    input.name = file.name;
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
$tolerrang.on("change", function() {
    input.toler = parseInt($(this).val());
    $tolerrang2.val($(this).val());
});
$tolerrang2.on("change", function() {
    input.toler = parseInt($(this).val());
    $tolerrang.val($(this).val());
});

export const lock = () => {
    $inputfile.prop("disabled", true);
    $updatebut.prop("disabled", true);
    $exportbut.prop("disabled", true);
    $colorrang.prop("disabled", true);
    $tolerrang.prop("disabled", true);
    $tolerrang2.prop("disabled", true);
    $sqaresize.prop("disabled", true);
    $(".input").addClass("input--disabled");
}
export const unlock = () => {
    $inputfile.prop("disabled", false);
    $updatebut.prop("disabled", false);
    $exportbut.prop("disabled", false);
    $colorrang.prop("disabled", false);
    $tolerrang.prop("disabled", false);
    $tolerrang2.prop("disabled", false);
    $sqaresize.prop("disabled", false);
    $(".input").removeClass("input--disabled");
}