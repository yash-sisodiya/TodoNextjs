import Header from "./../components/header";
import Layoutstyles from "../styles/Layout.module.scss";

function Layout({ children }: any) {
  return (
    <div className={Layoutstyles.wrapper}>
      {/* <Header /> */}
      <div className={Layoutstyles.child}>{children}</div>
    </div>
  );
}

export default Layout;
