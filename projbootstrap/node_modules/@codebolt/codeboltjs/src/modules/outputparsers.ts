/**
 * A module for parsing output messages to identify errors and warnings.
 */
const cboutputparsers = {
    /**
     * Initializes the output parser module.
     * Currently, this function does not perform any operations.
     * @param {any} output - The output to be initialized.
     */
    init: (output: any) => {
        // Initialization code can be added here if necessary
    },
    /**
     * Parses the given output and returns all the error messages.
     * @param {any} output - The output to parse for error messages.
     * @returns {string[]} An array of error messages.
     */
    parseErrors: (output: any): string[] => {
        return output.split('\n').filter((line: string) => line.includes('Error:'));
    },
    /**
     * Parses the given output and returns all the warning messages.
     * @param {any} output - The output to parse for warning messages.
     * @returns {string[]} An array of warning messages.
     */
    parseWarnings: (output: any): string[] => {
        return output.split('\n').filter((line: string) => line.includes('Warning:'));
    }
};
export default cboutputparsers;