import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const TodoApp = () => {
  let [item, SetItem] = useState([
    { id: 1, label: "Html & css", checked: true },
    { id: 2, label: "Javascript", checked: true },
    { id: 3, label: "React JS", checked: false },
  ]);
  let [NewItem, setNewItem] = useState("");
  let [update, setUpdate] = useState(false);
  let [CurrentId, setCurrentId] = useState(null);

  let handleChecked = (id) => {
    let newListItem = item.map((item) => {
      return id === item.id ? { ...item, checked: !item.checked } : item;
    });
    SetItem(newListItem);
  };
  let handleUpdate = (id) => {
    let newListItems = item.find((item) => item.id === id);
    setNewItem(newListItems.label);
    setUpdate(true);
    setCurrentId(id);
  };
  let handleDelete = (id) => {
    let newItems = item
      .filter((item) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    SetItem(newItems);
  };
  let handleSaveOrAddItem = () => {
    if (update) {
      let UpdateItem = item.map((item) => {
        return item.id === CurrentId ? { ...item, label: NewItem } : item;
      });
      SetItem(UpdateItem);
      setNewItem("");
      setCurrentId(null);
      setUpdate(false);
    } else {
      SetItem([
        ...item,
        { id: item.length + 1, label: NewItem, checked: false },
      ]);
      setNewItem("");
    }
  };
  return (
    <main>
        <header>
            <h1>Todo List</h1>
        </header>
      <div className="input-add">
        <input
          type="text"
          value={NewItem}
          placeholder="Add New Item"
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button onClick={handleSaveOrAddItem}>{update ? "Save" : "Add"}</button>
      </div>
      <ul>
        {item.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
              />
              <label>{item.label}</label>
              <FaEdit
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
                id="edit"
              />
              <FaTrashAlt
                role="button"
                tabIndex={0}
                onClick={() => handleDelete(item.id)}
                id="delete"
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default TodoApp;
