import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setExpensesAction } from "../../../store/actions/expenseActions";
const AddExpenseForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("expense");
  const [date, setDate] = useState("");

  // when user add some expense
  const addExpenseHandeler = (e) => {
    e.preventDefault();
    const submitedExpense = {
      date,
      name,
      price,
      category,
    };

    dispatch(setExpensesAction(submitedExpense));
  };

  return (
    <form
      className="flex justify-center items-center gap-3 p-4 bg-blue-900 text-white"
      onSubmit={addExpenseHandeler}
    >
      <div className=" flex justify-center items-center gap-2">
        <label>Date</label>
        <input
          type="date"
          placeholder="Enter the date"
          className=" text-black px-3 py-1 rounded-md"
          required
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
        />
      </div>
      <div className=" flex justify-center items-center gap-2">
        <label>Name</label>
        <input
          type="text"
          placeholder="expense name"
          className=" text-black px-3 py-1 rounded-md"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className=" flex justify-center items-center gap-2">
        <label>Price</label>
        <input
          type="number"
          placeholder="expense price"
          className=" text-black px-3 py-1 rounded-md"
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
      </div>
      <div className=" flex justify-center items-center gap-2">
        <label>Category</label>
        <select
          name="category"
          className="text-black px-3 py-1 rounded-md"
          required
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option value={"expense"}>Expense</option>
          <option value={"credit"}>Credit</option>
        </select>
      </div>

      <button className=" bg-blue-600 px-4 py-1 rounded-md">Add Now</button>
    </form>
  );
};

export default AddExpenseForm;
