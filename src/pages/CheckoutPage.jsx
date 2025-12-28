import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
    const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
    const navigate = useNavigate()

    const [step, setStep] = useState(1) // 1: Review, 2: Shipping, 3: Payment
    const [isProcessing, setIsProcessing] = useState(false)
    const [orderComplete, setOrderComplete] = useState(false)

    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        country: 'France',
        postalCode: '',
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    })

    const shipping = subtotal > 150 ? 0 : 15
    const total = subtotal + shipping

    const handleShippingChange = (e) => {
        setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handlePaymentChange = (e) => {
        let value = e.target.value

        // Format card number with spaces
        if (e.target.name === 'cardNumber') {
            value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
        }
        // Format expiry
        if (e.target.name === 'expiry') {
            value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
        }

        setPaymentInfo(prev => ({ ...prev, [e.target.name]: value }))
    }

    const handlePlaceOrder = async () => {
        setIsProcessing(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsProcessing(false)
        setOrderComplete(true)
        clearCart()
    }

    // Empty cart view
    if (items.length === 0 && !orderComplete) {
        return (
            <div className="min-h-screen bg-[var(--color-sand-light)] pt-32 pb-20">
                <div className="container-luxury text-center">
                    <div className="max-w-md mx-auto">
                        <svg className="w-20 h-20 mx-auto mb-6 text-[var(--color-gray)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h1 className="font-heading text-3xl text-[var(--color-navy)] mb-4">Your Bag is Empty</h1>
                        <p className="font-body text-[var(--color-gray)] mb-8">
                            Discover our collection of luxury swimwear designed for the modern woman.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block px-10 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Order complete view
    if (orderComplete) {
        return (
            <div className="min-h-screen bg-[var(--color-sand-light)] pt-32 pb-20">
                <div className="container-luxury text-center">
                    <div className="max-w-lg mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="font-heading text-4xl text-[var(--color-navy)] mb-4">Thank You!</h1>
                        <p className="font-body text-lg text-[var(--color-gray)] mb-2">
                            Your order has been placed successfully.
                        </p>
                        <p className="font-body text-[var(--color-gray)] mb-8">
                            Confirmation sent to <span className="text-[var(--color-navy)]">{shippingInfo.email || 'your email'}</span>
                        </p>
                        <p className="font-body text-sm text-[var(--color-gray)] mb-8 px-6 py-4 bg-white rounded-xl">
                            Order #ST-{Date.now().toString().slice(-8)}<br />
                            Estimated delivery: 3-5 business days
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block px-10 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--color-sand-light)] pt-28 pb-20">
            <div className="container-luxury">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl text-[var(--color-navy)] mb-4">Checkout</h1>
                    <p className="font-body text-[var(--color-gray)]">Secure checkout powered by Stripe</p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4">
                        {[
                            { num: 1, label: 'Review' },
                            { num: 2, label: 'Shipping' },
                            { num: 3, label: 'Payment' },
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <button
                                    onClick={() => s.num < step && setStep(s.num)}
                                    className={`flex items-center gap-2 ${s.num <= step ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-body text-sm transition-all ${step === s.num
                                            ? 'bg-[var(--color-navy)] text-white'
                                            : step > s.num
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-white text-[var(--color-gray)] border border-[var(--color-sand)]'
                                        }`}>
                                        {step > s.num ? (
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : s.num}
                                    </div>
                                    <span className={`font-body text-sm hidden sm:block ${step >= s.num ? 'text-[var(--color-navy)]' : 'text-[var(--color-gray)]'
                                        }`}>
                                        {s.label}
                                    </span>
                                </button>
                                {i < 2 && (
                                    <div className={`w-12 h-0.5 mx-2 ${step > s.num ? 'bg-emerald-500' : 'bg-[var(--color-sand)]'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Step 1: Review Cart */}
                        {step === 1 && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="font-heading text-2xl text-[var(--color-navy)] mb-6">Review Your Order</h2>

                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-6 pb-6 border-b border-[var(--color-sand)] last:border-0 last:pb-0">
                                            <div className="w-24 h-32 bg-[var(--color-sand-light)] rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-2">
                                                    <h3 className="font-heading text-lg text-[var(--color-navy)]">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-[var(--color-gray)] hover:text-[var(--color-terracotta)] transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="font-body text-sm text-[var(--color-gray)] mb-1">
                                                    {item.color.name} / {item.size}
                                                </p>
                                                <p className="font-body text-[var(--color-navy)] mb-4">
                                                    €{item.price}
                                                </p>
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center border border-[var(--color-sand)] rounded-lg hover:bg-[var(--color-sand-light)] transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="font-body text-[var(--color-navy)] w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center border border-[var(--color-sand)] rounded-lg hover:bg-[var(--color-sand-light)] transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full mt-8 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all rounded-lg"
                                >
                                    Continue to Shipping
                                </button>
                            </div>
                        )}

                        {/* Step 2: Shipping */}
                        {step === 2 && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="font-heading text-2xl text-[var(--color-navy)] mb-6">Shipping Information</h2>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={shippingInfo.firstName}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={shippingInfo.lastName}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingInfo.email}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingInfo.phone}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={shippingInfo.address}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Apartment, suite, etc.</label>
                                        <input
                                            type="text"
                                            name="apartment"
                                            value={shippingInfo.apartment}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Postal Code *</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingInfo.postalCode}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Country *</label>
                                        <select
                                            name="country"
                                            value={shippingInfo.country}
                                            onChange={handleShippingChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors bg-white"
                                        >
                                            <option>France</option>
                                            <option>United Kingdom</option>
                                            <option>Germany</option>
                                            <option>Italy</option>
                                            <option>Spain</option>
                                            <option>United States</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="px-8 py-4 border border-[var(--color-navy)] text-[var(--color-navy)] font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy)] hover:text-white transition-all rounded-lg"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex-1 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all rounded-lg"
                                    >
                                        Continue to Payment
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Payment */}
                        {step === 3 && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h2 className="font-heading text-2xl text-[var(--color-navy)] mb-6">Payment Details</h2>

                                {/* Card Preview */}
                                <div className="bg-gradient-to-br from-[var(--color-navy)] to-[#2a3d5f] rounded-xl p-6 mb-8 text-white">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-12 h-8 bg-gradient-to-br from-amber-200 to-amber-400 rounded opacity-80" />
                                        <svg className="w-10 h-10 opacity-80" viewBox="0 0 48 48" fill="currentColor">
                                            <circle cx="17" cy="24" r="12" fillOpacity="0.8" />
                                            <circle cx="31" cy="24" r="12" fillOpacity="0.6" />
                                        </svg>
                                    </div>
                                    <p className="font-mono text-xl tracking-widest mb-4">
                                        {paymentInfo.cardNumber || '•••• •••• •••• ••••'}
                                    </p>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-xs opacity-60 mb-1">Card Holder</p>
                                            <p className="font-body text-sm">{paymentInfo.cardName || 'YOUR NAME'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs opacity-60 mb-1">Expires</p>
                                            <p className="font-body text-sm">{paymentInfo.expiry || 'MM/YY'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Card Number *</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentInfo.cardNumber}
                                            onChange={handlePaymentChange}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength={19}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Name on Card *</label>
                                        <input
                                            type="text"
                                            name="cardName"
                                            value={paymentInfo.cardName}
                                            onChange={handlePaymentChange}
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block font-body text-sm text-[var(--color-navy)] mb-2">Expiry *</label>
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={paymentInfo.expiry}
                                                onChange={handlePaymentChange}
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-body text-sm text-[var(--color-navy)] mb-2">CVV *</label>
                                            <input
                                                type="password"
                                                name="cvv"
                                                value={paymentInfo.cvv}
                                                onChange={handlePaymentChange}
                                                placeholder="•••"
                                                maxLength={4}
                                                className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="px-8 py-4 border border-[var(--color-navy)] text-[var(--color-navy)] font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy)] hover:text-white transition-all rounded-lg"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                        className="flex-1 py-4 bg-[var(--color-terracotta)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[#b5634d] transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            `Place Order • €${total.toFixed(2)}`
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
                            <h3 className="font-heading text-xl text-[var(--color-navy)] mb-6">Order Summary</h3>

                            {/* Mini Cart Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="w-16 h-20 bg-[var(--color-sand-light)] rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-body text-sm text-[var(--color-navy)] truncate">{item.name}</p>
                                            <p className="font-body text-xs text-[var(--color-gray)]">
                                                {item.color.name} / {item.size} × {item.quantity}
                                            </p>
                                            <p className="font-body text-sm text-[var(--color-navy)] mt-1">
                                                €{(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[var(--color-sand)] pt-4 space-y-3">
                                <div className="flex justify-between font-body text-sm">
                                    <span className="text-[var(--color-gray)]">Subtotal</span>
                                    <span className="text-[var(--color-navy)]">€{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-body text-sm">
                                    <span className="text-[var(--color-gray)]">Shipping</span>
                                    <span className={shipping === 0 ? 'text-emerald-600' : 'text-[var(--color-navy)]'}>
                                        {shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="font-body text-xs text-[var(--color-gray)]">
                                        Free shipping on orders over €150
                                    </p>
                                )}
                                <div className="flex justify-between font-heading text-lg pt-3 border-t border-[var(--color-sand)]">
                                    <span className="text-[var(--color-navy)]">Total</span>
                                    <span className="text-[var(--color-navy)]">€{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-[var(--color-sand)]">
                                <div className="flex items-center gap-2 text-[var(--color-gray)] mb-3">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="font-body text-xs">Secure SSL Encryption</span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--color-gray)] mb-3">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    <span className="font-body text-xs">All Major Cards Accepted</span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--color-gray)]">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-body text-xs">30-Day Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
