import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Elements, StripeProvider } from "react-stripe-elements"
import Axios from 'axios'

const Layout = dynamic(() => import('../../components/Layout'))
const CardForm = dynamic(() => import('../../components/CardForm'))

const STRIPE_TOKEN = 'pk_test_51HuebdAGirukYsQDMUE3Cr2Y72wU0YTXuFaDNpBuFmmPdWv55FiNBVIHCvRcV7xj0ptyCtluW5me8xQOc9ySTQpH00OLbrNfE9'

export default function Pay() {
  const router = useRouter()

  const [stripe, setStripe] = React.useState()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setStripe(window.Stripe(STRIPE_TOKEN))
  }, [])

  const handleSubmit = async (element) => {
    if (!stripe) {
      throw Error('There is no stripe instance!')
    }

    setLoading(true)

    const secretResult = await Axios.post('http://localhost:3001/payments/secret', {
      amount: 1500,
      cardType: 'card'
    })

    const { clientSecret } = secretResult.data

    const { paymentIntent, error } = await stripe.handleCardPayment(clientSecret, element);

    setLoading(false)

    if (paymentIntent) {
      router.push('/pay/success')
    } else if (error) {
      router.push(`/pay/fail?error=${error.message}`)
    }
  }

  if (!stripe) return null

  return (
    <Layout>
      {loading && (
        <div className="loader">
          Loading...
        </div>
      )}
      <StripeProvider stripe={stripe}>
        <Elements>
          <CardForm onSubmit={handleSubmit} />
        </Elements>
      </StripeProvider>
      <style jsx>{`
        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          font-size: 3rem;
          background-color: rgba(255, 255, 255, 0.75);
          z-index: 2;
        }
      `}</style>
    </Layout>
  )
}
