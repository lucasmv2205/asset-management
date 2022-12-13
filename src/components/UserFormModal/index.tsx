import { Button, Form, Input, Modal, Select } from "antd";
import { userType } from "../../types/user";
import { CloseOutlined } from "@ant-design/icons";

interface userModalFormProps {
  isModalOpen: boolean;
  onCancel: () => void;
  onFinish: (value: userType) => void;
  onChangeUnit: (value: string) => void;
  onChangeCompany: (value: string) => void;
  companiesSelect: { label: string; value: string }[];
  unitsSelect: { label: string; value: string }[];
  user?: userType;
  edit?: boolean;
}

export function UserFormModal({
  isModalOpen,
  onCancel,
  onFinish,
  onChangeUnit,
  onChangeCompany,
  companiesSelect,
  unitsSelect,
  user,
  edit,
}: userModalFormProps) {
  return (
    <Modal
      title={edit ? "Edit user" : "Create user"}
      open={isModalOpen}
      onCancel={onCancel}
    >
      <Form
        name={edit ? "Edit user" : "Create user"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the user name!" }]}
        >
          <Input
            defaultValue={user?.name}
            name="name"
            placeholder="e.g.: Lucas Martins"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the user email!" }]}
        >
          <Input
            defaultValue={user?.email}
            type="email"
            name="email"
            placeholder="e.g.: test@tractian.com"
          />
        </Form.Item>

        <Form.Item
          label="Company"
          rules={[{ required: true, message: "Please select the company" }]}
        >
          <Select
            showSearch
            allowClear
            defaultValue={user?.companyId}
            placeholder="Select company"
            onChange={onChangeCompany}
            clearIcon={<CloseOutlined />}
            options={companiesSelect}
            style={{ minWidth: "180px" }}
          />
        </Form.Item>

        <Form.Item
          label="Unit"
          rules={[{ required: true, message: "Please select the company" }]}
        >
          <Select
            showSearch
            allowClear
            defaultValue={user?.unitId}
            placeholder="Select unit"
            onChange={onChangeUnit}
            clearIcon={<CloseOutlined />}
            options={unitsSelect}
            style={{ minWidth: "180px" }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
