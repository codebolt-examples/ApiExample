/**
 * A module for managing files within the CodeBolt File System.
 */
declare const cbrag: {
    /**
     * Initializes the CodeBolt File System Module.
     */
    init: () => void;
    /**
     * Adds a file to the CodeBolt File System.
     * @param {string} filename - The name of the file to add.
     * @param {string} file_path - The path where the file should be added.
     */
    add_file: (filename: string, file_path: string) => void;
    /**
     * Retrieves related knowledge for a given query and filename.
     * @param {string} query - The query to retrieve related knowledge for.
     * @param {string} filename - The name of the file associated with the query.
     */
    retrieve_related_knowledge: (query: string, filename: string) => void;
};
export default cbrag;
