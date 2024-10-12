import React, { useState, useRef, useEffect } from 'react';
import { FolderPlus, FileText, RefreshCw, ChevronLeft, ChevronRight, Settings, User, ChevronDown } from 'lucide-react';

interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

const initialTreeData: TreeNode[] = [
  {
    label: "王小明",
    value: "root",
    children: [
      {
        label: "Folder 1",
        value: "folder1",
        children: [
          { label: "File 1.1", value: "file1.1" },
          { label: "File 1.2", value: "file1.2" },
          {
            label: "Subfolder 1.1",
            value: "subfolder1.1",
            children: [
              { label: "File 1.1.1", value: "file1.1.1" },
              { label: "File 1.1.2", value: "file1.1.2" },
              {
                label: "Subfolder 1.1.1",
                value: "subfolder1.1.1",
                children: [
                  { label: "Deep File 1", value: "deepfile1" },
                  { label: "Deep File 2", value: "deepfile2" },
                ]
              }
            ]
          }
        ]
      },
      {
        label: "Folder 2",
        value: "folder2",
        children: [
          { label: "File 2.1", value: "file2.1" },
          {
            label: "Subfolder 2.1",
            value: "subfolder2.1",
            children: [
              { label: "File 2.1.1", value: "file2.1.1" },
              { label: "File 2.1.2", value: "file2.1.2" },
            ]
          },
        ]
      },
      {
        label: "Folder 3",
        value: "folder3",
        children: [
          { label: "File 3.1", value: "file3.1" },
          { label: "File 3.2", value: "file3.2" },
          {
            label: "Subfolder 3.1",
            value: "subfolder3.1",
            children: [
              { label: "File 3.1.1", value: "file3.1.1" },
              { label: "File 3.1.2", value: "file3.1.2" },
              {
                label: "Subfolder 3.1.1",
                value: "subfolder3.1.1",
                children: [
                  { label: "Deep File 3.1", value: "deepfile3.1" },
                  { label: "Deep File 3.2", value: "deepfile3.2" },
                ]
              }
            ]
          }
        ]
      },
    ]
  }
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const treeRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const toggleNode = (value: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const collapseAllNodes = () => {
    setExpandedNodes(new Set());
  };

  useEffect(() => {
    if (treeRef.current) {
      treeRef.current.scrollLeft = treeRef.current.scrollWidth;
    }
  }, [expandedNodes]);

  const renderTree = (nodes: TreeNode[], level = 0) => {
    return nodes.map((node) => (
      <div key={node.value} style={{ marginLeft: `${level * 16}px` }}>
        <div
          className="flex items-center cursor-pointer hover:bg-gray-200 p-1 rounded whitespace-nowrap"
          onClick={() => toggleNode(node.value)}
        >
          {node.children ? (
            expandedNodes.has(node.value) ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            )
          ) : (
            <FileText className="w-4 h-4 mr-1" />
          )}
          <span>{node.label}</span>
        </div>
        {expandedNodes.has(node.value) && node.children && (
          <div>{renderTree(node.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  return (
    <div
      className={`bg-gray-100 p-4 ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 ease-in-out flex flex-col h-full`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Explorer</h2>
        <button onClick={toggleCollapse} className="text-gray-600 hover:text-gray-800">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div className="flex space-x-2 mb-4">
            <button className="p-1 hover:bg-gray-200 rounded" title="New Folder">
              <FolderPlus className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="New File">
              <FileText className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" title="Refresh Explorer">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded" onClick={collapseAllNodes} title="Collapse All Folders">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto overflow-x-auto" ref={treeRef}>
            <div className="mb-4">{renderTree(initialTreeData)}</div>
          </div>
          <div className="mt-auto">
            <button className="w-full text-left p-2 hover:bg-gray-200 rounded flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              <span>設定</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;