/**
 * A collection of code parser functions.
 */
declare const cbcodeparsers: {
    /**
     * Retrieves the classes in a given file.
     * @param file The file to parse for classes.
     */
    getClassesInFile: (file: any) => void;
    /**
     * Retrieves the functions in a given class within a file.
     * @param file The file containing the class.
     * @param className The name of the class to parse for functions.
     */
    getFunctionsinClass: (file: any, className: any) => void;
    /**
     * Generates an Abstract Syntax Tree (AST) for a given file.
     * @param file The file to generate an AST for.
     * @param className The name of the class to focus the AST generation on.
     */
    getAstTreeInFile: (file: any, className: any) => void;
};
export default cbcodeparsers;
