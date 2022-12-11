import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PageTemplate } from "../pages/PageTemplate";
import { Home } from "../pages/Home";
import { AssetsPage } from "../pages/Assets";
import { AssetDetail } from "../pages/AssetDetail";
import { CompaniesPage } from "../pages/CompaniesPage";
import { UsersPage } from "../pages/UsersPage";
import { UnitsPage } from "../pages/UnitsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageTemplate />}>
          <Route index element={<Home />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/assets/:id" element={<AssetDetail />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
