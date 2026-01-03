import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  Zap,
  Percent,
  Calendar,
  Copy,
  QrCode,
  Download,
  Share2,
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

interface VoucherFormData {
  amount: string;
  quantity: number;
  voucherType: string;
  recipientEmail?: string;
  recipientName?: string;
  message?: string;
  expiryDays?: number;
}

interface VoucherPreview {
  code: string;
  value: number;
  fee: number;
  total: number;
  expiryDate: string;
  codes?: string[];
}

type Errors = Record<string, string | null>;

const VoucherPurchase: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // // User balance data
  // const [userBalance, setUserBalance] = useState({
  //   available: 12500.75,
  //   currency: "USD",
  //   lastUpdated: "2024-03-20T10:30:00",
  // });

  // Voucher types
  const voucherTypes = [
    {
      id: "individual",
      name: "Individual Voucher",
      description: "For personal use and small transactions",
      minAmount: 100,
      maxAmount: 5000,
      icon: "👤",
      color: "bg-pink-50 border-pink-200",
      textColor: "text-pink-600",
    },
    {
      id: "business",
      name: "Business Voucher",
      description: "For business expenses and larger transactions",
      minAmount: 1000,
      maxAmount: 50000,
      icon: "💼",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-600",
    },
    {
      id: "cooperative",
      name: "Cooperative Voucher",
      description: "For cooperative or group purchases with shared funding",
      minAmount: 3000,
      maxAmount: 75000,
      icon: "🤝",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-600",
    },
    {
      id: "organization",
      name: "Organization Voucher",
      description: "For organizations and enterprise-level allocations",
      minAmount: 10000,
      maxAmount: 200000,
      icon: "🏢",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-600",
    },
  ];

  const [formData, setFormData] = useState<VoucherFormData>({
    amount: "",
    quantity: 1,
    voucherType: "",
    recipientEmail: "",
    recipientName: "",
    message: "",
    expiryDays: 30,
  });

  const [voucherPreview, setVoucherPreview] = useState<VoucherPreview>({
    code: "RULSAR-NEW-XXXX-XXXX",
    value: 0,
    fee: 0,
    total: 0,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });

  // Error state
  const [errors, setErrors] = useState<Errors>({});

  // Transaction steps
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const calculateFees = (amount: number) => {
    const fee = amount * 0.02;
    return {
      fee: Math.max(fee, 1),
      total: amount + fee,
    };
  };

  // Update voucher preview when amount changes
  useEffect(() => {
    if (formData.amount) {
      const amount = parseFloat(formData.amount);
      if (!isNaN(amount)) {
        const fees = calculateFees(amount);
        const expiryDate = new Date(
          Date.now() + formData.expiryDays * 24 * 60 * 60 * 1000
        );

        setVoucherPreview({
          ...voucherPreview,
          value: amount,
          fee: fees.fee,
          total: fees.total,
          expiryDate: expiryDate.toISOString().split("T")[0],
        });
      }
    }
  }, [formData.amount, formData.expiryDays]);

  // Handle form input changes
  const handleInputChange = (
    field: keyof VoucherFormData,
    value: string | number
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as any,
    }));

    // Clear error for this field
    if (errors[String(field)]) {
      setErrors((prev) => ({
        ...prev,
        [String(field)]: null,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    // const selectedType = voucherTypes.find(t => t.id === formData.voucherType);

    // Amount validation
    if (!formData.amount || formData.amount === "") {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount)) {
        newErrors.amount = "Invalid amount";
      } else if (amount < selectedType.minAmount) {
        newErrors.amount = `Minimum amount is ${selectedType.minAmount}`;
      } else if (amount > selectedType.maxAmount) {
        newErrors.amount = `Maximum amount is ${selectedType.maxAmount}`;
      } else if (amount > user?.usdtBalance!) {
        newErrors.amount = "Insufficient balance";
      }
    }

    // Quantity validation
    if (formData.quantity < 1 || formData.quantity > 10) {
      newErrors.quantity = "Quantity must be between 1 and 10";
    }

    // Email validation for recipient
    if (
      formData.recipientEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.recipientEmail)
    ) {
      newErrors.recipientEmail = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateForm()) {
      setCurrentStep(2);
    }
  };

  // Handle purchase
  const handlePurchase = async () => {
    setIsProcessing(true);

    // Simulate API call
    // setTimeout(() => {
    //   const txId = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    //   setTransactionId(txId);

    //   // Update user balance
    //   setUserBalance(prev => ({
    //     ...prev,
    //     available: prev.available - voucherPreview.total
    //   }));

    //   setIsProcessing(false);
    //   setTransactionComplete(true);

    //   // Generate voucher codes
    //   const voucherCodes = Array.from({ length: formData.quantity }, () =>
    //     `RULSAR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    //   );

    //   setVoucherPreview(prev => ({
    //     ...prev,
    //     code: voucherCodes[0],
    //     codes: voucherCodes
    //   }));
    // }, 2000);
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    navigate("/vouchers");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show success message (could be enhanced with toast)
    alert("Copied to clipboard!");
  };

  // Share voucher
  const shareVoucher = () => {
    if (navigator.share) {
      navigator.share({
        title: "Your Rulsar Voucher",
        text: `You've received a Rulsar voucher worth ${formatCurrency(
          voucherPreview.value
        )}!`,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto p-4 md:p-6"
    >
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Vouchers
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Purchase Voucher
            </h1>

            <p className="text-gray-600">
              Buy vouchers using your available balance
            </p>
          </div>

          {/* Balance Card */}
          <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-card p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(user?.usdtBalance!)}
                </p>
                <p className="text-xs text-gray-500">
                  Last updated:{" "}
                  {/* {new Date(userBalance.lastUpdated).toLocaleString()} */}
                </p>
              </div>

              <div className="ml-2 p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 1
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="font-semibold">1</span>
            </div>
            <div
              className={`h-1 w-24 ${
                currentStep >= 2 ? "bg-primary-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 2
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="font-semibold">2</span>
            </div>
            <div
              className={`h-1 w-24 ${
                currentStep >= 3 ? "bg-primary-600" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= 3
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="font-semibold">3</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 text-sm">
          <div
            className={`text-center ${
              currentStep >= 1
                ? "text-primary-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Configure Voucher
          </div>
          <div
            className={`text-center ${
              currentStep >= 2
                ? "text-primary-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Review & Confirm
          </div>
          <div
            className={`text-center ${
              currentStep >= 3
                ? "text-primary-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Configure Your Voucher
                </h2>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Voucher Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {voucherTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() =>
                          handleInputChange("voucherType", type.id)
                        }
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          formData.voucherType === type.id
                            ? `${type.color} ${type.textColor} border-current`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-2xl">{type.icon}</span>
                          <h3 className="font-semibold text-lg">{type.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {type.description}
                        </p>
                        {/* <div className="text-xs text-gray-500">
                          Amount range: {formatCurrency(type.minAmount)} -{" "}
                          {formatCurrency(type.maxAmount)}
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voucher Amount
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <DollarSign className="h-3 w-3 text-gray-400" />
                    </div>

                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      className={`pl-11 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors.amount ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter amount"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.amount}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Available balance: {formatCurrency(user?.usdtBalance!)}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        // const selectedType = voucherTypes.find(
                        //   (t) => t.id === formData.voucherType
                        // );
                        // handleInputChange(
                        //   "amount",
                        //   selectedType.minAmount.toString()
                        // );
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Use minimum
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Beneficiaries
                  </label>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "quantity",
                            Math.max(1, formData.quantity - 1)
                          )
                        }
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) =>
                          handleInputChange(
                            "quantity",
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-16 text-center py-3 border-0 focus:outline-none"
                        min="1"
                        max="10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "quantity",
                            Math.min(10, formData.quantity + 1)
                          )
                        }
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formData.quantity} voucher
                      {formData.quantity > 1 ? "s" : ""}
                    </div>
                  </div>
                  {errors.quantity && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNextStep}
                    disabled={!formData.amount}
                    className="px-6 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Review
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Review & Confirm
                </h2>

                {/* Order Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Voucher Type:</span>
                      <span className="font-medium">
                        {
                          voucherTypes.find(
                            (t) => t.id === formData.voucherType
                          )?.name
                        }
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Voucher Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(voucherPreview.value)}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{formData.quantity}</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">
                        Processing Fee (2%):
                      </span>
                      <span className="font-medium">
                        {formatCurrency(voucherPreview.fee)}
                      </span>
                    </div>

                    <div className="flex justify-between py-2 border-t border-gray-200 pt-4">
                      <span className="text-lg font-semibold text-gray-900">
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold text-primary-600">
                        {formatCurrency(voucherPreview.total)}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Validity:</span>
                      <span className="font-medium">
                        {formatDate(voucherPreview.expiryDate)}
                      </span>
                    </div>

                    {formData.recipientName && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Recipient:</span>
                        <span className="font-medium">
                          {formData.recipientName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Balance Check */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Balance</p>
                      <p className="text-xl font-bold text-gray-900">
                        {formatCurrency(user?.usdtBalance!)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">After Purchase</p>
                      <p
                        className={`text-xl font-bold ${
                          user?.usdtBalance! - voucherPreview.total >= 0
                            ? "text-gray-900"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(
                          user?.usdtBalance! - voucherPreview.total
                        )}
                      </p>
                    </div>
                  </div>

                  {user?.usdtBalance! - voucherPreview.total < 0 && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm font-medium">
                          Insufficient balance. Please reduce the voucher
                          amount.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="mb-6">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the Voucher Terms and Conditions. I understand
                      that vouchers are non-refundable and can only be used
                      within their validity period.
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePurchase}
                    disabled={
                      user?.usdtBalance! - voucherPreview.total < 0 ||
                      isProcessing
                    }
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Confirm Purchase
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-card shadow-card p-6"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Purchase Successful!
                  </h2>

                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Your voucher has been created successfully and funded from
                    your balance.
                  </p>

                  <div className="max-w-md mx-auto mb-8">
                    <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 bg-gradient-to-r from-primary-50 to-blue-50">
                      <div className="text-center mb-4">
                        <Gift className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-gray-900">
                          Rulsar Voucher
                        </h3>
                      </div>

                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {formatCurrency(voucherPreview.value)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Valid until {formatDate(voucherPreview.expiryDate)}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="font-mono text-center bg-white py-3 px-4 rounded-lg border border-gray-300 mb-3">
                          {voucherPreview.code}
                        </div>
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => copyToClipboard(voucherPreview.code)}
                            className="px-4 py-2 text-primary-600 bg-white border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
                          >
                            <Copy className="h-4 w-4" />
                            Copy Code
                          </button>
                          <button
                            onClick={shareVoucher}
                            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                          >
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                      </div>

                      {formData.quantity > 1 && voucherPreview.codes && (
                        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Multiple vouchers ({formData.quantity}) have been
                            created
                          </p>
                          <button
                            onClick={() =>
                              alert(
                                "Download feature would generate a CSV file with all voucher codes"
                              )
                            }
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download all codes (CSV)
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Transaction Details */}
                  <div className="max-w-md mx-auto mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Transaction Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction ID:</span>
                          <span className="font-mono font-medium">
                            {transactionId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>{new Date().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium">
                            {formatCurrency(voucherPreview.total)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Balance:</span>
                          <span className="font-medium">
                            {formatCurrency(user?.usdtBalance!)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleBackToDashboard}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      View All Vouchers
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setFormData({
                          voucherType: "personal",
                          amount: "",
                          quantity: 1,
                          recipientEmail: "",
                          recipientName: "",
                          message: "",
                          expiryDays: 30,
                        });
                        setTransactionComplete(false);
                      }}
                      className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Buy Another Voucher
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* <div>
          <div className="sticky top-6">
            <div className="bg-white rounded-card shadow-card p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Voucher Benefits
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Instant Delivery
                    </h4>
                    <p className="text-sm text-gray-600">
                      Receive your voucher code immediately after purchase
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Secure & Safe</h4>
                    <p className="text-sm text-gray-600">
                      Protected by our security system and fraud detection
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Percent className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Low Fees</h4>
                    <p className="text-sm text-gray-600">
                      Only 2% processing fee, no hidden charges
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Flexible Validity
                    </h4>
                    <p className="text-sm text-gray-600">
                      Choose validity period from 7 days to 1 year
                    </p>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                <h3 className="font-semibold text-yellow-800">
                  Important Notes
                </h3>
              </div>

              <ul className="space-y-3 text-sm text-yellow-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>
                    Vouchers are non-refundable and cannot be converted to cash
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Each voucher can be used only once</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Expired vouchers cannot be extended or refunded</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Keep your voucher codes secure and confidential</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>
                    Contact support for any issues with voucher redemption
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </motion.div>
  );
};

export default VoucherPurchase;
