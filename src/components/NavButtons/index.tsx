import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  GroupOutlined,
  BranchesOutlined,
  UsergroupAddOutlined,
  HddOutlined,
} from "@ant-design/icons";

export function NavButtons() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12rem",
      }}
    >
      <div>
        <Button
          style={{ fontSize: "18px" }}
          onClick={() => navigate("/assets")}
          type="link"
        >
          <HddOutlined />
          Assets
        </Button>
      </div>
      <div>
        <Button
          style={{ fontSize: "18px" }}
          onClick={() => navigate("/units")}
          type="link"
        >
          <BranchesOutlined />
          Units
        </Button>
      </div>
      <div>
        <Button
          style={{ fontSize: "18px" }}
          onClick={() => navigate("/companies")}
          type="link"
        >
          <GroupOutlined />
          Companies
        </Button>
      </div>
      <div>
        <Button
          style={{ fontSize: "18px" }}
          onClick={() => navigate("/users")}
          type="link"
        >
          <UsergroupAddOutlined />
          Users
        </Button>
      </div>
    </div>
  );
}
