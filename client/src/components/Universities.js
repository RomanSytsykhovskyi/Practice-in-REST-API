import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../App";
import { useHttp } from "../hooks/useHttp";
import University from "./University";

const Universities = () => {
  const { token, isAuthenticated } = useContext(RootContext);

  const navigate = useNavigate();
  const { request, pending } = useHttp();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const [universities, setUniversities] = useState([]);
  const [addedUniversities, setAddedUniversities] = useState([]);
  const [newPending, setNewPending] = useState(false);
  //console.log(pending);

  const fetchData = useCallback(async () => {
    try {
      const data = await request("/api/universities");

      //console.log(data);

      if (data.err !== null) {
        throw new Error(data.err);
      }

      setUniversities(data.parsedUniversities);
    } catch (error) {
      alert(error.message);
    }
  }, [universities]);

  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = (id) => {
    navigate(
      isAuthenticated ? `/authorised/university/${id}` : `/universities/${id}`
    );
  };

  const aNewUniversity = useCallback(async () => {
    try {
      setNewPending(true);
      const data = await fetch("/api/create/university", {
        method: "POST",
        body: JSON.stringify({ name: name, city: city }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();

      setNewPending(false);

      if (result.err !== null) {
        throw new Error(result.err);
      }

      setAddedUniversities([
        ...addedUniversities,
        { id: result.id, name: result.name, city: { name: result.city } },
      ]);
    } catch (error) {
      alert(error);
    }
  }, [name, city]);

  return (
    <>
      <h2 className="title">Universities</h2>
      <div className="universities">
        {pending ? (
          <h2>Loading...</h2>
        ) : (
          universities.map((university) => (
            <University
              key={university.id}
              props={{
                id: university.id,
                name: university.name,
                city: university["city"].name,
                clickHandler: clickHandler,
              }}
            />
          ))
        )}

        {newPending ? (
          <h2>Loading...</h2>
        ) : (
          addedUniversities.map((university) => (
            <University
              key={university.id}
              props={{
                id: university.id,
                name: university.name,
                city: university["city"].name,
                clickHandler: clickHandler,
              }}
            />
          ))
        )}
      </div>

      {!isAuthenticated || (
        <>
          <h2 className="title">Add a new university</h2>
          <label className="form-label">
            Name:
            <br />
            <input
              type="text"
              name="name"
              className="input"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <br />
          <label className="form-label">
            City:
            <br />
            <input
              type="text"
              name="city"
              className="input"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </label>
          <br />
          <button
            onClick={aNewUniversity}
            style={{ marginBottom: "10px", width: "100%" }}
            disabled={newPending}
          >
            Add a new university
          </button>
        </>
      )}
    </>
  );
};

export default Universities;
