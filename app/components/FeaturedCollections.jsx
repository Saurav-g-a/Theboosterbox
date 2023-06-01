import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;
  const items = collections.filter((item) => item.image).length;

const filterData=collections.filter((item)=>{
  return item.handle=='digimon'|| item.handle=='swag' || item.handle=='dragon-ball'  || item.handle=='one-piece-tcg-romance-dawn'|| item.handle=='flesh-and-blood'
})

  return (
    <Section className="text-white" {...props} heading={title}>
      <Grid  items={items} className='px-[1.4rem]'>
        {filterData.map((collection) => {
          if (!collection?.image) {
            return null;
          }
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 aspect-[3/2] rounded-bold
                border-4 transition duration-700 ease-in-out hover:scale-105 border-[#f9f9f91a] hover:border-white">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      sizes="(max-width: 32em) 100vw, 33vw"
                      aspectRatio="3/2"
                    />
                  )}
                </div>
                {/* <Heading className='text-white' size="copy">{collection.title}</Heading> */}
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
