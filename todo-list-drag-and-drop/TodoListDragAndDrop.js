import React, { useState } from "react";

export const TodoListDragAndDrop = () => {
  const [containers, setContainers] = useState({
    todo: [
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
    ],
    "in-progress": [
      { id: "4", content: "Item 4" },
      { id: "5", content: "Item 5" },
    ],
    completed: [],
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);

  const handleDragStart = (e, item, containerId) => {
    const sourceIndex = containers[containerId].findIndex(
      (i) => i.id === item.id
    );
    setDraggedItem({ item, sourceContainer: containerId, sourceIndex });

    // Set drag data
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";

    // Add some styling to the drag image
    const dragElement = e.currentTarget;
    dragElement.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    const dragElement = e.currentTarget;
    dragElement.style.opacity = "1";
    setDraggedItem(null);
    setDropIndicator(null);
  };

  // Handle drag over individual items for sorting
  const handleItemDragOver = (
    e,
    targetContainerId,
    targetItem,
    targetIndex
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    // Calculate if we should insert before or after the target item
    const rect = e.currentTarget.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const mouseY = e.clientY;

    // Determine insertion index
    let insertionIndex;
    if (mouseY < midY) {
      // Insert before the target item
      insertionIndex = targetIndex;
    } else {
      // Insert after the target item
      insertionIndex = targetIndex + 1;
    }

    // If dragging within the same container and the source is before the target,
    // we need to adjust for the removal of the source item
    if (
      draggedItem.sourceContainer === targetContainerId &&
      draggedItem.sourceIndex < insertionIndex
    ) {
      insertionIndex--;
    }

    setDropIndicator({
      containerId: targetContainerId,
      index: insertionIndex,
    });
  };

  // Handle drag over container (for empty containers or appending to end)
  const handleContainerDragOver = (e, containerId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    // Check if we're over an empty area of the container
    const items = containers[containerId];

    // If empty container or dragging below all items, insert at end
    setDropIndicator({
      containerId,
      index: items.length,
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !dropIndicator) return;

    const { item, sourceContainer, sourceIndex } = draggedItem;
    const { containerId: targetContainer, index: targetIndex } = dropIndicator;

    // Don't do anything if dropped in the same position
    if (sourceContainer === targetContainer && sourceIndex === targetIndex) {
      return;
    }

    setContainers((prev) => {
      const newContainers = { ...prev };

      if (sourceContainer === targetContainer) {
        // Reordering within the same container
        const items = [...prev[sourceContainer]];
        const [movedItem] = items.splice(sourceIndex, 1);
        const adjustedTargetIndex =
          sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
        items.splice(adjustedTargetIndex, 0, movedItem);
        newContainers[sourceContainer] = items;
      } else {
        // Moving between different containers
        // Remove from source
        newContainers[sourceContainer] = prev[sourceContainer].filter(
          (i) => i.id !== item.id
        );

        // Add to target
        const targetItems = [...prev[targetContainer]];
        targetItems.splice(targetIndex, 0, item);
        newContainers[targetContainer] = targetItems;
      }

      return newContainers;
    });

    setDraggedItem(null);
    setDropIndicator(null);
  };

  // Add a new item to the Todo list
  const handleCreate = (e) => {
    if (e.key === "Enter") {
      const content = e.target.value;
      setContainers((prev) => {
        return {
          ...prev,
          todo: [...prev.todo, { id: Date.now(), content }],
        };
      });
      e.target.value = "";
    }
  };

  // Remove an new item
  const handleDelete = (e, containerId, itemId) => {
    setContainers((prev) => {
      return {
        ...prev,
        [containerId]: prev[containerId].filter((i) => i.id !== itemId),
      };
    });
  };

  // Helper function to render drop indicator
  const renderDropIndicator = (containerId, index) => {
    if (
      !dropIndicator ||
      dropIndicator.containerId !== containerId ||
      dropIndicator.index !== index
    ) {
      return null;
    }

    return (
      <div
        style={{
          height: "2px",
          backgroundColor: "#007bff",
          margin: "2px 0",
          borderRadius: "1px",
          transition: "all 0.2s ease",
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        maxWidth: "700px",
        margin: "50px auto 0 auto",
      }}
    >
      <div>
        <input
          type="text"
          onKeyDown={handleCreate}
          style={{ padding: "10px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {Object.entries(containers).map(([containerId, items]) => (
          <div
            key={containerId}
            style={{
              minHeight: "200px",
              width: "200px",
              border: "2px dashed #ccc",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor:
                dropIndicator?.containerId === containerId
                  ? "#f0f8ff"
                  : "white",
              transition: "background-color 0.2s ease",
            }}
            onDragOver={(e) => handleContainerDragOver(e, containerId)}
            onDrop={(e) => handleDrop(e, containerId)}
          >
            <h3 style={{ textTransform: "capitalize" }}>{containerId}</h3>

            {/* Drop indicator at the beginning */}
            {renderDropIndicator(containerId, 0)}

            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <div
                  draggable
                  style={{
                    padding: "8px",
                    margin: "4px 0",
                    backgroundColor:
                      draggedItem?.item.id === item.id ? "#e3f2fd" : "#f9f9f9",
                    border: "1px solid #ddd",
                    borderRadius: "4px",

                    opacity: draggedItem?.item.id === item.id ? 0.5 : 1,
                    transition: "all 0.2s ease",
                    transform:
                      draggedItem?.item.id === item.id
                        ? "rotate(5deg)"
                        : "none",
                  }}
                  onDragStart={(e) => handleDragStart(e, item, containerId)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) =>
                    handleItemDragOver(e, containerId, item, index)
                  }
                  onDrop={(e) => handleDrop(e, containerId)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "move",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        ⋮⋮
                      </span>
                      {item.content}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => handleDelete(e, containerId, item.id)}
                    >
                      X
                    </div>
                  </div>
                </div>

                {/* Drop indicator after each item */}
                {renderDropIndicator(containerId, index + 1)}
              </React.Fragment>
            ))}

            {/* If container is empty, show a drop zone */}
            {items.length === 0 && (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#999",
                  fontStyle: "italic",
                  border:
                    dropIndicator?.containerId === containerId
                      ? "2px dashed #007bff"
                      : "none",
                  borderRadius: "4px",
                }}
              >
                Drop items here
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};