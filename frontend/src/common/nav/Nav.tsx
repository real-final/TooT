import logo_dark from "./../../assets/images/logo/logo_dark.png";

const Nav: React.FC = () => {
  return (
    <div className="flex items-center w-full h-16 bg-main px-6">
      <a href="/">
        <img src={logo_dark} alt="logo_dark" width={90} />
      </a>
    </div>
  );
};

export default Nav;
