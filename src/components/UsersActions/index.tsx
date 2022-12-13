import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UserActionsProps {
  showEditModal: () => void;
  cancel: () => void;
  confirm: (id: string) => void;
  id: string;
  setSelectedUserId: any;
}

export function UsersActions({
  showEditModal,
  id,
  confirm,
  setSelectedUserId,
  cancel,
}: UserActionsProps) {
  return (
    <Space size="middle">
      <Button
        onClick={() => {
          showEditModal();
          setSelectedUserId(id);
        }}
      >
        <EditOutlined />
        Edit
      </Button>
      <Button danger type="dashed">
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => confirm(id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
          Delete
        </Popconfirm>
      </Button>
    </Space>
  );
}
