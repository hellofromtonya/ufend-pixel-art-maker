/**
 * Reviewer Notes:
 *
 * `///` indicates a thought process/strategy taken to help the reviewer.
 */


/// Wrapped it into an IIFE to protect namespacing.
(function(document){
    'use strict';

    /// Cache selectors here to avoid redundant DOM lookups.
    const elements = {
        colorPicker: document.getElementById('colorPicker'),
        gridCanvas: document.getElementById('pixel_canvas'),
        widthInput: document.getElementById('input_width'),
        heightInput: document.getElementById('input_height')
    };

    /**
     * @description Initialize by binding the event handlers.
     *
     * @function
     */
    const init = function() {

        // Build the grid event listener.
        document.getElementById('sizePicker').addEventListener('submit', makeGrid, false);

        // Set the grid's color listener.
        elements.gridCanvas.addEventListener('click', setGridColor);
    };

    /*=================
     * Event Handlers
     *=================/

    /**
     * @description Make Grid Handler.
     *
     * @function
     *
     * @param {object} Event object.
     */
    function makeGrid(event) {
        /// Prevent the form from submitting to a non-existent back-end,
        /// which would cause a web page refresh.
        event.preventDefault();

        /// Broke out into a separate function as it's a different task.
        const gridSize = getGridSize();

        /// Clear the HTML to reset the canvas.
        clearCanvas();

        /// Build up each row.
        for (let row = 0; row < gridSize.numberOfRows; row++) {
            let tr = elements.gridCanvas.insertRow(row);

            // For this row, insert each td.
            for (let col = 0; col < gridSize.numberOfColumns; col++) {
                /// As I'm not inserting anything into the td, we don't need a variable.
                tr.insertCell(col);
            }
        }
    }


    /**
     * @description Set the selected grid's background color.
     *
     * @function
     */
    function setGridColor(event) {
        let color = elements.colorPicker.value;

        event.target.setAttribute('style', 'background-color: ' + color);
    }

    /*=================
     * Helpers
     *=================*/

    /// I like to break out separate tasks
    /// into helper functions. Why?
    /// 1. To make the code more readable and reusable.
    /// 2. Separate out separate tasks for Single Responsibility.


    /**
     * @description Clear the grid canvas' HTML.
     *
     * @function
     */
    function clearCanvas() {
        elements.gridCanvas.innerHTML = '';
    }

    /**
     * @description Gets the selected grid size.
     *
     * @function
     *
     * @returns {object} Returns an object
     */
    function getGridSize() {
        let numberOfRows = elements.heightInput.value;
        let numberOfColumns = elements.widthInput.value;

        return {
            numberOfColumns: parseInt(numberOfColumns),
            numberOfRows: parseInt(numberOfRows)
        }
    }

    init();

}(document));
