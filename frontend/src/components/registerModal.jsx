import React from "react";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from '../urls';

const RegisterModal = ({
  show,
  onHide,
  setLoginModalShow,
  setRegisterModalShow,
}) => {
  const [user, setUser] = React.useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async () => {
    const { fullName, username, email, password, rePassword } = user;
    if (!fullName || !username || !email || !password || !rePassword || password !== rePassword) {
      return alert("Please fill in all the fields");
    }
  
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (!response.ok) {
        const data = await response.json();
        if (data.error) {
          return alert("Registration failed");
        }
      }
      alert("Registered Successfully");
      setLoginModalShow(true);
      setRegisterModalShow(false);
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('Fetch Error: ' + error.message);
    }
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
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
        <h1 className="text-2xl font-medium cursor-pointer" onClick={onHide}>
          X
        </h1>
      </Modal.Header>
      <Modal.Body>
        <section className="flex flex-col gap-2 items-center">
          <input
            className="border rounded-xl px-3 py-3 mt-1 outline-none"
            placeholder="Enter Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            type="text"
          />
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
            placeholder="Enter Email"
            name="email"
            value={user.email}
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
          <input
            className="border rounded-xl px-3 py-3 mt-1 outline-none"
            placeholder="Re-Enter Password"
            name="rePassword"
            value={user.rePassword}
            onChange={handleChange}
            type="password"
          />
          <div className="flex gap-2 my-3">
            <p>Already have an account? </p>
            <p
              onClick={() => {
                setLoginModalShow(true);
                setRegisterModalShow(false);
              }}
              className="text-theme hover:underline cursor-pointer"
            >
              Login Here!
            </p>
          </div>
          <button
            onClick={register}
            className="mt-2 w-full font-semibold rounded-2xl px-2 py-2 text-white bg-theme"
          >
            Register
          </button>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
