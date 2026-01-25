import React from 'react'; // Optional in newer React versions (v17+)
import {Link} from 'react-router-dom'; 


const Intro = () => {
  // Component logic and state management (using hooks like useState, useEffect) go here
  return (
    <div className="Intro-container">
      <div >
        <p>Bla Bla Bla Something something. Bla Bla</p>
      </div>
      <nav>
        <Link to = "/computer">Continue</Link>
      </nav>
    </div>
  );
};

export default Intro;