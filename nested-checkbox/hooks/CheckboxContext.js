import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CheckBoxContext = createContext();

export const CheckBoxContextProvider = ({ children, checkBoxesSetup }) => {

    const [checkBoxes, setCheckBoxes] = useState(checkBoxesSetup);

    const getChildren = useCallback((parentId) => {
        return Object.keys(checkBoxes).filter(e => checkBoxes[e].parentId === parentId);
    }, [checkBoxes])

    const getSiblings = useCallback((siblingId) => {
        const { parentId } = checkBoxes[siblingId];
        return Object.keys(checkBoxes).filter(e => checkBoxes[e].parentId === parentId);
    }, [checkBoxes]);

    const updateCheck = useCallback((e, checked) => {
        setCheckBoxes((prev) => {
            const next = { ...prev };

            const setChecked = (nodeId, value) => {
                const node = next[nodeId];
                if (!node) return;
                next[nodeId] = { ...node, checked: value };
            };

            const isChecked = (nodeId) => {
                if (nodeId === e) return checked;
                return Boolean(next[nodeId]?.checked);
            };

            const bottomUp = (siblingId, value) => {
                setChecked(siblingId, value);
                const { parentId } = next[siblingId] ?? {}
                if (!parentId) return;
                
                const allSiblings = getSiblings(siblingId);
                const allSiblingsChecked = allSiblings.every((id) => isChecked(id));
                bottomUp(parentId, allSiblingsChecked);
            }

            bottomUp(e, checked);

            const topDown = (parentId, value) => {
                setChecked(parentId, value);
                const allChildren = getChildren(parentId);
                allChildren.forEach(child => {
                    topDown(child, value);
                });
            }

            topDown(e, checked);

            return next;
        })
    }, [setCheckBoxes, getSiblings, getChildren])



    const values = useMemo(() => {
        return {
            checkBoxes,
            getChildren,
            getSiblings,
            updateCheck
        }
    }, [checkBoxes, getChildren, getSiblings, updateCheck]);

    return <>
        <CheckBoxContext.Provider value={values}>
            {children}
        </CheckBoxContext.Provider>
    </>
}

export const useCheckBoxContext = () => {
    const context = useContext(CheckBoxContext);
    if (!context) {
        throw new Error("useCheckboxContext can only be used in CheckboxProvider")
    }
    return context;
}