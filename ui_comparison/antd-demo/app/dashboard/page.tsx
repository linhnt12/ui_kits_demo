"use client";
import { Space, Table, Tag, Button } from "antd";
import { useState, useCallback, useEffect, useMemo } from "react";
import { DataType, tableData } from "./data/tableData";

const { Column } = Table;
const ITEMS_PER_PAGE = 50;
const BUFFER_SIZE = 10;

export default function DashboardPage() {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: ITEMS_PER_PAGE });
  const [containerHeight, setContainerHeight] = useState(600);
  const itemHeight = 54;

  const visibleData = useMemo(() => {
    const start = Math.max(0, visibleRange.start - BUFFER_SIZE);
    const end = Math.min(tableData.length, visibleRange.end + BUFFER_SIZE);
    return tableData.slice(start, end).map((item, index) => ({
      ...item,
      virtualIndex: start + index,
    }));
  }, [visibleRange]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight } = e.target as HTMLDivElement;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + Math.ceil(clientHeight / itemHeight), tableData.length);
    setVisibleRange({ start, end });
  }, []);

  useEffect(() => {
    const updateHeight = () => setContainerHeight(window.innerHeight - 200);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const renderTags = useCallback((tags: string[]) => (
    <>
      {tags.slice(0, 3).map((tag) => (
        <Tag color={tag === "loser" ? "volcano" : tag.length > 5 ? "geekblue" : "green"} key={tag}>
          {tag.toUpperCase()}
        </Tag>
      ))}
      {tags.length > 3 && <Tag>+{tags.length - 3}</Tag>}
    </>
  ), []);

  const renderAction = useCallback(() => (
    <Space size="small">
      <Button type="link" size="small">Edit</Button>
      <Button type="link" size="small" danger>Delete</Button>
    </Space>
  ), []);

  const totalHeight = tableData.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  return (
    <div style={{ height: "90vh", display: "flex", flexDirection: "column" }}>
      <h1 className="text-2xl font-bold mb-4">Bảng dữ liệu</h1>
      
      <div style={{ flex: 1 }}>
        <div 
          style={{
            height: containerHeight,
            overflow: "auto",
            border: "1px solid #f0f0f0",
            borderRadius: "6px",
            position: "relative"
          }} 
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: "relative" }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              <Table<DataType & { virtualIndex: number }>
                dataSource={visibleData}
                pagination={false}
                rowKey={(record) => `${record.key}-${record.virtualIndex}`}
                scroll={{ x: "max-content" }}
                showHeader={visibleRange.start === 0}
                style={{ background: "white" }}
              >
                <Column
                  title="ID"
                  key="id"
                  width={80}
                  render={(_, record) => record.virtualIndex + 1}
                />
                <Column 
                  title="Name" 
                  key="name" 
                  width={160} 
                  render={(_, record) => `${record.firstName} ${record.lastName}`}
                />
                <Column title="Age" dataIndex="age" key="age" width={80} />
                <Column title="Address" dataIndex="address" key="address" width={200} />
                <Column title="Tags" dataIndex="tags" key="tags" width={300} render={renderTags} />
                <Column title="Action" key="action" width={150} render={renderAction} />
              </Table>
            </div>
          </div>

          {visibleRange.start > 0 && visibleRange.end < tableData.length && (
            <div style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "white",
              borderBottom: "1px solid #f0f0f0",
            }}>
              <Table<DataType>
                dataSource={[]}
                pagination={false}
                size="small"
                scroll={{ x: "max-content" }}
              >
                <Column title="ID" key="id" width={80} />
                <Column title="Name" key="name" width={160} />
                <Column title="Age" dataIndex="age" width={80} />
                <Column title="Address" dataIndex="address" width={300} />
                <Column title="Tags" dataIndex="tags" width={200} />
                <Column title="Action" key="action" width={150} />
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
