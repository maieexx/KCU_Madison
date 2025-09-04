'use client';
import '../../globals.css';

export default function Footer() {
  return (
    <div className="
      relative 
      bottom-[10px]
      md:bottom-[30px]
      lg:bottom-[40px]
      xl:bottom-[50px]
      left-1/2 transform -translate-x-1/2 
      text-center z-10
    ">
      <p className="
        font-decor 
        text-[25px] sm:text-[25px] md:text-[25px] lg:text-[25px] xl:text-[30px]
        px-2
      ">
        © 25SP KCU Admins all rights reserved.
      </p>
    </div>
  );
}
