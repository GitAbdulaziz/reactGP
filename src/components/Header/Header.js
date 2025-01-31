import React, { useEffect } from 'react';
import '../../styles/Header.css'
const Header = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css?family=Anonymous+Pro|Lateef:wght@200;400&display=swap';
    document.head.appendChild(link);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <header>
      <div className="line-1 anim-typewriter">اترك التخمين جانباَ ، ودع البيانات الحيه تقودك إلى النجاح</div>
    </header>
  );
};

export default Header;
