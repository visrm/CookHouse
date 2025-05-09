const HomeCarousel = () => {
  return (
    <>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full h-96">
          <img src="/assets/vibrant-food.webp" className="w-full object-cover aspect-[16/9]" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle btn-lg">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-lg">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full h-96">
          <img src="/assets/fun-in-kitchen.webp" className="w-full object-cover aspect-[16/9]" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle btn-lg">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle btn-lg">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full h-96">
          <img src="/assets/people-chatting.webp" className="w-full object-cover aspect-[16/9]" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle btn-lg">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle btn-lg">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCarousel;
