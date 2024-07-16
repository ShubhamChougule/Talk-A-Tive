import React from "react";
import { Avatar, Badge, Space } from "antd";

const NotificationComponent = () => {
  return (
    <div>
      <Badge count={5}>
        <Avatar shape="square" size="large" />
      </Badge>
    </div>
  );
};

export default NotificationComponent;
