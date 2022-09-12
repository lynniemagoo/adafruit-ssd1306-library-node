/**************************************************************************
 This is an example for our Monochrome OLEDs based on SSD1306 drivers

 Pick one up today in the adafruit shop!
 ------> http://www.adafruit.com/category/63_98

 This example is for a 128x64 pixel display using I2C to communicate
 3 pins are required to interface (two I2C and one reset).

 Adafruit invests time and resources providing this open
 source code, please support Adafruit and open-source
 hardware by purchasing products from Adafruit!

 Written by Limor Fried/Ladyada for Adafruit Industries,
 with contributions from the open source community.

 Ported to NodeJS by Lyndel R. McGee

 BSD license, check license.txt for more information
 All text above, and the splash screen below must be
 included in any redistribution.
 **************************************************************************/
'use strict';
const Adafruit_GFX_Library = require("@lynniemagoo/adafruit-gfx-library");
const delay = Adafruit_GFX_Library.Utils.sleepMs;


const BASE_PATH = "../../";
const {Adafruit_SSD1306} = require(BASE_PATH + "index");


const {
    testDrawLine,
    drawRectWorker,
    fillRectWorker,
    drawCircleWorker,
    fillCircleWorker,
    drawRoundRectWorker,
    fillRoundRectWorker,
    drawTriangleWorker,
    fillTriangleWorker,
    drawCharWorker,
    drawStylesWorker,
    scrollTextWorker,
    drawBitmapWorker,
    testAnimate,
    workerRunner,
    LOGO_BMP,
    LOGO_HEIGHT,
    LOGO_WIDTH
} = require("../common/ssd1306_common");


const Adafruit_SPITFT = Adafruit_GFX_Library.Display.Adafruit_SPITFT;
const {Mixin_I2C_Display, I2C_DEFAULTS} = Adafruit_GFX_Library.Mixins;


// Use mixin to bind SPI implementation to SSD1306 class.
class Adafruit_SSD1306_I2C extends Mixin_I2C_Display(Adafruit_SSD1306) {}


async function main() {
    //Constants to use for vccSelection - default(SSD1306_SWITCHCAPVCC).
    //
    //const SSD1306_EXTERNALVCC = 0x01;  ///< External display voltage source
    //const SSD1306_SWITCHCAPVCC = 0x02; ///< Gen. display voltage from 3.3V
    const displayOptions = {
        width:128,
        height:64,
        rotation:0,
        /*noSplash:true,*/
        vccSelection:0x02,
        rstGpioNb:-1,
        i2cBusNumber:0x01,
        i2cAddress:0x3C
    }

    const display = new Adafruit_SSD1306_I2C(displayOptions);
    // Startup display - same as original adafruit begin() but options specified in the constructor.
    await display.startup();
    await delay(3000);

    let count = 4, rotation = 0;

    while (count--) {
        await display.setRotation(rotation);

        await testDrawLine(display);

        await workerRunner(display, drawRectWorker);
        await workerRunner(display, fillRectWorker);

        await workerRunner(display, drawCircleWorker);
        await workerRunner(display, fillCircleWorker);

        await workerRunner(display, drawRoundRectWorker);
        await workerRunner(display, fillRoundRectWorker);

        await workerRunner(display, drawTriangleWorker);
        await workerRunner(display, fillTriangleWorker);

        await workerRunner(display, drawCharWorker);
        await workerRunner(display, drawStylesWorker);
        await workerRunner(display, scrollTextWorker);
        await workerRunner(display, drawBitmapWorker);

        // Invert and restore display, pausing in-between
        await display.invertDisplay(true);
        await delay(1000);
        await display.invertDisplay(false);
        await delay(3000);

        // Do 10 seconds of animation.
        await testAnimate(display, LOGO_BMP, LOGO_WIDTH, LOGO_HEIGHT, 10000);
        rotation +=1;
    }
    await delay(3000);
    await display.setRotation(0);
    await display.shutdown();
}
main();