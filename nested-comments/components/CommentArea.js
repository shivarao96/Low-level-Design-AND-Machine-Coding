import { useState } from "react"
import {useCommentContext} from "../hooks/CommentContext.js"

export const CommentArea = ({parentId=null}) => {
    
    const {addNewComment} = useCommentContext();
    const [text, setText] = useState("");

    const onChangeHandler = (e) => {
        const {value} = e.target;
        setText(value);
    }

    const onKeyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addNewComment({parentId, text});
            setText("");
        }
    }
    
    return (
        <>
            <textarea
                className="comment-text-area"
                value={text}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                placeholder="share your thoughts..."
            />
        </>
    )
}