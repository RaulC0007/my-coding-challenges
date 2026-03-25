// @ts-check

/**
 * Implement the classes etc. that are needed to solve the
 * exercise in this file. Do not forget to export the entities
 * you defined so they are available for the tests.
 */

// --- Task 1: Define Size (Prototype Syntax) ---
/**
 * Defines a Size for storing the dimensions of the window.
 * @param {number} [width=80] The initial width of the window.
 * @param {number} [height=60] The initial height of the window.
 */
export function Size(width = 80, height = 60) {
  this.width = width;
  this.height = height;
}

/**
 * Resizes the Size object to new dimensions.
 * @param {number} newWidth The new width.
 * @param {number} newHeight The new height.
 */
Size.prototype.resize = function(newWidth, newHeight) {
  this.width = newWidth;
  this.height = newHeight;
};


// --- Task 2: Define Position (Prototype Syntax) ---
/**
 * Defines a Position for storing a window's upper-left corner coordinates.
 * @param {number} [x=0] The initial horizontal position.
 * @param {number} [y=0] The initial vertical position.
 */
export function Position(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

/**
 * Moves the Position object to new coordinates.
 * @param {number} newX The new horizontal position.
 * @param {number} newY The new vertical position.
 */
Position.prototype.move = function(newX, newY) {
  this.x = newX;
  this.y = newY;
};


// --- Task 3, 4, 5: Define ProgramWindow (Class Syntax) ---
export class ProgramWindow {
  constructor() {
    // screenSize is fixed at 800x600.
    this.screenSize = new Size(800, 600);
    // Initial size is the default Size (80x60).
    this.size = new Size();
    // Initial position is the default Position (0,0).
    this.position = new Position();
  }

  /**
   * Resizes the window to the specified new size, respecting screen bounds and minimums.
   * @param {Size} newSize The desired new size.
   */
  resize(newSize) {
    // 1. Clip newWidth/newHeight to a minimum of 1.
    let clippedWidth = Math.max(1, newSize.width);
    let clippedHeight = Math.max(1, newSize.height);

    // 2. Calculate maximum allowed width/height based on position and screen size.
    // The right edge cannot exceed screen width: position.x + width <= screenSize.width
    // So, max width = screenSize.width - position.x
    const maxWidth = this.screenSize.width - this.position.x;
    // The bottom edge cannot exceed screen height: position.y + height <= screenSize.height
    // So, max height = screenSize.height - position.y
    const maxHeight = this.screenSize.height - this.position.y;

    // 3. Clip newWidth/newHeight to these calculated maximums.
    clippedWidth = Math.min(clippedWidth, maxWidth);
    clippedHeight = Math.min(clippedHeight, maxHeight);

    // Update the window's size using the Size object's own resize method.
    this.size.resize(clippedWidth, clippedHeight);
  }

  /**
   * Moves the window to the specified new position, respecting screen bounds.
   * @param {Position} newPosition The desired new position.
   */
  move(newPosition) {
    // 1. Clip newX/newY to a minimum of 0.
    let clippedX = Math.max(0, newPosition.x);
    let clippedY = Math.max(0, newPosition.y);

    // 2. Calculate maximum allowed X/Y based on window size and screen size.
    // The right edge of the window cannot exceed screen width: x + size.width <= screenSize.width
    // So, max x = screenSize.width - size.width
    const maxX = this.screenSize.width - this.size.width;
    // The bottom edge of the window cannot exceed screen height: y + size.height <= screenSize.height
    // So, max y = screenSize.height - size.height
    const maxY = this.screenSize.height - this.size.height;

    // 3. Clip newX/newY to these calculated maximums.
    clippedX = Math.min(clippedX, maxX);
    clippedY = Math.min(clippedY, maxY);

    // Update the window's position using the Position object's own move method.
    this.position.move(clippedX, clippedY);
  }
}


// --- Task 6: Implement changeWindow function ---
/**
 * Changes a ProgramWindow instance to a specified size and position.
 * @param {ProgramWindow} programWindow The ProgramWindow instance to modify.
 * @returns {ProgramWindow} The modified ProgramWindow instance.
 */
export function changeWindow(programWindow) {
  // Define the target size and position.
  const newSize = new Size(400, 300);
  const newPosition = new Position(100, 150);

  // Apply the new size and position using the window's methods.
  programWindow.resize(newSize);
  programWindow.move(newPosition);

  // Return the modified window instance.
  return programWindow;
}