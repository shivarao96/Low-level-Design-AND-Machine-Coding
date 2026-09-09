import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { INITIAL_LIST } from "../constant/file-structure.constant"
import { Modal } from "../components/Modal";
import { AddFolderOrFile } from "../components/AddFolderOrFile";

const FileFolderContext = createContext();

export const useFileFolderContext = () => {
    const context = useContext(FileFolderContext);
    if (!context) {
        throw new Error("useFileFolderContext must be used within a FileFolderContextProvider");
    }
    return context;
}

export const FileFolderContextProvider = ({ children }) => {


    const [showModal, setShowModal] = useState(false);
    const [fileAndFolderList, setFileAndFolderList] = useState(INITIAL_LIST);
    const [parentId, setParentId] = useState(null);

    const addFileOrFolder = useCallback(({ name, type }) => {
        const id = name + ' ' + Date.now();
        setFileAndFolderList((prev) => {
            return {
                ...prev,
                list: {
                    ...prev.list,
                    [id]: {
                        id,
                        label: name,
                        type,
                        parent: parentId
                    }
                }
            }
        })
        setShowModal(false);
    }, [parentId, setFileAndFolderList, setShowModal])

    const triggerShowModal = useCallback(({ parentId }) => {
        setParentId(parentId);
        setShowModal(true);
    }, [setParentId, setShowModal]);

    const triggerHideModal = useCallback(() => {
        setParentId(null);
        setShowModal(false);
    }, [setParentId, setShowModal])

    const contextValue = useMemo(() => {
        return {
            fileAndFolderList,
            triggerShowModal
        }
    }, [fileAndFolderList,triggerShowModal])


    return (
        <FileFolderContext.Provider value={contextValue}>
            {children}
            <Modal show={showModal} onClose={triggerHideModal} title={'Add File/Folder'}>
                <AddFolderOrFile addFileOrFolder={addFileOrFolder} />
            </Modal>
        </FileFolderContext.Provider>
    )
}