import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined, BranchesOutlined } from "@ant-design/icons";
import { useCompanies } from "../../state/hooks/useCompanies";
import { message } from "antd";
import Title from "antd/es/typography/Title";
import { useUnits } from "../../state/hooks/useUnits";
import { unitType } from "../../types/unit";
import { UnitFormModal } from "../../components/UnitFormModal";
import { UnitActions } from "../../components/UnitActions";

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
        <UnitActions
          showEditModal={showEditModal}
          id={id}
          setSelectedUnitId={setSelectedUnitId}
          cancel={cancel}
          confirm={confirm}
        />
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

  const onFinishCreateUnit = (values: unitType) => {
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
      <Space
        style={{ display: "flex", justifyContent: "space-between" }}
        size={30}
        align="baseline"
      >
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

      <UnitFormModal
        isModalOpen={isModalCreateOpen}
        onChangeCompany={onChangeCompany}
        companiesSelect={companiesSelect}
        onCancel={handleCreateCancel}
        onFinish={onFinishCreateUnit}
      />
      <UnitFormModal
        edit
        unit={unit}
        isModalOpen={isModalEditOpen}
        onChangeCompany={onChangeCompany}
        companiesSelect={companiesSelect}
        onCancel={handleEditCancel}
        onFinish={onFinish}
      />
    </>
  );
}
