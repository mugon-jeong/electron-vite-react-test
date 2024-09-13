import { File, Folder } from "lucide-react";
import React from "react";

type FileTreeItemProps = {
  item: FileTreeType;
  onFileClick: (fileName: string) => void;
  depth?: number;
};

export default function FileTreeItem({
  item,
  onFileClick,
  depth = 0,
}: FileTreeItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleFolder = () => setIsOpen(!isOpen);

  const handleClick = () => {
    if (item.type === "folder") {
      toggleFolder();
    } else {
      onFileClick(item.name);
    }
  };
  return (
    <div>
      <div
        className={`flex items-center py-1 px-2 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
          depth > 0 ? "ml-4" : ""
        }`}
        onClick={handleClick}
      >
        {item.type === "folder" ? (
          <Folder className="mr-2 h-4 w-4" />
        ) : (
          <File className="mr-2 h-4 w-4" />
        )}
        <span className="text-sm">{item.name}</span>
      </div>
      {item.type === "folder" && isOpen && (
        <div>
          {item.children.map((child) => (
            <FileTreeItem
              key={child.name}
              item={child}
              onFileClick={onFileClick}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
