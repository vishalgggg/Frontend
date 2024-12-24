import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteExpenseAction } from "../../../store/actions/expenseActions";
const Expense = ({ name, price, category, date, id }) => {
  const dispatch = useDispatch();
  const onDeleteExpenseHandeler = () => {
    dispatch(deleteExpenseAction(id));
  };

  return (
    <div
      className={`w-[90%] md:w-[900px] m-auto flex justify-between items-center ${
        category === "expense" ? "bg-red-300" : "bg-green-300"
      }  font-popins p-4 rounded-md`}
    >
      <div className=" flex flex-col justify-center items-center">
        <h1 className=" text-xl font-bold">DATE : {date}</h1>
        <h1 className=" text-lg font-semibold">DESCRIPTION : {name}</h1>
      </div>
      <div className=" flex flex-col justify-center items-center gap-3">
        <h1 className=" text-xl ">AMOUNT: {price}</h1>
        <div className=" flex justify-center items-center gap-4 text-2xl">
          <FaEdit className=" cursor-pointer text-teal-900" />
          <MdDelete
            className=" cursor-pointer text-orange-500"
            onClick={onDeleteExpenseHandeler}
          />
        </div>
      </div>
    </div>
  );
};

export default Expense;
