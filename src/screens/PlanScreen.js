import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { subscribe } from '../features/subscriptionSlice'
import db from '../firebase'
import { stripePublicKey } from '../stripe'
import './PlanScreen.css'

function PlanScreen() {
  const user = useSelector(selectUser)
  const [subscription, setSubscription] = useState([])
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (subscribe) {
      dispatch(subscribe({ ...subscription }))
    }

  }, [subscription, dispatch])

  useEffect(() => {
    return db.collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(subscription => {
          setSubscription({
            role: subscription.data().role,
            current_period_start: subscription.data().current_period_start.seconds,
            current_period_end: subscription.data().current_period_end.seconds,
          })
        })
      })
  }, [user])

  useEffect(() => {
    return db.collection('products')
      .where('active', '==', true)
      .get()
      .then(querySnapshot => {
        const products = {}
        querySnapshot.forEach(async productDoc => {
          products[productDoc.id] = productDoc.data()
          const priceSnap = await productDoc.ref.collection('prices').get()
          priceSnap.docs.forEach(price => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data()
            }
          })
        })
        setProducts(products)
      })
  }, [])

  const loadCheckout = async (priceId) => {
    const docRef = await db.collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      })

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data()

      if (error) {
        // Show anm error to your customer and
        // inspect your Cloud Function logs in Firebase console
        alert(`An error occured: ${error.message}`)
      }

      if (sessionId) {
        // We have a sessionId, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(stripePublicKey)
        stripe.redirectToCheckout({ sessionId })
      }
    })

  }

  return (
    <div className="planScreen">
      <br />
      {subscription.current_period_end && (
        <p>Renewal Date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData?.role === subscription.role;
        return (
          <div
            key={productId}
            className={`${isCurrentPackage && 'planScreen__plan--disabled'} planScreen__plan`}>
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlanScreen
