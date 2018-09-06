"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Config_1 = require("./Config");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
var Delays;
(function (Delays) {
    Delays[Delays["Short"] = 500] = "Short";
    Delays[Delays["Medium"] = 2000] = "Medium";
    Delays[Delays["Long"] = 5000] = "Long";
})(Delays = exports.Delays || (exports.Delays = {}));
function delayedHello(name, delay = Delays.Medium) {
    return new Promise((resolve) => setTimeout(() => resolve(`Hello, ${name}`), delay));
}
function greeter(name) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield delayedHello(name, Delays.Long);
    });
}
exports.greeter = greeter;
class Program {
    constructor(name) {
        this.name = name;
        Config_1.catMain.info("Executing Program: " + name);
        this.fontBuffer = fs.readFileSync(path.join(__dirname, "../../src/HZK16"));
        Config_1.catMain.debug("test value: " + this.fontBuffer.byteLength);
    }
    main() {
        console.log('Hello World');
        this.readText("河");
        return 0;
    }
    readText(text) {
        var ret = [];
        var gbkBytes = iconv.encode(text, "gbk");
        for (var i = 0; i < gbkBytes.length / 2; i++) {
            var qh = gbkBytes[2 * i] - 0xa0;
            var wh = gbkBytes[2 * i + 1] - 0xa0;
            var offset = (94 * (qh - 1) + (wh - 1)) * 32;
            var buff = this.fontBuffer.slice(offset, offset + 32);
            var font = [];
            for (var j = 0; j < 16; j++) {
                var row = ("" + buff[2 * j].toString(2) + buff[2 * j + 1].toString(2));
                row = String(row.split("").map(c => 0 | Number(c)));
                Config_1.catMain.debug(row);
            }
            ret.push(font);
        }
    }
}
let program = new Program("My Program");
program.main();
//# sourceMappingURL=main.js.map