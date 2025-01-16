import React from 'react';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

const sdgFacts = {
  1: [
    "SDG 1 aims to end poverty in all forms everywhere.",
    "By 2030, reduce at least by half the proportion of people living in poverty.",
    "Implement social protection systems and measures for all, including floors, and achieve substantial coverage of the poor and vulnerable.",
    "Ensure equal rights to economic resources, as well as access to basic services, ownership, and control over land and other forms of property.",
  ],
  2: [
    "SDG 2 aims to end hunger, achieve food security, and promote sustainable agriculture.",
    "By 2030, ensure access to safe, nutritious, and sufficient food for all.",
    "End all forms of malnutrition, including addressing the nutritional needs of adolescent girls, pregnant and lactating women, and older persons.",
    "Double the agricultural productivity and incomes of small-scale food producers, particularly women, indigenous peoples, and family farmers.",
  ],
  3: [
    "SDG 3 aims to ensure healthy lives and promote well-being for all at all ages.",
    "By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births.",
    "End epidemics of AIDS, tuberculosis, malaria, and neglected tropical diseases.",
    "Reduce premature mortality from non-communicable diseases through prevention, treatment, and mental health promotion.",
  ],
  4: [
    "SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    "By 2030, ensure all girls and boys complete free, equitable, and quality primary and secondary education.",
    "Increase the number of youth and adults with relevant skills for employment, decent jobs, and entrepreneurship.",
    "Eliminate gender disparities in education and ensure equal access to all levels of education for vulnerable populations.",
  ],
  5: [
    "SDG 5 aims to achieve gender equality and empower all women and girls.",
    "End all forms of discrimination against women and girls everywhere.",
    "Eliminate all forms of violence against women and girls, including trafficking and sexual exploitation.",
    "Ensure women’s full and effective participation and equal opportunities for leadership at all decision-making levels.",
  ],
  6: [
    "SDG 6 aims to ensure availability and sustainable management of water and sanitation for all.",
    "By 2030, achieve universal and equitable access to safe and affordable drinking water.",
    "Improve water quality by reducing pollution, eliminating dumping, and minimizing the release of hazardous chemicals and materials.",
    "Substantially increase water-use efficiency across all sectors and ensure sustainable freshwater withdrawals.",
  ],
};


function Learn() {
  const { sdgId } = useParams();
  const facts = sdgFacts[sdgId] || [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToSDGGame = () => {
    navigate(`/games/SDGGame/${sdgId}`); // Navigates to SDGGame page
  };

  return (
    <div className="learn-container">
      <div className="top-nav">
        <button onClick={goBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <div className="nav-buttons-right">
          <button onClick={goToProfile} className="nav-button">
            <FaUser /> Profile
          </button>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <div className='horizontal-line'></div>
      <h2>Learn About SDG {sdgId}</h2>
      <div className="facts-container">
        {facts.map((fact, index) => (
          <div key={index} className="fact-card">
            <p>{fact}</p>
          </div>
        ))}
      </div>
      <button className="next-button" onClick={goToSDGGame}>
        Next: Start Game
      </button>
      <div className='horizontal-lines'></div>
      <div className="footer">
        <p>Sustainability Awareness Gaming App</p>
        <p>University of Johannesburg</p>
        <p>2024</p>
      </div>
    </div>
  );
}

export default Learn;
