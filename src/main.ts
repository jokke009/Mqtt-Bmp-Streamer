import { catMain } from "./Config"
import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite';
import * as mqtt from 'mqtt';
import * as feedme from 'feedme';
import * as http from 'http';

/**
 * Some predefined delays (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

/**
 * Returns a Promise<string> that resolves after given time.
 *
 * @param {string} name - A name.
 * @param {number=} [delay=Delays.Medium] - Number of milliseconds to delay resolution of the Promise.
 * @returns {Promise<string>}
 */
function delayedHello(
  name: string,
  delay: number = Delays.Medium,
): Promise<string> {
  return new Promise((resolve: (value?: string) => void) =>
    setTimeout(() => resolve(`Hello, ${name}`), delay),
  );
}

// Below are examples of using TSLint errors suppression
// Here it is suppressing missing type definitions for greeter function

// tslint:disable-next-line typedef
export async function greeter(name) {
  // tslint:disable-next-line no-unsafe-any no-return-await
  return await delayedHello(name, Delays.Long);
}



// define the class with constructor

class Program {

  private fontBuffer;
  constructor(public name: string) {
    catMain.info("Executing Program: " + name);
    this.fontBuffer = fs.readFileSync(path.join(__dirname, "../../src/HZK16"));
    catMain.debug("test value: " + this.fontBuffer.byteLength);
  }

  public main(): number {
    console.log('Hello World');
    this.readText("河");
    this.getfeed();
    return 0;
  }

  public getfeed(): boolean {
    http.get('http://www.npr.org/rss/rss.php?id=1001', (res) => {
      if (res.statusCode != 200) {
        console.error(new Error(`status code ${res.statusCode}`));
        return;
      }
      var parser = new feedme();
      parser.on('title', (title) => {
        console.log('title of feed is', title);
      });
      parser.on('item', (item) => {
        console.log();
        console.log('news:', item.title);
        console.log(item.description);
      });
      res.pipe(parser);
    });
    return true;
  }

  public readText(text: string) {
    var ret = [];
    var gbkBytes = iconv.encode(text, "gbk")
    for (var i = 0; i < gbkBytes.length / 2; i++) {
      var qh = gbkBytes[2 * i] - 0xa0;
      var wh = gbkBytes[2 * i + 1] - 0xa0;
      var offset = (94 * (qh - 1) + (wh - 1)) * 32;
      var buff = this.fontBuffer.slice(offset, offset + 32);
      //catMain.debug("16x16:  " + buff);
      var font = [];



      for (var j = 0; j < 16; j++) {
        var row = ("" + buff[2 * j].toString(2) + buff[2 * j + 1].toString(2));

        row = String(row.split("").map(c => 0 | Number(c)));
        catMain.debug(row);
        //font.push(row1);

      }
      ret.push(font);
    }

  }

}

// create the instance of the class

let program = new Program("My Program");
program.main();
