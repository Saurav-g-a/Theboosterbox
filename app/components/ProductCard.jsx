import clsx from 'clsx';
import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {Text, Link, AddToCartButton} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import carts from "../../public/carts.png";
export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}) {
  let cardLabel;
console.log(product.priceRange.maxVariantPrice.amount)
  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const productAnalytics = {
    productGid: product.id,
    variantGid: firstVariant.id,
    name: product.title,
    variantName: firstVariant.title,
    brand: product.vendor,
    price: firstVariant.price.amount,
    quantity: 1,
  };

  return (
    <>
    {
      product.variants.nodes[0].quantityAvailable!=0  &&(
        <div className="flex flex-col gap-2">
        <Link
          onClick={onClick}
          to={`/products/${product.handle}`}
          prefetch="intent"
        >
          <div className={clsx('grid gap-4 ', className)}>
            <div className="card-image aspect-[4/5] rounded-bold border-4 relative transition duration-700 ease-in-out hover:scale-105 border-[#f9f9f91a] hover:border-white ">
              {image && (
                <Image
                  className="object-fill w-full fadeIn "
                  sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                  aspectRatio="4/5"
                  data={image}
                  alt={image.altText || `Picture of ${product.title}`}
                  loading={loading}
                />
              )}
             
              <Text
                as="label"
                size="fine"
                className="absolute text-white top-0 right-0 m-4 text-right text-notice "
              >
                {cardLabel}
              </Text>
              <div className='flex text-white justify-between py-3 px-4 productdetailss'>
                <div className='cursor-pointer'>
                  <p className='text-[15px] font-semibold	'>QTY:{product.variants.nodes[0].quantityAvailable}</p>
                </div>
                <div className='cursor-pointer'>
                  <p className='text-[15px] font-semibold	'>BUY NOW:  {
        product.priceRange.maxVariantPrice.amount.slice(product.priceRange.maxVariantPrice.amount.indexOf('.')).length ==2 ? (
           <>
          $ { product.priceRange.maxVariantPrice.amount + '0'}
           </>
        ):(
          <> $ {product.priceRange.maxVariantPrice.amount}
        </>
        )
       }</p>
                </div>
                <div className='cursor-pointer'>
                  <img src={carts} className=""/>
                </div>
              </div>
            </div>
            
            <div className="grid gap-1">
              <Text
                className="w-full text-white overflow-hidden whitespace-nowrap text-ellipsis "
                as="h3"
              >
                {product.title}
              </Text>
              <div className="flex gap-4">
                <Text className="flex gap-4 text-white">
                  <Money withoutTrailingZeros data={price} />
                  {isDiscounted(price, compareAtPrice) && (
                    <CompareAtPrice
                      className={'opacity-50'}
                      data={compareAtPrice}
                    />
                  )}
                </Text>
              </div>
            </div>
          </div>
        </Link>
        {quickAdd && (
          <AddToCartButton
            lines={[
              {
                quantity: 1,
                merchandiseId: firstVariant.id,
              },
            ]}
            variant="secondary"
            className="mt-2 border-2 border-white bg-transparent py-2 hover:bg-white hover:text-black rounded-[10px]"
            analytics={{
              products: [productAnalytics],
              totalValue: parseFloat(productAnalytics.price),
            }}
          >
            <Text as="span" className="flex items-center justify-center gap-2">
              Add to Bag
            </Text>
          </AddToCartButton>
        )}
      </div>
      )

    }
    </>

  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
