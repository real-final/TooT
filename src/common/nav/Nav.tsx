import { useIsSignedIn } from "../../hooks/useIsSignedIn";

import logo_dark from "./../../assets/images/logo/logo_dark.png";
import LogoutButton from "./LogoutButton";

const Nav: React.FC = () => {
  let isSigned = useIsSignedIn();

  return (
    <div className="w-full h-16 flex justify-between items-center bg-main px-6">
      <a href="/">
        <img src={logo_dark} alt="logo_dark" width={80} />
      </a>
      {isSigned && <LogoutButton />}
    </div>
  );
};

export default Nav;
