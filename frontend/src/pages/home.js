import { useState } from "react"
import Header from "../components/header"
import Hero from "../components/hero"
import LoginModal from "../components/loginModal"
import RegisterModal from "../components/registerModal"

const Home = () => {
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  return (
    <div className="home">
      <Header setLoginModalShow={setLoginModalShow} />
      <Hero setRegisterModalShow={setRegisterModalShow}/>
      <LoginModal show={loginModalShow} onHide={() => setLoginModalShow(false)} setLoginModalShow={setLoginModalShow} setRegisterModalShow={setRegisterModalShow}/>
      <RegisterModal show={registerModalShow} onHide={() => setRegisterModalShow(false)} setLoginModalShow={setLoginModalShow} setRegisterModalShow={setRegisterModalShow}/>
    </div>
  )
}

export default Home