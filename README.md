# Simple HTML Calculator

## Description

This project is a calculator application built using HTML for the structure, CSS for styling, and JavaScript for handling the logic and operations. It provides a user-friendly interface for performing basic arithmetic calculations.

## How to Use

1.  **Get the Files:**
    *   Clone this repository to your local machine or download the files as a ZIP archive.

2.  **Open in Browser:**
    *   Navigate to the directory where you saved the files.
    *   Open the `index.html` file in any modern web browser (such as Google Chrome, Mozilla Firefox, Safari, or Microsoft Edge).

3.  **Using the Calculator:**
    *   Click the number buttons (0-9) to input your numbers.
    *   Click the operator buttons (+, -, \*, /) to choose an arithmetic operation.
    *   Use the '.' button if you need to input decimal numbers.
    *   Click the '=' button to see the result of your calculation.
    *   Click the 'C' (Clear) button to reset the calculator display and any ongoing calculation.

*(Note: A live version may be available via GitHub Pages in the future. If deployed, the link will be provided here.)*

## Features

*   **Core Arithmetic Operations:**
    *   Addition (+)
    *   Subtraction (-)
    *   Multiplication (*)
    *   Division (/)
*   **Decimal Input:** Allows for calculations involving numbers with decimal points.
*   **Clear Functionality:** The 'C' button clears the current display, resets any stored operands and operators, effectively starting fresh.
*   **Error Handling:** Displays an "Error" message in case of invalid operations, specifically for division by zero.
*   **Chained Operations:** The calculator supports using the result of a previous calculation as the first operand in a subsequent operation (e.g., after `2 + 3 = 5`, pressing `+` then `2 =` will result in `7`).
*   **Responsive Design:** The layout adjusts for basic usability on different screen sizes, making it accessible on desktops, tablets, and mobile phones.
*   **Visual Feedback:** Buttons provide visual cues on hover and when clicked (active state).

## Project Files

*   `index.html`: Contains the HTML structure of the calculator.
*   `style.css`: Includes all CSS rules for the visual presentation and layout.
*   `script.js`: Houses the JavaScript code that powers the calculator's functionality.
