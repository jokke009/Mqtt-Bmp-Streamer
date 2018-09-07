"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Config_1 = require("./Config");
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const feedme = require("feedme");
const https = require("https");
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
        this.jarSize = 10;
        Config_1.catMain.info("Executing Program: " + name);
        this.fontBuffer = fs.readFileSync(path.join(__dirname, "../../src/HZK16"));
        Config_1.catMain.debug("test value: " + this.fontBuffer.byteLength);
        this.jarList = ['a', 'b'];
    }
    main() {
        console.log('Hello World');
        this.readText("河");
        this.getfeed('https://www.mdbg.net/chinese/feed?feed=hsk_5_h');
        return 0;
    }
    getfeed(link) {
        https.get(link, (res) => {
            if (res.statusCode != 200) {
                Config_1.catMain.error("getFeed failed: ", new Error(`status code ${res.statusCode}`));
                return;
            }
            var parser = new feedme();
            parser.on('title', (title) => {
                console.log('title of feed is', title);
            });
            parser.on('entry', (entry) => {
                console.log();
                console.log('entry:', entry.title);
                console.log(entry.published);
            });
            res.pipe(parser);
        });
        return true;
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
    start() {
        setInterval(() => {
            this.updateBroker();
            for (let i = 0; i < this.jarSize; i++) {
                Config_1.catMain.warn("array nr: " + i + " value: = " + this.jarList[i]);
            }
        }, 1000);
    }
    updateBroker() {
    }
    addToCircularArray(newitem) {
        if (this.jarList.length >= this.jarSize) {
            this.jarList.shift();
        }
        else {
        }
        this.jarList.indexOf(newitem) === -1 ? this.jarList.push(newitem) : Config_1.catMain.debug("item all ready exists in the circular array: " + newitem);
    }
}
let program = new Program("My Program");
program.main();
program.start();
//# sourceMappingURL=main.js.map