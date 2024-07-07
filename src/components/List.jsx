import { useContext } from "react";
import { MyContext } from "../App";
import ListElement from "./ListElement";

function List() {
  const { data, pageFirstLoad } = useContext(MyContext);

  return (
    <div className="flex justify-center mt-10">
      {data.length > 0 ? (
        <ul className="overflow-hidden overflow-y-auto max-h-list">
          {data.map((item, index) => (
            <li
              className="flex bg-amber-600 bg-opacity-90 shadow-2xl border-2 border-amber-400 p-5 mb-10 text-lg min-w-full h-fit rounded-lg hover:bg-amber-500 transition ease duration-450"
              key={index}
            >
              <ListElement item={item} />
            </li>
          ))}
        </ul>
      ) : (
        !pageFirstLoad && (
          <h1 className="text-lg font-bold bg-amber-600 bg-opacity-90 shadow-2xl border-2 border-amber-400 p-5 rounded-lg">
            No results found...
          </h1>
        )
      )}
    </div>
  );
}

export default List;
