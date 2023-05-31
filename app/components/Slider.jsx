// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Link } from "@remix-run/react";
import Slider from "react-slick";
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
    centerPadding: "60px",
    slidesToShow: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    slidesToScroll: 1,
    dots: true,
   
  };
  console.log('data',data)

  return (
    <section className=" mx-auto ">
        <Slider {...settings} >
        {/* <div>
        <Link to={`/journal/${data[0]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              
              src={data[0]?.node?.image?.url}
              alt=""
            />
        </Link>
        </div>
        <div>
        <Link to={`/journal/${data[1]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data[1]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data[2]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data[2]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data[3]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data[3]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div>
        <div>
        <Link to={`/journal/${data[4]?.node?.handle}`}>
            <img
              className="object-cover rounded-lg hover:border-opacity-80 border-[2px] border-[#f9f9f9] border-opacity-10"
              loading="lazy"
              src={data[4]?.node?.image?.url}
              alt=""
            />
          </Link>
        </div> */}
        </Slider>
    </section>
  );
}