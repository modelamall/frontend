const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white bg-[url('https://tailwindui.com/img/beams-basic-transparent.png')]">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-[#701cdb] sm:text-6xl">
              ModeLaMall
            </h1>
            <p className="my-20  text-xl text-gray-500">
              Turn on your shopping MODE!!
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://www.apple.com/v/home/ay/images/promos/apple-watch-series-8/promo_apple_watch_series_8__ch7rexplmihe_medium_2x.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://cdn.dsmcdn.com/ty669/product/media/images/20221230/12/249293074/611837471/1/1_org_zoom.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://cdn.dsmcdn.com/ty591/product/media/images/20221107/11/209182611/56236727/2/2_org_zoom.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                    </div>
                    <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://www.apple.com/v/home/ay/images/promos/ipad/promo_ipad__fioegapg12qi_medium_2x.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          src="https://www.apple.com/v/home/ay/images/promos/macbook-pro-14-and-16/promo_mbp__ek7p477bkp6q_medium_2x.jpg"
                          alt=""
                          className="h-full w-full object-cover object-center animate-pulse"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                href="#"
                className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700 "
              >
                Browse All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
