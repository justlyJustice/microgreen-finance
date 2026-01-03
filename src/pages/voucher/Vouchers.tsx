import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Gift,
  TrendingUp,
  Download,
  RefreshCw,
} from "lucide-react";

// Mock data for vouchers
const initialVouchers = [
  {
    id: 1,
    voucherCode: "RULSAR-ABC123-XYZ789",
    value: 5000,
    currency: "NGN",
    purchaseDate: "2024-03-15",
    expiryDate: "2024-09-15",
    status: "Active",
    type: "Digital",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Adeola Johnson",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-001",
    remainingBalance: 5000,
    category: "Business",
  },
  {
    id: 2,
    voucherCode: "RULSAR-DEF456-GHI789",
    value: 10000,
    currency: "USD",
    purchaseDate: "2024-03-10",
    expiryDate: "2024-09-10",
    status: "Partially Used",
    type: "Physical",
    usedBy: "Green Agro Farms",
    usedDate: "2024-03-20",
    purchasedBy: "Chinedu Okonkwo",
    paymentMethod: "Credit Card",
    transactionId: "TX-2024-002",
    remainingBalance: 7500,
    category: "Personal",
  },
  {
    id: 3,
    voucherCode: "RULSAR-JKL012-MNO345",
    value: 2500,
    currency: "NGN",
    purchaseDate: "2024-03-05",
    expiryDate: "2024-09-05",
    status: "Expired",
    type: "Digital",
    usedBy: "Solar Power Solutions",
    usedDate: "2024-03-10",
    purchasedBy: "Fatima Ahmed",
    paymentMethod: "Mobile Money",
    transactionId: "TX-2024-003",
    remainingBalance: 0,
    category: "Business",
  },
  {
    id: 4,
    voucherCode: "RULSAR-PQR678-STU901",
    value: 15000,
    currency: "USD",
    purchaseDate: "2024-03-01",
    expiryDate: "2024-09-01",
    status: "Active",
    type: "Digital",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Emeka Nwosu",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-004",
    remainingBalance: 15000,
    category: "Corporate",
  },
  {
    id: 5,
    voucherCode: "RULSAR-VWX234-YZA567",
    value: 3000,
    currency: "NGN",
    purchaseDate: "2024-02-28",
    expiryDate: "2024-08-28",
    status: "Used",
    type: "Physical",
    usedBy: "Eco Packaging Ltd",
    usedDate: "2024-03-05",
    purchasedBy: "Grace Okafor",
    paymentMethod: "Credit Card",
    transactionId: "TX-2024-005",
    remainingBalance: 0,
    category: "Personal",
  },
  {
    id: 6,
    voucherCode: "RULSAR-BCD890-EFG123",
    value: 20000,
    currency: "USD",
    purchaseDate: "2024-02-25",
    expiryDate: "2024-08-25",
    status: "Active",
    type: "Digital",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Samuel Adeyemi",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-006",
    remainingBalance: 20000,
    category: "Corporate",
  },
  {
    id: 7,
    voucherCode: "RULSAR-HIJ456-KLM789",
    value: 7500,
    currency: "NGN",
    purchaseDate: "2024-02-20",
    expiryDate: "2024-08-20",
    status: "Partially Used",
    type: "Digital",
    usedBy: "Aqua Fresh Fisheries",
    usedDate: "2024-03-01",
    purchasedBy: "Bisi Adekunle",
    paymentMethod: "Mobile Money",
    transactionId: "TX-2024-007",
    remainingBalance: 2500,
    category: "Business",
  },
  {
    id: 8,
    voucherCode: "RULSAR-NOP012-QRS345",
    value: 12000,
    currency: "USD",
    purchaseDate: "2024-02-15",
    expiryDate: "2024-08-15",
    status: "Cancelled",
    type: "Physical",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Ibrahim Musa",
    paymentMethod: "Credit Card",
    transactionId: "TX-2024-008",
    remainingBalance: 12000,
    category: "Personal",
  },
  {
    id: 9,
    voucherCode: "RULSAR-TUV678-WXY901",
    value: 8000,
    currency: "NGN",
    purchaseDate: "2024-02-10",
    expiryDate: "2024-08-10",
    status: "Active",
    type: "Digital",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Chiamaka Nwankwo",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-009",
    remainingBalance: 8000,
    category: "Business",
  },
  {
    id: 10,
    voucherCode: "RULSAR-ZAB234-CDE567",
    value: 50000,
    currency: "USD",
    purchaseDate: "2024-02-05",
    expiryDate: "2024-08-05",
    status: "Active",
    type: "Digital",
    usedBy: null,
    usedDate: null,
    purchasedBy: "Tunde Lawal",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-010",
    remainingBalance: 50000,
    category: "Corporate",
  },
  {
    id: 11,
    voucherCode: "RULSAR-FGH890-IJK123",
    value: 4000,
    currency: "NGN",
    purchaseDate: "2024-02-01",
    expiryDate: "2024-08-01",
    status: "Used",
    type: "Physical",
    usedBy: "Organic Fertilizer Co.",
    usedDate: "2024-02-15",
    purchasedBy: "Adeola Johnson",
    paymentMethod: "Credit Card",
    transactionId: "TX-2024-011",
    remainingBalance: 0,
    category: "Business",
  },
  {
    id: 12,
    voucherCode: "RULSAR-LMN456-OPQ789",
    value: 18000,
    currency: "USD",
    purchaseDate: "2024-01-28",
    expiryDate: "2024-07-28",
    status: "Expired",
    type: "Digital",
    usedBy: "Clean Energy Ventures",
    usedDate: "2024-02-10",
    purchasedBy: "Chinedu Okonkwo",
    paymentMethod: "Bank Transfer",
    transactionId: "TX-2024-012",
    remainingBalance: 0,
    category: "Corporate",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-800",
  "Partially Used": "bg-blue-100 text-blue-800",
  Used: "bg-purple-100 text-purple-800",
  Expired: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

const typeColors = {
  Digital: "bg-indigo-100 text-indigo-800",
  Physical: "bg-orange-100 text-orange-800",
};

const categoryColors = {
  Personal: "bg-pink-100 text-pink-800",
  Business: "bg-cyan-100 text-cyan-800",
  Corporate: "bg-violet-100 text-violet-800",
};

const currencies = ["All", "NGN", "USD"];
const statuses = [
  "All",
  "Active",
  "Partially Used",
  "Used",
  "Expired",
  "Cancelled",
];
const types = ["All", "Digital", "Physical"];
const categories = ["All", "Personal", "Business", "Corporate"];

const Vouchers = () => {
  const [vouchers, setVouchers] = useState(initialVouchers);
  const [filteredVouchers, setFilteredVouchers] = useState(initialVouchers);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    currency: "All",
    status: "All",
    type: "All",
    category: "All",
    minValue: "",
    maxValue: "",
    startDate: "",
    endDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const itemsPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(filteredVouchers.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVouchers = filteredVouchers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Filter vouchers based on search and filters
  useEffect(() => {
    let result = vouchers;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (voucher) =>
          voucher.voucherCode
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          voucher.purchasedBy
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (voucher.usedBy &&
            voucher.usedBy.toLowerCase().includes(searchTerm.toLowerCase())) ||
          voucher.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Currency filter
    if (filters.currency !== "All") {
      result = result.filter(
        (voucher) => voucher.currency === filters.currency
      );
    }

    // Status filter
    if (filters.status !== "All") {
      result = result.filter((voucher) => voucher.status === filters.status);
    }

    // Type filter
    if (filters.type !== "All") {
      result = result.filter((voucher) => voucher.type === filters.type);
    }

    // Category filter
    if (filters.category !== "All") {
      result = result.filter(
        (voucher) => voucher.category === filters.category
      );
    }

    // Value range filter
    if (filters.minValue) {
      result = result.filter(
        (voucher) => voucher.value >= parseInt(filters.minValue)
      );
    }
    if (filters.maxValue) {
      result = result.filter(
        (voucher) => voucher.value <= parseInt(filters.maxValue)
      );
    }

    // Date range filter
    if (filters.startDate) {
      result = result.filter(
        (voucher) =>
          new Date(voucher.purchaseDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      result = result.filter(
        (voucher) => new Date(voucher.purchaseDate) <= new Date(filters.endDate)
      );
    }

    setFilteredVouchers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, vouchers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      currency: "All",
      status: "All",
      type: "All",
      category: "All",
      minValue: "",
      maxValue: "",
      startDate: "",
      endDate: "",
    });
    setSearchTerm("");
  };

  const handleVoucherClick = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatCurrency = (amount, currency) => {
    const currencySymbols = {
      NGN: "₦",
      USD: "$",
    };

    return `${currencySymbols[currency] || currency}${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const refreshVouchers = () => {
    setVouchers([...initialVouchers]);
    setFilteredVouchers([...initialVouchers]);
    setCurrentPage(1);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-full mx-auto p-4 md:p-6"
    >
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Vouchers</h1>
            <p className="text-gray-600">
              Manage and view your Rulsar vouchers
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={refreshVouchers}
              className="p-2 flex items-center gap-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RefreshCw className="h-2 w-2" />
              Refresh
            </button>

            <Link
              to="/vouchers/buy-voucher"
              className="p-2 flex items-center gap-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Gift className="h-2 w-2" />
              Buy Voucher
            </Link>
          </div>
        </div>
      </motion.div>

      {/* <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  vouchers.reduce((sum, voucher) => sum + voucher.value, 0),
                  "USD"
                )}
              </p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Vouchers</p>
              <p className="text-2xl font-bold text-gray-900">
                {vouchers.filter((v) => v.status === "Active").length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  vouchers.reduce(
                    (sum, voucher) => sum + voucher.remainingBalance,
                    0
                  ),
                  "USD"
                )}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  vouchers.filter((v) => {
                    const daysRemaining = calculateDaysRemaining(v.expiryDate);
                    return (
                      daysRemaining > 0 &&
                      daysRemaining <= 30 &&
                      v.status === "Active"
                    );
                  }).length
                }
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </motion.div> */}

      <motion.div variants={itemVariants} className="mb-6">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by voucher code, purchaser, or transaction ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-5 w-5" />
                Filters
                {(filters.currency !== "All" ||
                  filters.status !== "All" ||
                  filters.type !== "All" ||
                  filters.category !== "All" ||
                  filters.minValue ||
                  filters.maxValue ||
                  filters.startDate ||
                  filters.endDate) && (
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={filters.currency}
                      onChange={(e) =>
                        handleFilterChange("currency", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) =>
                        handleFilterChange("type", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) =>
                        handleFilterChange("category", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Value Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minValue}
                        onChange={(e) =>
                          handleFilterChange("minValue", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxValue}
                        onChange={(e) =>
                          handleFilterChange("maxValue", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Date Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) =>
                          handleFilterChange("startDate", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) =>
                          handleFilterChange("endDate", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Vouchers Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-card shadow-card overflow-hidden mb-6"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Voucher Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purchaser
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVouchers.length > 0 ? (
                currentVouchers.map((voucher) => {
                  const daysRemaining = calculateDaysRemaining(
                    voucher.expiryDate
                  );
                  return (
                    <tr
                      key={voucher.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-mono text-sm font-medium text-gray-900">
                              {voucher.voucherCode}
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(voucher.voucherCode)
                              }
                              className="text-gray-400 hover:text-gray-600"
                              title="Copy voucher code"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                categoryColors[voucher.category]
                              }`}
                            >
                              {voucher.category}
                            </span>
                          </div>
                          {copiedCode === voucher.voucherCode && (
                            <div className="text-xs text-green-600 mt-1">
                              Copied to clipboard!
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {voucher.purchasedBy}
                        </div>
                        <div className="text-xs text-gray-500">
                          {voucher.transactionId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(voucher.value, voucher.currency)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Balance:{" "}
                          {formatCurrency(
                            voucher.remainingBalance,
                            voucher.currency
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[voucher.status]
                            }`}
                          >
                            {voucher.status}
                          </span>
                          <div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                typeColors[voucher.type]
                              }`}
                            >
                              {voucher.type}
                            </span>
                          </div>
                          {daysRemaining > 0 &&
                            daysRemaining <= 30 &&
                            voucher.status === "Active" && (
                              <div className="text-xs text-yellow-600">
                                Expires in {daysRemaining} days
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div>
                            Purchased: {formatDate(voucher.purchaseDate)}
                          </div>
                          <div className="text-xs text-gray-500">
                            Expires: {formatDate(voucher.expiryDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleVoucherClick(voucher)}
                            className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            View Details
                          </button>
                          {voucher.status === "Active" && (
                            <button className="text-green-600 hover:text-green-900 flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              Download
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Gift className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium mb-1">
                        No vouchers found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                      <button
                        onClick={() => {
                          clearFilters();
                          setSearchTerm("");
                        }}
                        className="mt-3 text-primary-600 hover:text-primary-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredVouchers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredVouchers.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredVouchers.length}</span>{" "}
                vouchers
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === page
                          ? "bg-primary-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Voucher Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedVoucher && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Voucher Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="font-mono font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                      {selectedVoucher.voucherCode}
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[selectedVoucher.status]
                      }`}
                    >
                      {selectedVoucher.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="space-y-6">
                    {/* Voucher Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                          Voucher Information
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              Voucher Code
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="font-mono font-medium text-gray-900">
                                {selectedVoucher.voucherCode}
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(selectedVoucher.voucherCode)
                                }
                                className="text-gray-400 hover:text-gray-600"
                                title="Copy voucher code"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </div>
                            {copiedCode === selectedVoucher.voucherCode && (
                              <div className="text-xs text-green-600 mt-1">
                                Copied to clipboard!
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Type</p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  typeColors[selectedVoucher.type]
                                }`}
                              >
                                {selectedVoucher.type}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Category</p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  categoryColors[selectedVoucher.category]
                                }`}
                              >
                                {selectedVoucher.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                          Financial Details
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600">Total Value</p>
                            <p className="text-xl font-bold text-gray-900">
                              {formatCurrency(
                                selectedVoucher.value,
                                selectedVoucher.currency
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Remaining Balance
                            </p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(
                                selectedVoucher.remainingBalance,
                                selectedVoucher.currency
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Used Amount</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {formatCurrency(
                                selectedVoucher.value -
                                  selectedVoucher.remainingBalance,
                                selectedVoucher.currency
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                        Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              Purchase Date
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(selectedVoucher.purchaseDate)}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-primary-600" />
                          </div>
                        </div>

                        {selectedVoucher.usedDate && (
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-900">
                                Used Date
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(selectedVoucher.usedDate)}
                              </p>
                              {selectedVoucher.usedBy && (
                                <p className="text-xs text-gray-500">
                                  Used by: {selectedVoucher.usedBy}
                                </p>
                              )}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">
                              Expiry Date
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(selectedVoucher.expiryDate)}
                            </p>
                            {calculateDaysRemaining(
                              selectedVoucher.expiryDate
                            ) > 0 && (
                              <p className="text-xs text-yellow-600">
                                Expires in{" "}
                                {calculateDaysRemaining(
                                  selectedVoucher.expiryDate
                                )}{" "}
                                days
                              </p>
                            )}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-yellow-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                        Transaction Details
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Purchased By</p>
                          <p className="font-medium text-gray-900">
                            {selectedVoucher.purchasedBy}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Payment Method
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedVoucher.paymentMethod}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Transaction ID
                          </p>
                          <p className="font-mono font-medium text-gray-900">
                            {selectedVoucher.transactionId}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Download Voucher
                    </button>
                    {selectedVoucher.status === "Active" && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Use Voucher
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Vouchers;
