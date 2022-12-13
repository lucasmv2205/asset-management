import { Button, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface CompanyActionProps {
  showEditModal: () => void;
  cancel: () => void;
  confirm: (id: string) => void;
  id: string;
  setSelectedCompanyId: any;
}

export function CompanyActions({
  showEditModal,
  id,
  confirm,
  setSelectedCompanyId,
  cancel,
}: CompanyActionProps) {
  return (
    <Space size="middle">
      <Button
        onClick={() => {
          showEditModal();
          setSelectedCompanyId(id);
        }}
      >
        <EditOutlined />
        Edit
      </Button>
      <Button danger type="dashed">
        <Popconfirm
          title="Are you sure to delete this company?"
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
