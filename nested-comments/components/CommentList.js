import { useState } from "react";
import { useCommentContext } from "../hooks/CommentContext";
import { CommentArea } from "./CommentArea";

const ALLOWED_DEPTH = 6;

const getComments = (parentId, comments) => {
    return Object.values(comments).filter((comment) => comment.parentId === parentId).sort((a, b) => ((a.createdAt || a.id) - (b.createdAt || b.id)));
}

export const Comments = function ({ parentId = null, showCommentArea = true, level = 0 }) {

    const { comments } = useCommentContext();
    const commentsList = getComments(parentId, comments);

    const reverseOrder = parentId !== null;

    return (
        <div
            className={reverseOrder ? "reverse" : ""}
            style={{
                paddingLeft: `${level * 10}px`
            }}>
            {showCommentArea && level <= ALLOWED_DEPTH && <CommentArea parentId={parentId} />}
            <div>
                {
                    commentsList.map((e) => (
                        <CommentList key={e.id} {...e} level={level} />
                    ))
                }
            </div>
        </div>
    );
}

const CommentList = (props) => {
    const { id, text, liked, disliked, level } = props;
    const { deleteComment, onLike, onDislike } = useCommentContext();
    const [isReplying, setIsReplying] = useState(false);

    const onReply = () => {
        setIsReplying((prev) => {
            return !prev;
        });
    };

    const onLikeClicked = () => {
        onLike({ id, state: liked ? 0 : 1 });
    }

    const onDislikeClicked = () => {
        onDislike({ id, state: disliked ? 0 : 1 });
    }

    const onDelete = () => {
        deleteComment({ id })
    }

    const hideReplyButton = level >= ALLOWED_DEPTH;

    return (
        <>
            <div className="comment">
                <p>{text}</p>
                <div className="comment-action">
                    <span onClick={onLikeClicked}>Like: {liked}</span>
                    <span onClick={onDislikeClicked}>Dislike: {disliked}</span>
                    {!hideReplyButton && (
                        <span onClick={onReply} className={isReplying ? "active" : ""}>
                            {isReplying ? "Cancel Reply" : "Reply"}
                        </span>
                    )}
                    <span onClick={onDelete}>Delete</span>
                </div>
                <Comments parentId={id} showCommentArea={isReplying} level={level + 1} />
            </div>
        </>
    );
}