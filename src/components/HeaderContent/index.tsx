import { Select } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { useUnits } from "../../state/hooks/useUnits";
import { useAssets } from "../../state/hooks/useAssets";
import api from "../../services/api";

export function HeaderContent() {
  const navigate = useNavigate();
  const { units } = useUnits();
  const { setAssets } = useAssets();

  const getFilteredAssetByUnit = async (value: string) => {
    const assetsFiltered = await api.get(`/assets/?unitId=${value}`);
    return assetsFiltered;
  };

  const unitsSelect = units.map((unit) => {
    return { value: unit.id, label: unit.name };
  });

  const onChangeUnits = async (value: string) => {
    if (value) {
      const assets = await getFilteredAssetByUnit(value);
      setAssets(assets.data);
    }
  };

  return (
    <div
      style={{
        padding: 32,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Title
        onClick={() => navigate("/")}
        level={2}
        style={{
          color: "#fff",
          textAlign: "center",
          cursor: "pointer",
          margin: 24,
        }}
      >
        TracOS™
      </Title>

      <Select
        showSearch
        allowClear
        placeholder="Select unit"
        onChange={onChangeUnits}
        clearIcon={<CloseOutlined />}
        options={unitsSelect}
        style={{ minWidth: "200px" }}
      />
    </div>
  );
}
