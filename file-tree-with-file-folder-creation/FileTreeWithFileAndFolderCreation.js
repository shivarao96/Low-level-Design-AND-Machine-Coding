import { FileFolderContextProvider } from "./hooks/FileFolderContext";
import { ListViewer } from "./components/FileStructure";

export const FileTreeWithFileAndFolderCreation = () => {
    return (
        <>
            <FileFolderContextProvider>
                <ListViewer />
            </FileFolderContextProvider>
        </>
    );
}