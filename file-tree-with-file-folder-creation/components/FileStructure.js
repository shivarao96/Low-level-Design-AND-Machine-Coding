import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaFile } from "react-icons/fa";
import { useFileFolderContext } from "../hooks/FileFolderContext";

const getChildren = (id, list) => {
    const items = Object.keys(list).filter((e) => {
        return list[e].parent === id;
    });

    return items.map((e) => list[e]);
};

const List = ({ originalList, parentId = null, level = 0 }) => {

    const { triggerShowModal } = useFileFolderContext();
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(originalList[parentId]);
    const children = getChildren(parentId, originalList);
    const openIndicator = open ? <FaChevronDown /> : <FaChevronRight />;
    const renderIcon = currentItem?.type === "folder" ? openIndicator : <FaFile />;

    const handleClick = () => {
        if (currentItem?.type === "file") return;
        setOpen((prev) => !prev);
    };


    return (
        <>
            {parentId !== null ? (
                <>
                    <div
                        className="list"
                        style={{ paddingLeft: `${level * 10}px` }}>
                        <span onClick={handleClick} className="icon">
                            {renderIcon} {currentItem?.label}{" "}
                        </span>
                        {currentItem?.type === "folder" && (
                            <span
                                className="icon"
                                onClick={() => triggerShowModal({ parentId: currentItem?.id })}
                            >
                                +
                            </span>
                        )}
                    </div>
                    {
                        open ? children.map((child, i) => {
                            return (
                                <List key={child.id} parentId={child.id} level={level + 1} originalList={originalList} />
                            )
                        }) : <></>
                    }
                </>
            ) : (<>
                {
                    children.map((child, i) => {
                        return (
                            <>
                                <List key={child.id} parentId={child.id} level={level + 1} originalList={originalList} />
                            </>
                        )
                    })
                }
            </>)}
        </>
    )
}

export const ListViewer = () => {

    const { fileAndFolderList } = useFileFolderContext();
    const { list } = fileAndFolderList;

    return (
        <>
            <List originalList={list} />
        </>
    );
}