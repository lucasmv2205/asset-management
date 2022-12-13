import { Button, Form, Input, Modal, Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { unitType } from "../../types/unit";

interface UnitFormModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  onFinish: (value: unitType) => void;
  unit?: unitType;
  onChangeCompany: (value: string) => void;
  companiesSelect: { label: string; value: string }[];
  edit?: boolean;
}

export function UnitFormModal({
  edit,
  isModalOpen,
  onChangeCompany,
  companiesSelect,
  unit,
  onCancel,
  onFinish,
}: UnitFormModalProps) {
  return (
    <Modal
      title={edit ? "Edit unit" : "Create unit"}
      open={isModalOpen}
      onCancel={onCancel}
    >
      <Form
        name={edit ? "Edit unit" : "Create unit"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the unit name!" }]}
        >
          <Input name="name" defaultValue={unit?.name} />
        </Form.Item>

        <Form.Item
          label="company"
          rules={[{ required: true, message: "Please select the unit" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Select company"
            onChange={onChangeCompany}
            clearIcon={<CloseOutlined />}
            defaultValue={unit?.companyId}
            options={companiesSelect}
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
