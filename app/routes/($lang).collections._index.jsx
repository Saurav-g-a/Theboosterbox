import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  Grid,
  Heading,
  PageHeader,
  Section,
  Link,
  Pagination,
  getPaginationVariables,
  Button,
} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {CACHE_SHORT, routeHeaders} from '~/data/cache';
import {Image} from '@shopify/hydrogen';

const PAGINATION_SIZE = 200;

export const headers = routeHeaders;

export const loader = async ({request, context: {storefront}}) => {
  const variables = getPaginationVariables(request, PAGINATION_SIZE);
  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  const seo = seoPayload.listCollections({
    collections,
    url: request.url,
  });

  return json(
    {collections, seo},
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
};

export default function Collections() {
  const {collections} = useLoaderData();

  const collections1  = collections.nodes.filter((d)=>{
    return d.title=="Battle Spirits Saga - SET PREORDERS" || d.title=="Digimon" || d.title=="Dragon Ball" || d.title=="Magic The Gathering" || d.title=="Pokemon" || d.title=="One Piece TCG Singles" || d.title=="Disney Lorcana"
  });
  collections1.push( 
  
  {
    
    "title": "Disney Lorcana",
    "description": "",
    "handle": "Disney Lorcana",
    "image": {
       "id": "gid://shopify/CollectionImage/1724093431988",
      // "src":"/assets/images/coming.png",
       "url": "http://localhost:3000/build/_assets/comming-N7B6CTJQ.jpg",
      "width": 687,
      "height": 350,
      "altText": null
   
    }
}
  )
  collections1.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return (
    <>
      <PageHeader className="text-white" heading="Collections" />
      <Section className='lg:py-3'>
        <Pagination connection={collections}>
          {({
            endCursor,
            hasNextPage,
            hasPreviousPage,
            nextPageUrl,
            nodes,
            prevPageUrl,
            startCursor,
            nextLinkRef,
            isLoading,
          }) => (
            <>
              {hasPreviousPage && (
                <div className="flex items-center justify-center mt-6">
                  <Button
                    to={prevPageUrl}
                    variant="secondary"
                    width="full"
                    prefetch="intent"
                    disabled={!isLoading}
                    state={{
                      pageInfo: {
                        endCursor,
                        hasNextPage,
                        startCursor,
                      },
                      nodes,
                    }}
                  >
                    {isLoading ? 'Loading...' : 'Previous products'}
                  </Button>
                </div>
              )}
              <Grid
                items={nodes.length === 3 ? 3 : 2}
                data-test="collection-grid"
              >
                {collections1.map((collection, i) => (
                  <CollectionCard
                    collection={collection}
                    key={collection.id}
                    loading={getImageLoadingPriority(i, 2)}
                  />
                ))}
              </Grid>
              {hasNextPage && (
                <div className="flex items-center justify-center mt-6">
                  <Button
                    ref={nextLinkRef}
                    to={nextPageUrl}
                    variant="secondary"
                    width="full"
                    prefetch="intent"
                    disabled={!isLoading}
                    state={{
                      pageInfo: {
                        endCursor,
                        hasPreviousPage,
                        startCursor,
                      },
                      nodes,
                    }}
                  >
                    {isLoading ? 'Loading...' : 'Next products'}
                  </Button>
                </div>
              )}
            </>
          )}
        </Pagination>
      </Section>
    </>
  );
}

function CollectionCard({collection, loading}) {
  return (
    <Link to={`/collections/${collection.handle}`} className="grid gap-4">
      <div className="card-image border-4 border-[#f9f9f91a] transition duration-700 ease-in-out hover:scale-105 rounded-bold  hover:border-white aspect-[3/2]">
        {collection?.image && (
          <Image
            data={collection.image}
            aspectRatio="6/4"
            sizes="(max-width: 32em) 100vw, 45vw"
            loading={loading}
          />
      
        )}
      </div>
      <Heading  className='text-white' as="h3" size="copy">
     {collection.title}
      </Heading>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        id
        title
        description
        handle
        seo {
          description
          title
        }
        image {
          id
          url
          width
          height
          altText
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
