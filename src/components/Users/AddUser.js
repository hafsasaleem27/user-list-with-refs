import React, { useState, Fragment } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import styles from "./AddUser.module.css";

import Wrapper from "../../Helpers/Wrapper";

const AddUser = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredName.trim() === "" || enteredAge.trim() === "") {
      setError({
        title: "Invalid Input",
        message: "Please enter valid name and age (non-empty values)."
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }

    console.log(enteredName, enteredAge);
    props.onAddUser(enteredName, enteredAge);
    setEnteredName("");
    setEnteredAge("");
  };

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const ageHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => setError(null);

  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Your name</label>
          <input
            id="username"
            type="text"
            value={enteredName}
            onChange={nameHandler}
          />
          <label htmlFor="age">Your age</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddUser;
