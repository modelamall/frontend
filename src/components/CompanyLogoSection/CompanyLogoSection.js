const CompanyLogoSection = () => {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/OPPO_logo.svg/1146px-OPPO_logo.svg.png"
            alt="Oppo"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://upload.wikimedia.org/wikipedia/commons/4/45/LC_Waikiki_logo.PNG"
            alt="LCWaikiki"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Media_Markt_logo.svg"
            alt="Media MArkt"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            src="https://www.clipartmax.com/png/full/63-632134_vatan-bilgisayar-logo-vatan-bilgisayar.png"
            alt="Vatan Bilgisayar"
            width={158}
            height={48}
          />
          <img
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            src="https://happyplacetowork.com.tr/wp-content/uploads/2022/06/Boyner-Logo.png"
            alt="Boyner"
            width={158}
            height={48}
          />
        </div>
        <div className="mt-16 flex justify-center">
          <p className="relative rounded-full bg-gray-800 px-4 py-1.5 text-sm leading-6 text-gray-300">
            <span className="hidden md:inline">
              Over 2500 companies use our tools to better their business.
            </span>
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoSection;
