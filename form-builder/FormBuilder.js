import {FormProvider} from "./providers/FormBuilderContext"
import {FormLeftPanel} from "./components/FormLeftPanel";
import {FormRightPanel} from "./components/FromRightPanel";
import "./styles.css"

export const FormBuilder = () => {
    return (
        <div className="flex">
            <FormProvider>
                <FormLeftPanel/>
                <FormRightPanel/>
            </FormProvider>
        </div>
    )
}