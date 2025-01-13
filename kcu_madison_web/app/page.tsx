'use client';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 파란색 제목 배경 섹션 */}
      <div className="text-white text-left py-12 px-8 flex items-center space-x-8"
        style={{ backgroundColor: 'rgb(43, 53, 255)' }}
      >

        {/* 로고 이미지 */}
        <img
          src="/images/logo_uw.jpeg"
          alt="KCU Logo"
          className="object-cover"
          style={{ width: '300px', height: '300px', marginLeft: '100px' }}
        />
        {/* 텍스트 이미지 */}
        <img
          src="/images/home_title.jpeg"
          alt="KCU 2025 Text"
          className="object-contain"
          style={{ width: '800px', height: '200px' }}
        />
      </div>

      {/* 사진 섹션 */}
      <div className="relative w-full overflow-hidden my-16 px-4">
        <div className="flex animate-slide space-x-4">
          <img src="/images/image1.jpg" alt="Image 1" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image2.jpeg" alt="Image 2" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image3.jpg" alt="Image 3" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image4.jpg" alt="Image 4" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image5.jpeg" alt="Image 5" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image1.jpg" alt="Image 1 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image2.jpeg" alt="Image 2 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image3.jpg" alt="Image 3 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image4.jpg" alt="Image 4 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
          <img src="/images/image5.jpeg" alt="Image 5 Repeat" className="w-[320px] h-[192px] object-cover flex-shrink-0" />
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-slide {
          display: flex;
          animation: slide 30s linear infinite;
          width: calc(10 * 320px); /* 5개의 이미지 반복 포함 */
        }

        .relative {
          overflow: hidden;
        }

        .space-x-4 > * + * {
          margin-left: 2rem;
        }
      `}</style>
    </div>
  );
}


