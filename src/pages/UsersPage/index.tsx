import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import Title from "antd/es/typography/Title";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useUsers } from "../../state/hooks/useUsers";
import { useCompanies } from "../../state/hooks/useCompanies";
import { useUnits } from "../../state/hooks/useUnits";

export function UsersPage() {
  const { users, deleteUser } = useUsers();
  const { companies } = useCompanies();
  const { units } = useUnits();

  const [selectedUser, setSelectedUser] = useState("");

  const data = users;

  const getCompany = (companyId: string) => {
    const [company] = companies.filter((company) => company.id === companyId);
    return company;
  };

  const getUnit = (unitId: string) => {
    const [unit] = units.filter((unit) => unit.id === unitId);
    return unit;
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("User was preserved");
  };

  const confirm = (id: string) => {
    deleteUser(id)
      .then((res) => {
        message.success("User deleted");
      })
      .catch((err) => {
        message.error("Error deleting user");
      });
  };

  const columns = [
    {
      title: "Key",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Unit",
      dataIndex: "unitId",
      key: "unitId",
      render: (unitId: any) => (
        <Space size="middle">{getUnit(unitId)?.name}</Space>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyId",
      key: "companyId",
      render: (companyId: any) => (
        <Space size="middle">{getCompany(companyId)?.name}</Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Space size="middle">
          <Button
            onClick={() => {
              // showEditModal();
              setSelectedUser(id);
            }}
          >
            <EditOutlined />
            Edit
          </Button>
          <Button danger type="dashed">
            <Popconfirm
              title="Are you sure to delete this user?"
              // @ts-ignore
              onConfirm={() => confirm(id)}
              // @ts-ignore
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
              Delete
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space size={30} align="baseline">
        <Title level={3}>Users</Title>
        <Button
          // onClick={() =>
          // showCreateModal()
          // }
          type="primary"
        >
          <PlusOutlined />
          add User
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Create unit"
        open={isModalCreateOpen}
        onCancel={handleCreateCancel}
      >
        <Form
          name="create company"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishCreateUnit}
          onFinishFailed={onFinishCreateFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please input the company name!" },
            ]}
          >
            <Input name="name" placeholder="e.g.: Ambev" />
          </Form.Item>

          <Form.Item
            label="Company"
            rules={[{ required: true, message: "Please select the company" }]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Select company"
              onChange={onChangeCompany}
              clearIcon={<CloseOutlined />}
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
    </>
  );
}
