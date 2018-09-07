import { catMain } from "./Config"
import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite';
import * as mqtt from 'mqtt';
import * as feedme from 'feedme';
import * as https from 'https';

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
  private jarSize = 10;
  private jarList: string[];
  constructor(public name: string) {
    catMain.info("Executing Program: " + name);
    this.fontBuffer = fs.readFileSync(path.join(__dirname, "../../src/HZK16"));
    catMain.debug("test value: " + this.fontBuffer.byteLength);
    this.jarList = ['a','b'];
  }

  public main(): number {
    console.log('Hello World');
    this.readText("河");
    this.getfeed('https://www.mdbg.net/chinese/feed?feed=hsk_5_h');
    //this.getfeed('https://www.npr.org/rss/rss.php?id=1001');
    return 0;
  }

  public getfeed(link: string): boolean {
    https.get(link, (res) => {
      if (res.statusCode != 200) {
        catMain.error("getFeed failed: " ,new Error(`status code ${res.statusCode}`));
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

  public start(): void{
    setInterval(() => {
      this.updateBroker();
      for (let i = 0; i < this.jarSize; i++)
      {
        catMain.warn("array nr: " + i + " value: = " + this.jarList[i]);
      }
     
  }, 1000);
  }


  public updateBroker()
  {

  }

  public addToCircularArray(newitem: string)
  {
      if(this.jarList.length >= this.jarSize)
      {
        this.jarList.shift();
      }
      else
      {
        
      }
      this.jarList.indexOf(newitem) === -1 ?  this.jarList.push(newitem) : catMain.debug("item all ready exists in the circular array: " + newitem);
  }

}



// create the instance of the class

let program = new Program("My Program");
program.main();
program.start();