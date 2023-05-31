import {redirect, json} from '@shopify/remix-oxygen';
import {Form, useActionData} from '@remix-run/react';
import {useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';
import {doLogin} from './($lang).account.login';
import {Link} from '~/components';

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');

  if (customerAccessToken) {
    return redirect(params.lang ? `${params.lang}/account` : '/account');
  }

  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const {session, storefront} = context;
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (
    !email ||
    !password ||
    !lastName ||
    !firstName ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof firstName !== 'string' ||
    typeof lastName !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide  email, firstName, lastName and a password.',
    });
  }

  try {
    const data = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password, firstName, lastName},
      },
    });

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '));
    }

    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);

    return redirect(params.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
    });
  }
};

export const meta = () => {
  return [{title: 'Register'}];
};

export default function Register() {
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);
  const [nativeLastNameError, setNativeLastNameError] = useState(null);
  const [nativeFirstNameError, setNativeFirstNameError] = useState(null);

  return (
    <div  className='Sign_up'>
    <div className="flex justify-center py-24 px-4 sign_up_banner">
      <div className="max-w-md w-full text-white">
        <h1 className="text-4xl">Create an Account.</h1>
        <p className='align-baseline text-sm my-3'>Fill out this short form below to create your account.</p>
        {/* TODO: Add onSubmit to validate _before_ submission with native? */}
        <Form
          method="post"
          noValidate
          className="pt-6 pb-8 mt-4 mb-4 space-y-3"
        >
          {actionData?.formError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{actionData.formError}</p>
            </div>
          )}
               <div>
                <label>Email</label>
            <input
              className={`my-2 rounded-[10px] ${getInputStyleClasses(nativeEmailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                setNativeEmailError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Invalid email address'
                    : null,
                );
              }}
            />
            {nativeEmailError && (
              <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
            )}
          </div>
          <div className='row_sign'>
              <div className='col'>
                <div className="">
                  <label>First Name</label>
                  <input
                    className={`my-2 rounded-[10px] ${getInputStyleClasses(nativeFirstNameError)} text-dark`}
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    placeholder="Enter First Name"
                    aria-label="Enter First Name"
                    autoFocus
                    onBlur={(event) => {
                      setNativeFirstNameError(
                        event.currentTarget.value.length &&
                          !event.currentTarget.validity.valid
                          ? 'Invalid First Name'
                          : null,
                      );
                    }}
                  />
              {nativeFirstNameError && (
              <p className="text-red-500 text-xs">{nativeFirstNameError} &nbsp;</p>
            )}
                </div>
              </div>
              <div className='col'>
                <div className="">
                  <label>Last Name</label>
                  <input
                    className={`my-2 rounded-[10px] ${getInputStyleClasses(nativeLastNameError)} text-dark`}
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    placeholder="Enter Last Name"
                    aria-label="Enter Last Name"
                    autoFocus
                    onBlur={(event) => {
                      setNativeLastNameError(
                        event.currentTarget.value.length &&
                          !event.currentTarget.validity.valid
                          ? 'Invalid Last Name'
                          : null,
                      );
                    }}
                  />
              {nativeLastNameError && (
              <p className="text-red-500 text-xs">{nativeLastNameError} &nbsp;</p>
            )}
                </div>
              </div>
            </div>
            
          <div>
          <label>Password</label>
            <input
              className={`my-2 rounded-[10px] ${getInputStyleClasses(nativePasswordError)}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              minLength={8}
              required
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                if (
                  event.currentTarget.validity.valid ||
                  !event.currentTarget.value.length
                ) {
                  setNativePasswordError(null);
                } else {
                  setNativePasswordError(
                    event.currentTarget.validity.valueMissing
                      ? 'Please enter a password'
                      : 'Passwords must be at least 8 characters',
                  );
                }
              }}
            />
            {nativePasswordError && (
              <p className="text-red-500 text-xs">
                {' '}
                {nativePasswordError} &nbsp;
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#f9f9f94d] border-[#f9f9f999] border-2 text-[#111827] rounded-[10px] py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
              disabled={!!(nativePasswordError || nativeEmailError || nativeFirstNameError || nativeLastNameError)}
            >
              Create Account
            </button>
          </div>
          <p className="align-baseline text-base">By proceeding, you agree to the <span className='underline'>Terms and Conditions</span>  and  <span className='underline'> Privacy Policy </span> </p>
          <div className="flex items-center mt-8 ">
            <p className="align-baseline text-base mt-6">
              Already have an account? &nbsp;
              <Link className="inline text-[#f9f9f9cc]" to="/account/login">
                Sign in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
}

const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
