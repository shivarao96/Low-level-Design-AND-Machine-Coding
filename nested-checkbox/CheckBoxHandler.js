import { CheckBoxContextProvider } from "./hooks/CheckboxContext"
import {DEFAULT} from "./constants/checkbox-default.constant";
import { NestedCheckBox } from "./components/NestedCheckbox";

export const CheckBoxHandler = () => {
    return <>
        <div className="checkbox-handler">
            <CheckBoxContextProvider checkBoxesSetup={DEFAULT}>
                <div>Hello World</div>
                <NestedCheckBox/>
            </CheckBoxContextProvider>
        </div>
    </>
}