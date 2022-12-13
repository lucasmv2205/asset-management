import { Button, Form, Input, Modal } from "antd";
import { companyType } from "../../types/company";

interface CompanyFormModalProps {
  company?: companyType;
  edit?: boolean;
  openModal: boolean;
  onCancel: () => void;
  onFinish: (values: companyType) => void;
}

export function CompanyFormModal({
  company,
  edit,
  openModal,
  onCancel,
  onFinish,
}: CompanyFormModalProps) {
  return (
    <Modal
      title={edit ? "Edit company" : "Create company"}
      open={openModal}
      onCancel={onCancel}
    >
      <Form
        name={edit ? "Edit company" : "create company"}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input the company name!" },
          ]}
        >
          <Input
            defaultValue={company?.name}
            name="name"
            placeholder="e.g.: Ambev"
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
