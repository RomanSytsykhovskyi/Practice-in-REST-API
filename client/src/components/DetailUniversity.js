import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RootContext } from "../App";
import { useHttp } from "../hooks/useHttp";

const DetailUniversity = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [university, setUniversity] = useState({
    id: null,
    name: "Loading...",
    city: "Loading...",
  });

  const { request, pending } = useHttp();

  const { token, isAuthenticated } = useContext(RootContext);

  const fetchData = useCallback(async () => {
    const data = await request(`/api/universities?id=${id}`);
    if (data?.result === null) {
      setUniversity({
        id: 9.75,
        name: "Hogwarts",
        city: "London",
      });
      alert(data.err);
      navigate("/authorised/universities");
    } else {
      setUniversity({
        id: data.parsedUniversities.id,
        name: data.parsedUniversities.name,
        city: data.parsedUniversities["city"].name,
      });
    }
  }, []);

  const clickHandler = async (e) => {
    try {
      const data = await request(
        `/api/universities?id=${id}`,
        "PUT",
        {
          name: university.name,
          city: university.city,
        },
        { Authorization: `Bearer ${token}` }
      );

      if (data.err !== null) {
        throw new Error(data.err);
      }
      setUniversity({ ...university, name: data.name, city: data.city });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="title">University</h2>
      {isAuthenticated ? (
        <>
          <label className="form-label">
            Name: <br />
            <input
              type="text"
              name="name"
              className="input"
              onChange={(e) =>
                setUniversity({ ...university, name: e.target.value })
              }
              value={university.name}
            />
          </label>
          <br />
          <label className="form-label">
            City: <br />
            <input
              type="text"
              name="city"
              className="input"
              onChange={(e) =>
                setUniversity({ ...university, city: e.target.value })
              }
              value={university.city}
            />
          </label>
          <br />
          <button onClick={clickHandler} disabled={pending}>
            Change
          </button>
          <br />
          <br />
          <img
            src="https://images1.content-hci.com/commimg/video/CH/myhc_279666.jpg"
            style={{ width: "300px" }}
          />
          <br />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </>
      ) : (
        <>
          <h2>Name: {university.name}</h2>
          <h2>City: {university.city}</h2>
          <img
            src="https://images1.content-hci.com/commimg/video/CH/myhc_279666.jpg"
            style={{ width: "300px" }}
          />
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </>
      )}
    </div>
  );
};

export default DetailUniversity;
