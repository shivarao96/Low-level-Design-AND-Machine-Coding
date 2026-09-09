import { useCheckBoxContext } from "../hooks/CheckboxContext"
import { Checkbox } from "./Checkbox";

export const NestedCheckBox = ({ parentId = null, level = 0 }) => {

    const {
        checkBoxes,
        getChildren,
        getSiblings,
        updateCheck
    } = useCheckBoxContext();

    const childrenCheckboxes = getChildren(parentId);
    if(childrenCheckboxes.length === 0) return null;

    return <>
        <div style={{paddingLeft: `${level * 20}px`}}>
            {
                childrenCheckboxes.map((e) => {
                    return (
                        <>
                            <Checkbox 
                                key={e} 
                                {...checkBoxes[e]}
                                onChange={(state) => {
                                    updateCheck(e, state)
                                }}
                            />
                            <NestedCheckBox parentId={e} level={level + 1}/>
                        </>
                    )
                })
            }
        </div>
    </>
}