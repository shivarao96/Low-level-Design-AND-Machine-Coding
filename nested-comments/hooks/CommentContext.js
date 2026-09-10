import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CommentContext = createContext();

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("CommentContext error !!!");
    }
    return context;
}


const mockVoteApi = (id, type, state) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            Math.random() > 0.5 ? res() : rej(new Error(`API error: failed to update ${type} for comment ${id}`))
        }, 600);
    })
}

export const CommentContextProvider = ({ children }) => {

    const [comments, setComments] = useState({});

    const addNewComment = useCallback(({ text, parentId }) => {
        const id = Date.now();
        setComments((prev) => {
            return {
                ...prev,
                [id]: {
                    id,
                    text,
                    liked: 0,
                    disliked: 0,
                    createdAt: Date.now(),
                    parentId
                }
            }
        })
    }, []);

    const deleteComment = useCallback(({ id }) => {
        setComments((prev) => {
            const newComments = { ...prev };

            const deleteRecursively = (id) => {
                Object.values(newComments)
                    .filter((c) => c.parentId === id)
                    .forEach((child) => deleteRecursively(child.id))

                delete newComments[id];
            }

            deleteRecursively(id);

            return newComments;
        })
    }, []);


    const onLike = useCallback(({ id, state }) => {

        setComments((prev) => {
            return {
                ...prev,
                [id]: {
                    ...prev[id],
                    liked: state
                }
            }
        });

        mockVoteApi(id, 'like', state).catch(() => {
            setComments((prev) => {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        liked: state ? 0 : 1
                    }
                }
            });
        })
    }, []);

    const onDislike = useCallback(({ id, state }) => {
        setComments((prev) => {
            return {
                ...prev,
                [id]: {
                    ...prev[id],
                    disliked: state
                }
            }
        });


        mockVoteApi(id, 'dislike', state).catch(() => {
            setComments((prev) => {
                return {
                    ...prev,
                    [id]: {
                        ...prev[id],
                        disliked: state ? 0 : 1
                    }
                }
            });
        })
    }, []);

    const contextValue = useMemo(() => {
        return {
            comments,
            addNewComment,
            deleteComment,
            onLike,
            onDislike
        }
    }, [comments, addNewComment,
        deleteComment,
        onLike,
        onDislike])


    return (
        <CommentContext.Provider value={contextValue}>
            {children}
        </CommentContext.Provider>
    )
}