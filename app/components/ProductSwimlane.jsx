import {ProductCard, Section} from '~/components';
import Slider from "react-slick";
const mockProducts = new Array(12).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
})
 {
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
    <Section className="text-white" heading={title} padding="y" {...props}>
      <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 pt-2 lg:scroll-px-12 md:px-8 lg:px-12">
      <Slider {...settings}>
        {products.map((product) => (
        
        <ProductCard
            product={product}
            key={product.id}
            className="snap-start w-80"
          />
        ))}
        </Slider> 
      </div>
    </Section>
  );
}
