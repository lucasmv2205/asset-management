import { RecoilRoot } from "recoil";
import Router from "./routes";

export function App() {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  );
}
