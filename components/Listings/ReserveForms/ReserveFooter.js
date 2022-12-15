// MomentJS (date util lib)
import moment from "moment";
moment.locale("en");

export default function ReserveFooter({ roomData, checkInDay, checkOutDay }) {
  return (
    <form className="h-20 w-full px-4 flex justify-between items-center bg-white border-t ">
      <div>
        <div>
          <span className="font-bold">{"$" + roomData.price}</span>
          <span className="font-extralight"> night</span>
        </div>
        <div className="text-sm font-bold underline">
          {moment(checkInDay).format("MMM D") +
            " – " +
            moment(checkOutDay).format("MMM D")}
        </div>
      </div>
      <button
        type="button"
        className="py-2 px-6 rounded font-bold text-white bg-pink-500"
      >
        Reserve
      </button>
    </form>
  );
}
