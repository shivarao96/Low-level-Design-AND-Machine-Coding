export const INITIAL_LIST = {
  list: {
    folder1: {
      parent: null,
      type: "folder",
      label: "Folder 1",
      id: "folder1",
    },
    folder2: {
      parent: "folder1",
      type: "folder",
      label: "Folder 2",
      id: "folder2",
    },
    file1: {
      parent: "folder1",
      type: "file",
      label: "File 1",
      id: "file1",
    },
    folder3: {
      parent: "folder1",
      type: "folder",
      label: "Folder 3",
      id: "folder3",
    },
    file2: {
      parent: "folder1",
      type: "file",
      label: "File 2",
      id: "file2",
    },
    file3: {
      parent: "folder3",
      type: "file",
      label: "File 3",
      id: "file3",
    },
    file4: {
      parent: "folder2",
      type: "file",
      label: "File 4",
      id: "file4",
    },
  },
  open: [],
};