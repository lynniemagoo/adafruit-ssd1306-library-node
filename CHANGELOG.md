# Changelog

## v1.1.1 2023-08-31
- Fixed critical issue where display not initialized correctly following refactor to use Adafruit_GrayOLED base class.
- Based on a forum post describing how to get vertical scroll only by using startscrolldiagleft() or 
  startscrolldiagright() passing the same value for startPage and endPage, add single direction
  vertical scrolling example into ssd1306_common.js.

## v1.1.0 2023-08-02

- Refactored to use base class of Adafruit_GrayOLED so that we can optimize data writes.
  For example, setting only 1 pixel on the screen will only require writing 1 byte of data whereas
  without these changes, we would write the whole buffer (either 512 bytes or 1024 bytes).

## v1.0.4 2023-06-04 Unpublished
- Provide ability to override colStart, pageStart, display offset and display start line using options.


## v1.0.3 2023-06-02
- Bugfix for drawing horizontal lines with INVERSE color.  Fix examples to handle all rotations.

## v1.0.0 2022-09-13

- First official release
