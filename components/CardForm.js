import React from 'react'
import { 
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from 'react-stripe-elements'

const CardForm = ({ onSubmit }) => {
  const cardRef = React.useRef()
  const expiryRef = React.useRef()
  const cvcRef = React.useRef()

  const handleSubmit = ev => {
    ev.preventDefault()
    onSubmit(cardRef.current)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <CardNumberElement onReady={ref => { cardRef.current = ref }} showIcon />
      </div>
      <div className="field">
        <CardExpiryElement onReady={ref => { expiryRef.current = ref }} />
      </div>
      <div className="field">
        <CardCVCElement onReady={ref => { cvcRef.current = ref }} />
      </div>
      <button type="submit">Pay</button>
      <style jsx>{`
        .field {
          margin: 1rem 0;
          background-color: #fefefe;
        }
      `}</style>
    </form>
  )
}

export default injectStripe(CardForm)
