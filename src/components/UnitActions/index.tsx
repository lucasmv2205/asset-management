import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface UnitActionsProps {
  showEditModal: () => void;
  cancel: () => void;
  confirm: (id: string) => void;
  id: string;
  setSelectedUnitId: any;
}

export function UnitActions({
  showEditModal,
  id,
  confirm,
  setSelectedUnitId,
  cancel,
}: UnitActionsProps) {
  return (
    <Space size="middle">
      <Button
        onClick={() => {
          showEditModal();
          setSelectedUnitId(id);
        }}
      >
        <EditOutlined />
        Edit
      </Button>
      <Button danger type="dashed">
        <Popconfirm
          title="Are you sure to delete this unit?"
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
