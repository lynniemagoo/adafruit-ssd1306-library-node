/**************************************************************************
 These are common utilities for testing the SSD1306 displays.

 Pick one up today in the adafruit shop!
 ------> http://www.adafruit.com/category/63_98

 This example is for a 128x32 pixel display using I2C to communicate
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
const Adafruit_GFX_Library = require("adafruit-gfx-library");
const delay = Adafruit_GFX_Library.Utils.sleepMs;

const {SSD1306_WHITE, SSD1306_BLACK, SSD1306_INVERSE,
       WHITE, BLACK, INVERSE} = require("../../index").Adafruit_SSD1306_Colors;


const toInt = Math.trunc,
      fMax = Math.max,
      fMin = Math.min,
      fFloor = Math.floor,
      fRandom = Math.random;


// Random Number Helper method
// See https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomInteger(min, max) {
    return fFloor(fRandom() * (max - min + 1)) + min;
}


async function testDrawLine(display) {
    const loop_delay = 35, w = display.width(), h = display.height();
    const part_delay = 2000;
    let i, doWork;

    await display.clearDisplay(); // Clear display buffer

    doWork = async _ => {
        for(i=0; i<w; i+=4) {
            // the JS version of this display is chainable so we can chain methods
            // that modify the buffer or display.
            await display.drawLine(0, 0, i, h-1, SSD1306_WHITE)
                         .display(); // Update screen with each newly-drawn line
            await delay(loop_delay);
        }
    };
    await doWork();

    doWork = async _ => {
        for(i=0; i<h; i+=4) {
            await display.drawLine(0, 0, w-1, i, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    await delay(part_delay);

    await display.clearDisplay();

    doWork = async _ => {
        for(i=0; i<w; i+=4) {
            await display.drawLine(0, h-1, i, 0, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    doWork = async _ => {
        for(i=h-1; i>=0; i-=4) {
            await display.drawLine(0, h-1, w-1, i, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    await delay(part_delay);

    await display.clearDisplay();

    doWork = async _ => {
        for(i=w-1; i>=0; i-=4) {
            await display.drawLine(w-1, h-1, i, 0, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    doWork = async _ => {
        for(i=h-1; i>=0; i-=4) {
            await display.drawLine(w-1, h-1, 0, i, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    await delay(part_delay);

    await display.clearDisplay();

    doWork = async _ => {
        for(i=0; i<h; i+=4) {
            await display.drawLine(w-1, 0, 0, i, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    doWork = async _ => {
        for(i=w-1; i>0; i-=4) {
            await display.drawLine(w-1, 0, i, h-1, SSD1306_WHITE)
                         .display();
            await delay(loop_delay);
        }
    };
    await doWork();

    await delay(part_delay);
}


const drawRectWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<h/2; i+=2) {
        await display.drawRect(i, i, w-2*i, h-2*i, SSD1306_WHITE)
                     .display(); // Update screen with each newly-drawn rectangle
        await delay(loop_delay);
    }
}


const fillRectWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<h/2; i+=3) {
        // The INVERSE color is used so rectangles alternate white/black
        await display.fillRect(i, i, w-i*2, h-i*2, SSD1306_INVERSE)
                     .display(); // Update screen with each newly-drawn rectangle
        await delay(loop_delay);
    }
};


const drawCircleWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<fMax(w,h)/2; i+=2) {
        await display.drawCircle(w/2, w/2, i, SSD1306_WHITE)
                     .display();
        await delay(loop_delay);
    }
};


const fillCircleWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=fMax(w,h)/2; i>0; i-=3) {
        // The INVERSE color is used so circles alternate white/black
        await display.fillCircle(w/2, h/2, i, SSD1306_INVERSE)
                     .display(); // Update screen with each newly-drawn circle
        await delay(loop_delay);
    }
};


const drawRoundRectWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<h/2-2; i+=2) {
        await display.drawRoundRect(i, i, w-2*i, h-2*i, h/4, SSD1306_WHITE)
                     .display();
        await delay(loop_delay);
    }
};


const fillRoundRectWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<h/2-2; i+=2) {
        // The INVERSE color is used so round-rects alternate white/black
        await display.fillRoundRect(i, i, w-2*i, h-2*i, h/4, SSD1306_INVERSE)
                     .display();
        await delay(loop_delay);
    }
};


const drawTriangleWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=0; i<fMax(w,h)/2; i+=5) {
        await display.drawTriangle(w/2, h/2-i, w/2-i, h/2+i,  w/2+i, h/2+i, SSD1306_WHITE)
                     .display();
        await delay(loop_delay);
    }
};


const fillTriangleWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();

    for(let i=fMax(w,h)/2; i>0; i-=5) {
        // The INVERSE color is used so triangles alternate white/black
        await display.drawTriangle(w/2, h/2-i, w/2-i, h/2+i,  w/2+i, h/2+i, SSD1306_INVERSE)
                     .display();
        await delay(loop_delay);
    }
};


const drawCharWorker = async (display, loop_delay = 1) => {

    await display.setTextSize(1)                // Normal 1:1 pixel scale
                 .setTextColor(SSD1306_WHITE)   // Draw white text
                 .setCursor(0, 0)               // Start at top-left corner
                 .cp437(true);                  // Use full 256 char 'Code Page 437' font

    // Not all the characters will fit on the display. This is normal.
    // Library will draw what it can and the rest will be clipped.
    for(let i=0; i<256; i++) {
        // display.write will simply chain work onto the queue.
        // Don't have to await each step as this is done below with final
        // display.wait.
        display.write((i == '\n') ? " " : i);
    }

    await display.display();
};


const drawStylesWorker = async (display, loop_delay = 1) => {

    // Display supports chaining and operations are added to a queue.
    // Therefore, one can do multiple operations as needed using 'dot' chaining.
    // At the end of one's work, one can simply await the display to complete all operations.

    display.setTextSize(1)                  // Normal 1:1 pixel scale
           .setTextColor(SSD1306_WHITE)     // Draw white text
           .setCursor(0,0)                  // Start at top-left corner
           .println("Hello, world!");

    display.setTextColor(SSD1306_BLACK, SSD1306_WHITE) // Draw 'inverse' text
           // TODO support numeric format in println
           .println(3.141592);

    display.setTextSize(2)             // Draw 2X-scale text
           .setTextColor(SSD1306_WHITE)
           .print("0x")
           .println(0xDEADBEEF.toString(16).padStart(8,"0").toUpperCase())
           // TODO support hex format in println
           //display.print(F("0x")); display.println(0xDEADBEEF, HEX);
           .display();

    // Wait for display to complete all work.
    await display;
};


const scrollTextWorker = async (display, loop_delay = 1) => {

    await display.setTextSize(2) // Draw 2X-scale text
                 .setTextColor(SSD1306_WHITE)
                 .setCursor(10, 0)
                 //.println(F("scroll"));
                 .println("scroll")
                 .display();      // Show initial text

    await delay(100);

    // Scroll in various directions, pausing in-between:
    await display.startscrollright(0x00, 0x0F);
    await delay(2000);
    await display.stopscroll();
    await delay(1000);
    await display.startscrollleft(0x00, 0x0F);
    await delay(2000);
    await display.stopscroll();
    await delay(1000);
    await display.startscrolldiagright(0x00, 0x07);
    await delay(2000);
    await display.startscrolldiagleft(0x00, 0x07);
    await delay(2000);
    await display.stopscroll();
    await delay(1000);
};

const LOGO_HEIGHT  = 16;
const LOGO_WIDTH   = 16;

const LOGO_BMP = [
  0b00000000, 0b11000000,
  0b00000001, 0b11000000,
  0b00000001, 0b11000000,
  0b00000011, 0b11100000,
  0b11110011, 0b11100000,
  0b11111110, 0b11111000,
  0b01111110, 0b11111111,
  0b00110011, 0b10011111,
  0b00011111, 0b11111100,
  0b00001101, 0b01110000,
  0b00011011, 0b10100000,
  0b00111111, 0b11100000,
  0b00111111, 0b11110000,
  0b01111100, 0b11110000,
  0b01110000, 0b01110000,
  0b00000000, 0b00110000
];


const drawBitmapWorker = async (display, loop_delay = 1) => {
    const w = display.width(), h = display.height();
    //display.drawBitmap(
    await display.draw1BitBitmap((w  - LOGO_WIDTH ) / 2,
                                 (h - LOGO_HEIGHT) / 2,
                                 LOGO_BMP,
                                 LOGO_WIDTH,
                                 LOGO_HEIGHT, SSD1306_WHITE)
                 .display();
    await delay(1000);
};


async function testAnimate(display, bitmap, bitmapWidth, bitmapHeight, animateTimeMs = 30000) {
    const NUMFLAKES=10,
          // Indexes into the 'icons' array
          XPOS   = 0,
          YPOS   = 1,
          DELTAY = 2;

    const w = display.width(), h = display.height();


    let f, icons = [];

    // Initialize 'snowflake' positions
    for(f=0; f< NUMFLAKES; f++) {
        const icon = [];
        // Create a random integer between 1 - LOGO_WIDTH and w.
        icon[XPOS]   = randomInteger(1 - LOGO_WIDTH, w);
        icon[YPOS]   = -LOGO_HEIGHT;
        // Create a random between 1 and 6.
        icon[DELTAY] = randomInteger(1, 6);
        //console.log(" x:%o", icon[XPOS]);
        //console.log(" y:%o", icon[YPOS]);
        //console.log("dy:%o", icon[DELTAY]);
        icons.push(icon);
    }
    const startTimeMs = new Date().valueOf();

    while ((new Date().valueOf() - startTimeMs) <= animateTimeMs) {
        display.clearDisplay(); // Clear the display buffer

        // Draw each snowflake:
        for(f=0; f< NUMFLAKES; f++) {
            //display.drawBitmap(
            display.draw1BitBitmap(icons[f][XPOS], icons[f][YPOS], bitmap, bitmapWidth, bitmapHeight, SSD1306_WHITE);
        }

        await display.display(); // Show the display buffer on the screen
        await delay(200);        // Pause for 2/10 second

        // Then update coordinates of each flake...
        for(f=0; f< NUMFLAKES; f++) {
            icons[f][YPOS] += icons[f][DELTAY];
            // If snowflake is off the bottom of the screen...
            if (icons[f][YPOS] >= h) {
                // Reinitialize to a random position, just off the top
                icons[f][XPOS]   = randomInteger(1 - LOGO_WIDTH, w);
                icons[f][YPOS]   = -LOGO_HEIGHT;
                icons[f][DELTAY] = randomInteger(1, 6);
            }
        }
    }
}

async function workerRunner(display, worker) {
    await display.clearDisplay();
    await worker(display, 35);
    await delay(2000);
}

module.exports = {
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
};