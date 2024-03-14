import React from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import RecipeContext from "../context/RecipeContext";
import { baseUrl } from '../urls';

const LoginModal = ({
  show,
  onHide,
  setRegisterModalShow,
  setLoginModalShow,
}) => {
  const { user, setUser } = useContext(RecipeContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      if (data.error) {
        return alert("Invalid username or password");
      }
    }
    alert("Logged in Successfully");
    onHide();
    const jsonData = await response.json();
    localStorage.setItem("token", jsonData.data.refreshToken);
    localStorage.setItem("username", jsonData.data.user.fullName);
    navigate("/");
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Log in</Modal.Title>
        <h1 className="text-2xl font-medium cursor-pointer" onClick={onHide}>
          X
        </h1>
      </Modal.Header>
      <Modal.Body>
        <section className="flex flex-col gap-2 items-center">
          <form>
            <input
              className="border rounded-xl px-3 py-3 mt-1 outline-none"
              placeholder="Enter Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              type="text"
            />
            <input
              className="border rounded-xl px-3 py-3 mt-1 outline-none"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
            />
            <div className="flex gap-2 my-3">
              <p>Don't have an account? </p>
              <p
                onClick={() => {
                  setRegisterModalShow(true);
                  setLoginModalShow(false);
                }}
                className="text-theme hover:underline cursor-pointer"
              >
                Register Here!
              </p>
            </div>
            <button
              onClick={login}
              className="mt-2 w-full font-semibold rounded-2xl px-2 py-2 text-white bg-theme"
            >
              Login in
            </button>
          </form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
