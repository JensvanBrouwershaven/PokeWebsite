import logo from '../img/logo.png';

const Nav = () => {
  return (
    <>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        /* --- NAVIGATION BAR --- */
        .pokeball-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #cc0000;
          height: 80px;
          padding: 0 40px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          color: white;
          font-weight: bold;
          z-index: 1000;
        }

        .nav-left img {
          height: 50px;
        }

        .nav-right {
          display: flex;
          gap: 30px;
        }

        .nav-right a {
          color: white;
          text-decoration: none;
          font-size: 16px;
        }

        .center-circle {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 6px solid black;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inner-circle {
          width: 28px;
          height: 28px;
          background: lightgray;
          border: 3px solid black;
          border-radius: 50%;
        }

        /* --- ZWARTE LIJNEN --- */
        .nav-border {
          height: 6px;
          background-color: black;
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          z-index: 999;
        }

        /* --- FOOTER --- */
        .footer {
          background-color: white;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          text-align: center;
          z-index: 1000;
        }

        .footer-line {
          height: 6px;
          background-color: black;
        }

        .footer-ball {
          width: 60px;
          height: 30px;
          background-color: black;
          border: 6px solid black;
          border-bottom-left-radius: 60px;
          border-bottom-right-radius: 60px;
          border-top: none;
          margin: 0 auto;
        }

        .footer-content {
          padding: 20px 40px 30px 40px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-content a {
          display: inline-block;
          margin-top: 10px;
          color: #333;
          text-decoration: none;
        }

        .footer-content a:hover {
          text-decoration: underline;
        }

        /* --- LEGE RUIMTE TUSSEN NAV EN FOOTER --- */
        .spacer {
          height: calc(100vh - 80px - 62px); /* 80px nav + 62px footer approx */
          background-color: #f9f9f9; /* of wat je maar wil */
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="pokeball-nav">
        <div className="nav-left">
          <img src={logo} alt="Logo" />
        </div>
        <div className="center-circle">
          <div className="inner-circle"></div>
        </div>
        <div className="nav-right">
          <a href="#">Kaarten</a>
          <a href="#">Profiel</a>
        </div>
      </nav>

      {/* --- ZWARTE LIJN ONDER NAV --- */}
      <div className="nav-border"></div>

      {/* --- LEGE RUIMTE TUSSEN NAV EN FOOTER --- */}
      <div className="spacer"></div>

      {/* --- FOOTER --- */}
      <div className="footer">
        <div className="footer-line"></div>
        <div className="footer-ball"></div>
        <div className="footer-content">
          <p>© 2025 PokéKaartjes</p>
          <a href="#">Veel gestelde vragen</a>
        </div>
      </div>
    </>
  );
};

export default Nav;
