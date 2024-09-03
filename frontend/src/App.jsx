// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Register from "./pages/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./common/hooks/auth";
import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //   <Route path='/register' element={<Register />} />
    //   </Routes>
    // </BrowserRouter>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
