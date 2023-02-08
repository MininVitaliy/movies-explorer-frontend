import React from 'react';
import Navigation from "../Navigation/Navigation";

function Header({registered, isMobile, openSidebar, sidebar, closeSidebar}) {

  return (
    <header className="header">
      <Navigation
        registered={registered}
        isMobile={isMobile}
        openSidebar={openSidebar}
        sidebar={sidebar}
        closeSidebar={closeSidebar}
      />
    </header>
  )
}

export default Header;