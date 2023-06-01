import {ProductCard, Section} from '~/components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
})

 {
  const newCardData=products.filter((d)=>{
    return(d.variants.nodes[0].quantityAvailable!=0)
  })
   console.log('looking for this',newCardData)
  const settings = {
    centerMode: true,
    speed: 500,
    infinite: true,
    className:"brands",
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    // <Section className="text-white" heading={title}>
       <div > 
        <h3 className="text-white">{title}</h3>
      <Slider {...settings}>
        {newCardData.map((product) => (
        
        <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
        </Slider> 
       </div> 
    // </Section>
  );
}
