import React from "react";
import background from "../assets/background.png";
import Navbar from "./Navbar";
<<<<<<< HEAD
import DemoPage from "./Home"; //Page 2
import Demo from "./Demo1"; //page 4
import Pagemap from "./Pagemap"; //page3
=======
import DemoPage from "./Page2"; //Page 2
import Demo from "./Page4"; //page 4
import Pagemap from "./Page3"; //page3
import Footer from "./Footer";
>>>>>>> 34fddd71c486d3faeff856d9eab33113c484ea7f

function Home() {
  return (
    <div className="overflow-hidden w-full">
      <div className="h-screen w-full overflow-hidden ">
        <div
          className="h-screen bg-cover bg-center backdrop-brightness-75"
          style={{ backgroundImage: `url(${background})` }}
        >
          <Navbar />
          <div className="relative flex items-center justify-center h-full bg-opacity-50">
            <div className=" absolute top-30 text-center">
              <h1 className="text-6xl font-bold mb-4  leading-14  drop-shadow-3xl ">
                Empowering Young Migrants
              </h1>
              <p className="mb-6 text-xl font-mono">
                Find opportunities & navigate your future
              </p>
              <a
                href="/login"
                className="bg-yellow-900 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
      <DemoPage />
      <Pagemap />
      <Demo />
      <Footer />
    </div>
  );
}

export default Home;
