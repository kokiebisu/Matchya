import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <div className="flex space-x-8">
      <Link
        to="/assessments"
        className="text-sm font-bold text-black hover:text-matcha-300"
      >
        Assessments
      </Link>
      <Link
        to="/candidates"
        className="text-sm font-bold text-black hover:text-matcha-300"
      >
        Candidates
      </Link>
      <Link
        to="/interviews"
        className="text-sm font-bold text-black hover:text-matcha-300"
      >
        Interviews
      </Link>
    </div>
  );
};

export default MainNav;
