import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Zap, RefreshCw, CreditCard, Calendar, AlertTriangle } from "lucide-react";

export default function Subscriptions() {
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  const plan = {
    name: "Premium Monthly",
    price: "$9.99/month",
    features: [
      "Unlimited book access",
      "Priority customer support",
      "Exclusive content",
      "Offline reading",
      "Early access to new releases"
    ],
    renewalDate: "May 5, 2025",
    paymentMethod: "Visa •••• 4242",
    status: "active",
    nextBillingAmount: "$9.99"
  };

  const handleUpgrade = () => {
    // Upgrade logic here
    console.log("Upgrade initiated");
  };

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    setIsCancelling(true);
    // Simulate API call to cancel subscription
    setTimeout(() => {
      setIsCancelling(false);
      setShowCancelConfirm(false);
      alert("Subscription cancelled successfully");
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-8 border border-gray-100"
    >
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-3 rounded-xl mr-4">
          <Crown className="text-purple-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Subscription</h2>
          <p className="text-gray-500">Manage your reading membership</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Plan Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Zap className="text-yellow-500 mr-2" />
              {plan.name}
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {plan.status.toUpperCase()}
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <CreditCard className="w-5 h-5 mr-2 text-gray-400" />
              <span>{plan.paymentMethod}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-gray-400" />
              <span>Renews on <strong>{plan.renewalDate}</strong> for {plan.nextBillingAmount}</span>
            </div>
            
            <div className="pt-4">
              <h4 className="font-medium text-gray-800 mb-2">Plan Features:</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Usage This Month</h3>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Books Read</span>
                <span className="text-sm font-medium text-gray-700">3/10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Reading Time</span>
                <span className="text-sm font-medium text-gray-700">8h 45m</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Premium Features Used</span>
                <span className="text-sm font-medium text-gray-700">2/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpgrade}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Upgrade Plan
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCancel}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all"
        >
          <AlertTriangle className="w-5 h-5" />
          Cancel Subscription
        </motion.button>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cancel Subscription?</h3>
              <p className="text-gray-600 mb-6">
                You'll lose access to premium features immediately. We'd hate to see you go!
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Go Back
                </button>
                <button
                  onClick={confirmCancel}
                  disabled={isCancelling}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  {isCancelling ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Yes, Cancel"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}