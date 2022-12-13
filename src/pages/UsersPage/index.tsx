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
  UsergroupAddOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useUsers } from "../../state/hooks/useUsers";
import { useCompanies } from "../../state/hooks/useCompanies";
import { useUnits } from "../../state/hooks/useUnits";
import { userType } from "../../types/user";

export function UsersPage() {
  const { users, deleteUser, createUser, editUser } = useUsers();
  const { companies } = useCompanies();
  const { units } = useUnits();
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  const showCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };

  const companiesSelect = companies.map((company) => {
    return { value: company.id, label: company.name };
  });

  const onChangeCompany = (value: string) => {
    setCompanyId(value);
  };

  const unitsSelect = units.map((unit) => {
    return { value: unit.id, label: unit.name };
  });

  const onChangeUnit = (value: string) => {
    setUnitId(value);
  };

  const onFinishCreateUser = (values: userType) => {
    const user = {
      name: values.name,
      email: values.email,
      id: (users.length + 1).toString(),
      companyId: companyId,
      unitId: unitId,
    };

    createUser(user)
      .then((res) => {
        message.success("User created");
        setIsModalCreateOpen(false);
      })
      .catch(() => {
        message.error("Fail creating user");
      });
  };

  const data = users;

  const getCompany = (companyId: string) => {
    const [company] = companies.filter((company) => company.id === companyId);
    return company;
  };

  const getUnit = (unitId: string) => {
    const [unit] = units.filter((unit) => unit.id === unitId);
    return unit;
  };

  const cancel = () => {
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

  const showEditModal = () => {
    setIsModalEditOpen(true);
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
      ),
    },
  ];

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const [user] = users.filter((user) => user.id === selectedUserId);

  const onFinish = (values: userType) => {
    const user = {
      name: values.name,
      email: values.email,
      id: selectedUserId,
      companyId: companyId,
      unitId: unitId,
    };

    editUser(user)
      .then((res) => {
        message.success("User edited");
        setIsModalEditOpen(false);
      })
      .catch(() => {
        message.error("User edited fail");
      });
  };

  return (
    <>
      <Space
        style={{ display: "flex", justifyContent: "space-between" }}
        size={30}
        align="baseline"
      >
        <Title level={3}>
          {" "}
          <UsergroupAddOutlined
            style={{ marginRight: "12px", fontSize: "24px" }}
          />
          Users
        </Title>
        <Button onClick={() => showCreateModal()} type="primary">
          <PlusOutlined />
          add User
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Create user"
        open={isModalCreateOpen}
        onCancel={handleCreateCancel}
      >
        <Form
          name="create user"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishCreateUser}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input name="name" placeholder="e.g.: Lucas Martins" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input the user email!" },
            ]}
          >
            <Input
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

      <Modal
        title="Edit user"
        open={isModalEditOpen}
        onCancel={handleEditCancel}
      >
        <Form
          name="Edit company"
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
            rules={[
              { required: true, message: "Please input the user email!" },
            ]}
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
    </>
  );
}
