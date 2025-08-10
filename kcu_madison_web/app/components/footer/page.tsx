'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';

export default function Footer() {
  return (
      <div className="absolute bottom-[100px] left-[855px] transform -translate-x-1/2 text-center">
        <p style={{ fontSize: '30px' }} className="font-decor">
          © 25SP KCU Admins all rights reserved.
        </p>
      </div>
  );
}