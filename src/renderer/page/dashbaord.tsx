import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import { Button } from "../components/ui/button";
import { ChevronDown, Settings, Terminal } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FileTreeItem from "../components/tree/file-tree-item";
import { Label } from "../components/ui/label";
import JsEditor from "../components/editor/js-editor";
import { Input } from "@/renderer/components/ui/input";

export default function DashbaordPage() {
  const [files, setFiles] = React.useState<FileTreeType[]>([
    { name: "index.html", type: "file" },
    {
      name: "styles",
      type: "folder",
      children: [{ name: "main.css", type: "file" }],
    },
    { name: "script.js", type: "file" },
  ]);

  const [activeFile, setActiveFile] = React.useState("index.html");
  const [terminalOutput, setTerminalOutput] =
    React.useState("Welcome to VS Code");

  const handleFileClick = (fileName: string) => {
    setActiveFile(fileName);
    setTerminalOutput(`Opened ${fileName}`);
  };
  return (
    <div className="h-screen w-full overflow-hidden">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-screen bg-background text-foreground"
      >
        {/* Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <div className="flex h-full flex-col border-r">
            <div className="flex items-center justify-between p-2">
              <h2 className="text-sm font-semibold">EXPLORER</h2>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2">
                {files.map((item) => (
                  <FileTreeItem
                    key={item.name}
                    item={item}
                    onFileClick={handleFileClick}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Main content */}
        <ResizablePanel defaultSize={60}>
          <div className="flex flex-col h-full">
            {/* Tabs */}
            <div className="flex items-center border-b">
              <Button variant="ghost" className="px-4 py-2 text-sm">
                {activeFile} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Editor */}
            <JsEditor />
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right panel */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <ResizablePanelGroup direction="vertical">
            {/* Form section */}
            <ResizablePanel defaultSize={50}>
              <ScrollArea className="h-full p-4">
                <form className="space-y-4">
                  <h2 className="text-lg font-semibold">Configuration</h2>
                  {[
                    "Project Name",
                    "Version",
                    "Author",
                    "License",
                    "Description",
                  ].map((label) => (
                    <div key={label} className="space-y-2">
                      <Label htmlFor={label.toLowerCase().replace(" ", "-")}>
                        {label}
                      </Label>
                      <Input
                        id={label.toLowerCase().replace(" ", "-")}
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </form>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle />

            {/* Terminal section */}
            <ResizablePanel defaultSize={50}>
              <div className="flex flex-col h-full border-t">
                <div className="flex items-center justify-between bg-muted p-2">
                  <div className="flex items-center">
                    <Terminal className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Terminal</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="flex-1 bg-background p-2">
                  <pre className="text-sm text-muted-foreground">
                    {terminalOutput}
                  </pre>
                </ScrollArea>
                <div className="flex items-center border-t p-2">
                  <span className="mr-2 text-sm text-muted-foreground">$</span>
                  <Input
                    className="flex-1 text-sm"
                    placeholder="Type your command here..."
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
