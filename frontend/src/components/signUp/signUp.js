import { useEffect, useState } from "react";
import "./signUp.css";
import logo from "./logo.svg";
import axios from 'axios';

const usernames = ["joe", "joe1", "joe2"];
const strengthLabels = ["weak", "medium", "strong"];


const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Username = ({ isValid, isLoading, handleChange }) => {
  return (
    <>
      <div className="username">
        <input
          onChange={handleChange}
          autoComplete="off"
          spellCheck="false"
          className="control"
          type="text"
          placeholder="Username"
        />
        <div className={`spinner ${isLoading ? "loading" : ""}`}></div>
      </div>
      <div className={`validation ${!isValid ? "invalid" : ""}`}>
        Username already taken
      </div>
    </>
  );
};

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [strength, setStrength] = useState("");
  const debouncedUsername = useDebounce(username, 500);
  const [usernames, setUsernames] = useState(['parth'])

  const handleChangeU = (e) => {
    setIsLoading(true);
    setUsername(e.target.value);
  };

  useEffect(() => {
    setIsValid(!usernames.some((u) => u === debouncedUsername));
    setIsLoading(false);
  }, [debouncedUsername]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/signup');
      const users = response.data.map(user => user.username)
      setUsernames(users);
      console.log(usernames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData()
  },[2])

  window.addEventListener("beforeunload", (event) => {
    fetchData();
  });

  window.addEventListener("unload", (event) => {
    fetchData();
});



  const getStrength = (password) => {
    console.log(password);

    let strengthIndicator = -1;

    let upper = false,
      lower = false,
      numbers = false;

    for (let index = 0; index < password.length; index++) {
      let char = password.charCodeAt(index);
      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        strengthIndicator++;
      }

      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        strengthIndicator++;
      }

      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        strengthIndicator++;
      }
    }

    setStrength(strengthLabels[strengthIndicator] ?? "");
  };

  const handleChangeP = (event) => {
    getStrength(event.target.value)
    setPassword(event.target.value)
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
  }

  return (
    <div className="card">
      <img src={logo} alt="" />
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <Username
          isLoading={isLoading}
          isValid={isValid}
          handleChange={handleChangeU}
        />
        <input
          name="password"
          spellCheck="false"
          className="control"
          type="password"
          placeholder="Password"
          onChange={handleChangeP}
        />
        <div className={`bars ${strength}`}>
          <div></div>
        </div>
        <div className="strength">{strength && <>{strength} password</>}</div>
        <button disabled={!isValid} className="control" type="submit">
          JOIN NOW
        </button>
      </form>
    </div>
  );
};
