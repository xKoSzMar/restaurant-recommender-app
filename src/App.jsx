import { useState, createContext } from "react";
import NavigationBar from "./components/NavigationBar";
import List from "./components/List";

export const MyContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [pageFirstLoad, setPageFirstLoad] = useState(true);

  return (
    <>
      <MyContext.Provider
        value={{ data, setData, pageFirstLoad, setPageFirstLoad }}
      >
        <NavigationBar />
        <List />
      </MyContext.Provider>
    </>
  );
}

export default App;
