import React, { useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CloseOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { useCompanies } from "../../state/hooks/useCompanies";
import { message, Popconfirm } from "antd";
import Title from "antd/es/typography/Title";
import { useUnits } from "../../state/hooks/useUnits";
import { companyType } from "../../types/company";
import { unitType } from "../../types/unit";

export function UnitsPage() {
  const { companies } = useCompanies();
  const { units, deleteUnit, createUnit, editUnit } = useUnits();

  const [companyId, setCompanyId] = useState("");
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [unit] = units.filter((unit) => unit.id === selectedUnitId);

  const showEditModal = () => {
    setIsModalEditOpen(true);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const showCreateModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleCreateCancel = () => {
    setIsModalCreateOpen(false);
  };

  const confirm = (id: string) => {
    deleteUnit(id)
      .then((res) => {
        message.success("Unit deleted");
      })
      .catch((err) => {
        message.error("Error deleting unit");
      });
  };

  const cancel = () => {
    message.error("Unit was preserved");
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
      ),
    },
  ];

  const data = units;

  const onFinish = (values: unitType) => {
    const unit = {
      name: values.name,
      id: selectedUnitId.toString(),
      companyId: companyId,
    };

    editUnit(unit)
      .then((res) => {
        message.success("Unit edited");
        setIsModalEditOpen(false);
      })
      .catch(() => {
        message.error("Unit edited fail");
      });
  };

  const onFinishCreateUnit = (values: companyType) => {
    const unit = {
      name: values.name,
      id: (units.length + 1).toString(),
      companyId: companyId,
    };

    createUnit(unit)
      .then((res) => {
        message.success("Unit created");
        setIsModalCreateOpen(false);
      })
      .catch(() => {
        message.error("Fail creating unit");
      });
  };

  const getCompany = (companyId: string) => {
    const [company] = companies.filter((company) => company.id === companyId);
    return company;
  };

  const companiesSelect = companies.map((company) => {
    return { value: company.id, label: company.name };
  });

  const onChangeCompany = (value: string) => {
    setCompanyId(value);
  };

  return (
    <>
      <Space size={30} align="baseline">
        <Title level={3}>
          <BranchesOutlined style={{ marginRight: "12px", fontSize: "24px" }} />
          Units
        </Title>
        <Button onClick={() => showCreateModal()} type="primary">
          <PlusOutlined />
          add Unit
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Create unit"
        open={isModalCreateOpen}
        onCancel={handleCreateCancel}
      >
        <Form
          name="create unit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinishCreateUnit}
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

      <Modal
        title="Edit unit"
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
    </>
  );
}
