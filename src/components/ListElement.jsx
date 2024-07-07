import star from "../assets/star.svg";
import arrow from "../assets/arrow.svg";

function ListElement({ item }) {
  const distance = Math.round(item.distance);

  return (
    <>
      <div className="text-lg">
        <div className="flex items-center m-4">
          <h1 className="text-2xl font-bold p-2 mx-4">{item.name}</h1>
          <div className="flex items-center justify-center p-2 mx-4">
            <p>{item.rating}</p>
            <img className="size-4 ml-2" src={star} />
          </div>
          <p className="flex items-center justify-center p-2 mx-4">
            Reviews: {item.review_count}
          </p>
          <p className="flex items-center justify-center p-2 mx-4">
            Price: {item.price}
          </p>
        </div>
        <div className="flex items-top justify-around m-4">
          <div>
            <p>
              Address: {item.location.address1} {item.location.city}
            </p>
            <p>Phone: {item.phone}</p>
          </div>
          <p>Distance: {distance}m</p>
        </div>
      </div>
      <div className="ml-5 flex items-center justify-center">
        <a
          className="cursor-pointer bg-amber-500 hover:bg-amber-400 active:bg-amber-300 rounded-full p-1"
          href={item.url}
          target="_blank"
        >
          <img src={arrow} />
        </a>
      </div>
    </>
  );
}

export default ListElement;
