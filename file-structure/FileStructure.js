import { useState } from "react";

const list = [
  { id: 1, name: "Parent 1", parentId: null },
  { id: 2, name: "Child 1.1", parentId: 1 },
  { id: 3, name: "Child 1.2", parentId: 1 },
  { id: 4, name: "Parent 2", parentId: null },
  { id: 5, name: "Child 2.1", parentId: 4 },
  { id: 6, name: "Child 2.2", parentId: 4 },
  { id: 7, name: "Child 1.1.1", parentId: 2 },
  { id: 8, name: "Child 1.2.1", parentId: 3 },
];

const getChildren = (parent, originalList) => {
    const items = originalList.filter((e) => {
    return e.parentId === parent;
  });

  return items;
}

const List = ({originalList, parentId = null, level = 0 }) => {

    const [open, setOpen] = useState(false);
    const children = getChildren(parentId, originalList);

    const currentItem = originalList.find( (item) => item.id === parentId );

    return (
        <>
            {parentId !== null ? (
                <div style={{ paddingLeft: `${level * 10}px` }}>
                    <span> 
                        {currentItem?.name}
                        {children.length ? <> - <button type="button" onClick={(e) => setOpen(!open)}>{open ? 'Close' : 'open'}</button></> : <></>}
                    </span>
                    {
                        open ? children.map((child, i) => {
                            return (
                                <List key={child.id} parentId={child.id} level={level + 1} originalList={originalList} />
                            )
                        }) : <></>
                    }
                </div>
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

    return (
        <>
            <List originalList={list} />
        </>
    );
}