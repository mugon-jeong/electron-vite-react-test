type FileType = "file" | "folder";
type FileTreeType = {
  name: string;
  type: FileType;
  children?: FileTreeType[];
};
