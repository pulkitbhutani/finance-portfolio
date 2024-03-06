import NavigationBar from "./components/NavigationBar";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="w-full flex">
      <NavigationBar />
      <main className="grow">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
