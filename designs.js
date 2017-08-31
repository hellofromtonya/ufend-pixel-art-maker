/**
 * Reviewer Notes:
 *
 * `///` indicates a thought process/strategy taken to help the reviewer.
 */



/// Wrapped it into an IIFE to protect namespacing.

/// Assigning the jQuery object to `$` variable.
(function($){
    'use strict';

    /// Cache selectors here to avoid redundant DOM lookups.
    const elements = {
        colorPicker: $('#colorPicker'),
        gridCanvas: $('#pixel_canvas'),
        widthInput: $('#input_width'),
        heightInput: $('#input_height')
    };

    /**
     * @description Initialize by binding the event handlers.
     *
     * @function
     */
    const init = function() {

        // Build the grid event listener.
        $('#sizePicker').on('submit', makeGrid);

        // Set the grid's color listener.
        elements.gridCanvas.on('click', 'td', setGridColor);
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

        const gridSize = getGridSize();

        clearCanvas();

        /// Builds up each row's HTML into a string and then appends it into the canvas.
        for (let row = 0; row < gridSize.numberOfRows; row++) {
            let rowHTML = '<tr>';

            // For this row, build the columns HTML.
            for (let col = 0; col < gridSize.numberOfColumns; col++) {
                rowHTML += '<td></td>';
            }

            rowHTML += '</td>';

            // Append it to the canvas.
            elements.gridCanvas.append(rowHTML);
        }

    }


    /**
     * @description Set the selected grid's background color.
     *
     * @function
     */
    function setGridColor() {
        $(this).css('background-color', getColor());
    }

    /*=================
     * Helpers
     *=================*/

    /// I like to break out separate tasks
    /// into helper functions. Why?
    /// 1. To make the code more readable and reusable.
    /// 2. Separate out separate tasks for Single Responsibility.


    /**
     * @description Gets the selected color.
     *
     * @function
     *
     * @returns {string} Returns the hex color
     */
    function getColor() {
        return elements.colorPicker.val();
    }


    /**
     * @description Clear the grid canvas' HTML.
     *
     * @function
     */
    function clearCanvas() {
        elements.gridCanvas.empty();
    }

    /**
     * @description Gets the selected grid size.
     *
     * @function
     *
     * @returns {object} Returns an object
     */
    function getGridSize() {
        let numberOfRows = elements.heightInput.val();
        let numberOfColumns = elements.widthInput.val();

        return {
            numberOfColumns: parseInt(numberOfColumns),
            numberOfRows: parseInt(numberOfRows)
        }
    }

    /// No need for document ready, as the script is loaded
    /// into the footer of the web page.
    init();

/// Assigning the jQuery object to `$` variable.
}(jQuery));
