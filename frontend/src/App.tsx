import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/navbar";
import { ThemeProvider } from "./providers/theme.provider";

import ItemDetail from "./pages/item-detail";
import ItemForm from "./pages/item-form";
import Items from "./pages/items";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/items" />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/new" element={<ItemForm />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;