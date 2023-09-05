import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingComponent() {
  return (
    <div className="absolute bg-white opacity-70 w-full h-full z-20 flex justify-center items-center">
      <Spin size="large" indicator={<LoadingOutlined style={{ color: '#17759F'}} spin />} />
    </div>
  );
}
