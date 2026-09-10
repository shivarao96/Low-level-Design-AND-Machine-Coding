import {CommentContextProvider} from "./hooks/CommentContext";
import {Comments} from "./components/CommentList";
import "./NestedComments.css"

export const NestedComments = () => {
    return (
        <>
            <CommentContextProvider>
                <Comments parentId={null} />
            </CommentContextProvider>
        </>
    );
}