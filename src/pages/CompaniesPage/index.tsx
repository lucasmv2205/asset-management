import React, { useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Typography } from "antd";
import { PlusOutlined, GroupOutlined } from "@ant-design/icons";
import { useCompanies } from "../../state/hooks/useCompanies";
import { message } from "antd";
import Title from "antd/es/typography/Title";
import { companyType } from "../../types/company";
import { CompanyFormModal } from "../../components/CompanyFormModal";
import { CompanyActions } from "../../components/CompanyActions";

export function CompaniesPage() {
  const { companies, editCompany, deleteCompany, createCompany } =
    useCompanies();

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [company] = companies.filter(
    (company) => company.id === selectedCompanyId
  );

  const showEditModal = () => {
    setIsModalEditOpen(true);
  };

  const handleEditOk = () => {
    setIsModalEditOpen(false);
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
    deleteCompany(id)
      .then((res) => {
        message.success("Company deleted");
      })
      .catch((err) => {
        message.error("Error deleting company");
      });
  };

  const cancel = () => {
    message.error("Company was preserved");
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
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <CompanyActions
          showEditModal={showEditModal}
          id={id}
          setSelectedCompanyId={setSelectedCompanyId}
          cancel={cancel}
          confirm={confirm}
        />
      ),
    },
  ];

  const data = companies;

  const onFinish = (values: companyType) => {
    const company = {
      name: values.name,
      id: selectedCompanyId,
    };

    editCompany(company)
      .then((res) => {
        message.success("Company edited");
        handleEditOk();
      })
      .catch(() => {
        message.error("Company edited fail");
      });
  };

  const onFinishCreateCompany = (values: companyType) => {
    const company = {
      name: values.name,
      id: (companies.length + 1).toString(),
    };

    createCompany(company)
      .then((res) => {
        message.success("Company created");
        setIsModalCreateOpen(false);
      })
      .catch(() => {
        message.error("Fail creating company");
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
          <GroupOutlined style={{ marginRight: "12px", fontSize: "24px" }} />
          Companies
        </Title>
        <Button onClick={() => showCreateModal()} type="primary">
          <PlusOutlined />
          add Company
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />

      <CompanyFormModal
        openModal={isModalCreateOpen}
        onCancel={handleCreateCancel}
        onFinish={onFinishCreateCompany}
      />
      <CompanyFormModal
        edit
        company={company}
        openModal={isModalEditOpen}
        onCancel={handleEditCancel}
        onFinish={onFinish}
      />
    </>
  );
}
