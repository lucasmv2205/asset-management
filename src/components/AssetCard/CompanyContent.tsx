import Title from "antd/es/typography/Title";
import { useCompanies } from "../../state/hooks/useCompanies";
import { BankOutlined } from "@ant-design/icons";

export function CompanyContent({ companyId }: any) {
  const { companies } = useCompanies();
  const [company] = companies.filter((company) => company.id === companyId);

  return (
    <Title
      level={5}
      style={{ display: "flex", gap: "8px", alignItems: "center" }}
    >
      <BankOutlined />
      {company?.name}
    </Title>
  );
}
