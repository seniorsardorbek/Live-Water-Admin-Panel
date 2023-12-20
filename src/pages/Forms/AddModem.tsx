import React from "react";
import { Link } from "react-router-dom";

function AddModem() {
  return (
    <div>
      <ul className="flex space-x-2 rtl:space-x-reverse">
        <li>
          <Link to="/" className="text-primary hover:underline">
            Dashboard
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <Link to="/events" className="text-primary hover:underline">
            Event
          </Link>
        </li>
        <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Event qo'shish</span>
        </li>
      </ul>
      <div className="panel mt-5 lg:row-span-3">
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">
            Event qo'shish
          </h5>{" "}
        </div>
        <div className="mb-5">
          <form className="space-y-5">
            <div>
              <label htmlFor="seriya">Seriya raqami</label>
              <input
                id="seriya"
                type="number"
                name="seriya"
                placeholder="456789023"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="satx">Suv satxi</label>
              <input
                id="satx"
                type="number"
                name="satx"
                placeholder="701"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="tuzlik">Tuzlik darajasi</label>
              <input
                id="tuzlik"
                type="number"
                name="tuzlik"
                placeholder="1.76"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="bosim">Bosim raqami</label>
              <input
                id="bosim"
                type="number"
                name="bosim"
                placeholder="2.847
                "
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="quvvat">Quvvat raqami</label>
              <input
                id="quvvat"
                type="number"
                name="quvvat"
                placeholder="23"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="ctnSelect2">Example multiple select</label>
              <select className="form-select form-select-lg text-white-dark">
                <option>Open this select menu</option>
                <option>Signal yo'q</option>
                <option>Yaxshi  </option>
                <option>Three</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary !mt-6">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModem;
