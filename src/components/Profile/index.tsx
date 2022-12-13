import React from "react";
import { Avatar, Typography } from "antd";
const { Text } = Typography;

export function Profile() {
  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div>
        <div>
          <Text style={{ color: "#ededed", display: "block" }}>
            Logged user
          </Text>
        </div>
        <div>
          <Text style={{ color: "#d2cdcd", display: "block" }}>
            user.email@email.com
          </Text>
        </div>
      </div>
      <Avatar src="https://github.com/lucasmv2205.png" size={56} />
    </div>
  );
}
