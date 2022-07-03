import { Routes, Route, Navigate } from "react-router-dom";
import JobPage from "./job";
import JobHistory from "./history";
import { RecoilRoot } from 'recoil';

function App() {  

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<JobPage />} />
        <Route path="/history" element={<JobHistory />} />
        <Route path="*" element={<Navigate replace to="/" />}/>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
