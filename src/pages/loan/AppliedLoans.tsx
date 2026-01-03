import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Mock data for applied loans
const initialLoans = [
  {
    id: 1,
    loanNumber: "LN-2024-001",
    applicantName: "Adeola Johnson",
    businessName: "Green Agro Farms",
    loanAmount: 15000,
    amountDisbursed: 10000,
    appliedDate: "2024-01-15",
    status: "Approved",
    repaymentStatus: "Active",
    nextPaymentDate: "2024-04-15",
    interestRate: 12,
    tenure: "24 months",
    sector: "Agriculture",
    purpose: "Equipment purchase",
    collateral: "Land documents",
  },
  {
    id: 2,
    loanNumber: "LN-2024-002",
    applicantName: "Chinedu Okonkwo",
    businessName: "Solar Power Solutions",
    loanAmount: 25000,
    amountDisbursed: 25000,
    appliedDate: "2024-01-20",
    status: "Disbursed",
    repaymentStatus: "Current",
    nextPaymentDate: "2024-04-20",
    interestRate: 10,
    tenure: "36 months",
    sector: "Renewable Energy",
    purpose: "Solar panel inventory",
    collateral: "Equipment lien",
  },
  {
    id: 3,
    loanNumber: "LN-2024-003",
    applicantName: "Fatima Ahmed",
    businessName: "Eco Packaging Ltd",
    loanAmount: 8000,
    amountDisbursed: 5000,
    appliedDate: "2024-02-05",
    status: "Under Review",
    repaymentStatus: "N/A",
    nextPaymentDate: "N/A",
    interestRate: 14,
    tenure: "18 months",
    sector: "Waste Recycling",
    purpose: "Machinery upgrade",
    collateral: "Business assets",
  },
  {
    id: 4,
    loanNumber: "LN-2024-004",
    applicantName: "Emeka Nwosu",
    businessName: "Aqua Fresh Fisheries",
    loanAmount: 12000,
    amountDisbursed: 0,
    appliedDate: "2024-02-10",
    status: "Pending",
    repaymentStatus: "N/A",
    nextPaymentDate: "N/A",
    interestRate: 13,
    tenure: "24 months",
    sector: "Fisheries",
    purpose: "Fish pond expansion",
    collateral: "Vehicle",
  },
  {
    id: 5,
    loanNumber: "LN-2024-005",
    applicantName: "Grace Okafor",
    businessName: "Biodiversity Nursery",
    loanAmount: 18000,
    amountDisbursed: 18000,
    appliedDate: "2024-02-15",
    status: "Disbursed",
    repaymentStatus: "Active",
    nextPaymentDate: "2024-05-15",
    interestRate: 11,
    tenure: "30 months",
    sector: "Biodiversity",
    purpose: "Seedling production",
    collateral: "Land title",
  },
  {
    id: 6,
    loanNumber: "LN-2024-006",
    applicantName: "Samuel Adeyemi",
    businessName: "Clean Energy Ventures",
    loanAmount: 30000,
    amountDisbursed: 20000,
    appliedDate: "2024-02-20",
    status: "Partially Disbursed",
    repaymentStatus: "Active",
    nextPaymentDate: "2024-05-20",
    interestRate: 9,
    tenure: "48 months",
    sector: "Energy Efficiency",
    purpose: "Biogas plant setup",
    collateral: "Property mortgage",
  },
  {
    id: 7,
    loanNumber: "LN-2024-007",
    applicantName: "Bisi Adekunle",
    businessName: "Agro Processing Hub",
    loanAmount: 22000,
    amountDisbursed: 22000,
    appliedDate: "2024-03-01",
    status: "Disbursed",
    repaymentStatus: "Current",
    nextPaymentDate: "2024-06-01",
    interestRate: 10.5,
    tenure: "36 months",
    sector: "Agro-processing",
    purpose: "Processing equipment",
    collateral: "Factory equipment",
  },
  {
    id: 8,
    loanNumber: "LN-2024-008",
    applicantName: "Ibrahim Musa",
    businessName: "Waste to Wealth",
    loanAmount: 15000,
    amountDisbursed: 0,
    appliedDate: "2024-03-05",
    status: "Rejected",
    repaymentStatus: "N/A",
    nextPaymentDate: "N/A",
    interestRate: 15,
    tenure: "24 months",
    sector: "Circular Economy",
    purpose: "Recycling machinery",
    collateral: "Insufficient",
  },
  {
    id: 9,
    loanNumber: "LN-2024-009",
    applicantName: "Chiamaka Nwankwo",
    businessName: "Eco Tourism Lodge",
    loanAmount: 35000,
    amountDisbursed: 25000,
    appliedDate: "2024-03-10",
    status: "Approved",
    repaymentStatus: "Active",
    nextPaymentDate: "2024-06-10",
    interestRate: 11.5,
    tenure: "60 months",
    sector: "Eco-tourism",
    purpose: "Lodge renovation",
    collateral: "Property",
  },
  {
    id: 10,
    loanNumber: "LN-2024-010",
    applicantName: "Tunde Lawal",
    businessName: "Organic Fertilizer Co.",
    loanAmount: 9000,
    amountDisbursed: 9000,
    appliedDate: "2024-03-15",
    status: "Disbursed",
    repaymentStatus: "Delinquent",
    nextPaymentDate: "2024-03-15",
    interestRate: 12.5,
    tenure: "18 months",
    sector: "Agriculture",
    purpose: "Raw materials",
    collateral: "Equipment",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Approved: "bg-green-100 text-green-800",
  Disbursed: "bg-purple-100 text-purple-800",
  "Partially Disbursed": "bg-indigo-100 text-indigo-800",
  Rejected: "bg-red-100 text-red-800",
};

const repaymentStatusColors = {
  Current: "bg-green-100 text-green-800",
  Active: "bg-blue-100 text-blue-800",
  Delinquent: "bg-red-100 text-red-800",
  "N/A": "bg-gray-100 text-gray-800",
};

const sectors = [
  "All",
  "Agriculture",
  "Renewable Energy",
  "Waste Recycling",
  "Fisheries",
  "Biodiversity",
  "Energy Efficiency",
  "Agro-processing",
  "Circular Economy",
  "Eco-tourism",
];
const statuses = [
  "All",
  "Pending",
  "Under Review",
  "Approved",
  "Disbursed",
  "Partially Disbursed",
  "Rejected",
];

const AppliedLoansPage = () => {
  const [loans, setLoans] = useState(initialLoans);
  const [filteredLoans, setFilteredLoans] = useState(initialLoans);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sector: "All",
    status: "All",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstItem, indexOfLastItem);

  // Filter loans based on search and filters
  useEffect(() => {
    let result = loans;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (loan) =>
          loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.loanNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sector filter
    if (filters.sector !== "All") {
      result = result.filter((loan) => loan.sector === filters.sector);
    }

    // Status filter
    if (filters.status !== "All") {
      result = result.filter((loan) => loan.status === filters.status);
    }

    // Amount range filter
    if (filters.minAmount) {
      result = result.filter(
        (loan) => loan.loanAmount >= parseInt(filters.minAmount)
      );
    }
    if (filters.maxAmount) {
      result = result.filter(
        (loan) => loan.loanAmount <= parseInt(filters.maxAmount)
      );
    }

    // Date range filter
    if (filters.startDate) {
      result = result.filter(
        (loan) => new Date(loan.appliedDate) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      result = result.filter(
        (loan) => new Date(loan.appliedDate) <= new Date(filters.endDate)
      );
    }

    setFilteredLoans(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, loans]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sector: "All",
      status: "All",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
    setSearchTerm("");
  };

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoan(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Applied Loans
            </h1>
            <p className="text-gray-600">
              View and manage all loan applications
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>
                  Active Loans:{" "}
                  {
                    loans.filter(
                      (l) =>
                        l.repaymentStatus === "Active" ||
                        l.repaymentStatus === "Current"
                    ).length
                  }
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>
                  Total Value:{" "}
                  {formatCurrency(
                    loans.reduce((sum, loan) => sum + loan.loanAmount, 0)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-2 w-2" />
                <input
                  type="text"
                  placeholder="Search by name, business, or loan number..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-5 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`py-0 px-2 flex items-center gap-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-2 w-2" /> Filters
                {(filters.sector !== "All" ||
                  filters.status !== "All" ||
                  filters.minAmount ||
                  filters.maxAmount ||
                  filters.startDate ||
                  filters.endDate) && (
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              <button
                onClick={clearFilters}
                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

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
                      Sector
                    </label>
                    <select
                      value={filters.sector}
                      onChange={(e) =>
                        handleFilterChange("sector", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {sectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
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
                      Amount Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minAmount}
                        onChange={(e) =>
                          handleFilterChange("minAmount", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxAmount}
                        onChange={(e) =>
                          handleFilterChange("maxAmount", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
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

      {/* <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6"
      > */}
      {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Loans</p>

              <p className="text-2xl font-bold text-gray-900">{loans.length}</p>
            </div>

            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign className="h-2 w-2 text-primary-600" />
            </div>
          </div>
        </div> */}

      {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  loans.reduce((sum, loan) => sum + loan.loanAmount, 0)
                )}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-2 w-2 text-green-600" />
            </div>
          </div>
        </div> */}

      {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  loans.filter(
                    (l) => l.status === "Pending" || l.status === "Under Review"
                  ).length
                }
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-2 w-2 text-yellow-600" />
            </div>
          </div>
        </div> */}

      {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disbursed Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  loans.reduce((sum, loan) => sum + loan.amountDisbursed, 0)
                )}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle className="h-2 w-2 text-purple-600" />
            </div>
          </div>
        </div> */}
      {/* </motion.div> */}

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-card shadow-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan Details
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentLoans.length > 0 ? (
                currentLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleLoanClick(loan)}
                  >
                    <td className="px-4 py-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          {loan.loanNumber}
                        </p>

                        <p className="text-sm text-gray-500">
                          {loan.businessName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {loan.applicantName}
                      </div>
                      <div className="text-sm text-gray-500">{loan.sector}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(loan.loanAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Disbursed: {formatCurrency(loan.amountDisbursed)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            statusColors[loan.status]
                          }`}
                        >
                          {loan.status}
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              repaymentStatusColors[loan.repaymentStatus]
                            }`}
                          >
                            {loan.repaymentStatus}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(loan.appliedDate)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoanClick(loan);
                        }}
                        className="text-primary-600 hover:text-primary-900 flex items-center gap-1"
                      >
                        <Eye className="h-2 w-2" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium mb-1">No loans found</p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLoans.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredLoans.length)}
                </span>{" "}
                of <span className="font-medium">{filteredLoans.length}</span>{" "}
                loans
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
                  <ChevronLeft className="h-2 w-2" />
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
                  <ChevronRight className="h-2 w-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Loan Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedLoan && (
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
              <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Loan Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="h-2 w-2" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedLoan.loanNumber}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[selectedLoan.status]
                      }`}
                    >
                      {selectedLoan.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">
                            Applicant Name
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.applicantName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Business Name</p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.businessName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Sector</p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.sector}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Loan Purpose</p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.purpose}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Loan Terms */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Loan Terms
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Loan Amount</p>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(selectedLoan.loanAmount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Amount Disbursed
                            </p>
                            <p className="font-medium text-gray-900">
                              {formatCurrency(selectedLoan.amountDisbursed)}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Interest Rate
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedLoan.interestRate}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Tenure</p>
                            <p className="font-medium text-gray-900">
                              {selectedLoan.tenure}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Collateral</p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.collateral}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                      Application Timeline
                    </h3>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        <div className="relative">
                          <div className="absolute -left-7 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Application Submitted
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(selectedLoan.appliedDate)}
                            </p>
                          </div>
                        </div>
                        {selectedLoan.status !== "Pending" && (
                          <div className="relative">
                            <div className="absolute -left-7 top-0 w-4 h-4 rounded-full bg-green-600"></div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Application Reviewed
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(
                                  new Date(selectedLoan.appliedDate).setDate(
                                    new Date(
                                      selectedLoan.appliedDate
                                    ).getDate() + 7
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                        {(selectedLoan.status === "Disbursed" ||
                          selectedLoan.status === "Partially Disbursed") && (
                          <div className="relative">
                            <div className="absolute -left-7 top-0 w-4 h-4 rounded-full bg-purple-600"></div>
                            <div>
                              <p className="font-medium text-gray-900">
                                Funds Disbursed
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(
                                  new Date(selectedLoan.appliedDate).setDate(
                                    new Date(
                                      selectedLoan.appliedDate
                                    ).getDate() + 14
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Repayment Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                      Repayment Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            Repayment Status
                          </p>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              repaymentStatusColors[
                                selectedLoan.repaymentStatus
                              ]
                            }`}
                          >
                            {selectedLoan.repaymentStatus}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Next Payment Date
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.nextPaymentDate !== "N/A"
                              ? formatDate(selectedLoan.nextPaymentDate)
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Estimated Monthly Payment
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedLoan.loanAmount > 0
                              ? formatCurrency(
                                  (selectedLoan.loanAmount *
                                    (1 + selectedLoan.interestRate / 100)) /
                                    parseInt(selectedLoan.tenure)
                                )
                              : "N/A"}
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
                      Download Details
                    </button>
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

export default AppliedLoansPage;
