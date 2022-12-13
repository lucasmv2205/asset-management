import { useUnits } from "../../state/hooks/useUnits";
import { BranchesOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export function UnitContent({ unitId }: any) {
  const { units } = useUnits();
  const [unit] = units.filter((unit) => unit.id === unitId);
  return (
    <Title
      level={5}
      style={{ display: "flex", gap: "8px", alignItems: "center" }}
    >
      <BranchesOutlined />
      {unit?.name}
    </Title>
  );
}
