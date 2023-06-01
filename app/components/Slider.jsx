// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Link } from "@remix-run/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function Slider1({
  data,
  title = 'Collections',
  ...props
})
{
  const settings = {
    className:"cursor-pointer overflow-visible hover:border-opacity-80 mt-5 homeslide ",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    dots: true,
   
  };
  return (
    <section className=" mx-auto ">
        <Slider {...settings} >
       <div>
        <Link to={`/journal/${data.edges[0]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              
              src={data.edges[0]?.node?.image?.url}
              alt=""
            />
        </Link>
        </div>
       <div>
        <Link to={`/journal/${data.edges[1]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data.edges[1]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data.edges[2]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data.edges[2]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data.edges[3]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data.edges[3]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data.edges[4]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data.edges[4]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        </Slider>
    </section>
  );
}