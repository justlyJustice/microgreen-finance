import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  ExternalLink,
  FileText,
  Users,
  Target,
  Award,
} from "lucide-react";

// Mock data for available grants
const initialGrants = [
  {
    id: 1,
    grantNumber: "GR-2024-001",
    grantName: "Climate Innovation Fund",
    organization: "Global Green Foundation",
    description:
      "Funding for innovative solutions addressing climate change through sustainable agriculture, renewable energy, and waste management.",
    amount: 50000,
    deadline: "2024-06-30",
    status: "Open",
    sector: ["Agriculture", "Renewable Energy", "Waste Recycling"],
    eligibility: "Startups & SMEs (2-5 years in operation)",
    duration: "12-24 months",
    matchRequired: "20% cash match",
    requiredFields: [
      "Business registration documents",
      "Financial statements (2 years)",
      "Detailed project proposal",
      "Environmental impact assessment",
      "Implementation timeline",
      "Budget breakdown",
    ],
    applications: 245,
    successRate: "15%",
  },
];

const statusColors = {
  Open: "bg-green-100 text-green-800",
  "Closing Soon": "bg-yellow-100 text-yellow-800",
  Closed: "bg-red-100 text-red-800",
  Archived: "bg-gray-100 text-gray-800",
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
  "Marine Conservation",
  "All Sectors",
];

const statuses = ["All", "Open", "Closing Soon", "Closed"];

const AvailableGrants = () => {
  const [grants, setGrants] = useState(initialGrants);
  const [filteredGrants, setFilteredGrants] = useState(initialGrants);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    sector: "All",
    status: "All",
    minAmount: "",
    maxAmount: "",
    deadline: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(filteredGrants.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGrants = filteredGrants.slice(indexOfFirstItem, indexOfLastItem);

  // Filter grants based on search and filters
  useEffect(() => {
    let result = grants;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (grant) =>
          grant.grantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grant.grantNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sector filter
    if (filters.sector !== "All") {
      if (filters.sector === "All Sectors") {
        // Keep all grants
      } else {
        result = result.filter((grant) =>
          grant.sector.includes(filters.sector)
        );
      }
    }

    // Status filter
    if (filters.status !== "All") {
      result = result.filter((grant) => grant.status === filters.status);
    }

    // Amount range filter
    if (filters.minAmount) {
      result = result.filter(
        (grant) => grant.amount >= parseInt(filters.minAmount)
      );
    }
    if (filters.maxAmount) {
      result = result.filter(
        (grant) => grant.amount <= parseInt(filters.maxAmount)
      );
    }

    // Deadline filter
    if (filters.deadline) {
      result = result.filter(
        (grant) => new Date(grant.deadline) >= new Date(filters.deadline)
      );
    }

    setFilteredGrants(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filters, grants]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sector: "All",
      status: "All",
      minAmount: "",
      maxAmount: "",
      deadline: "",
    });
    setSearchTerm("");
  };

  const handleGrantClick = (grant) => {
    setSelectedGrant(grant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGrant(null);
  };

  const handleApplyClick = () => {
    navigate("/grants/apply-grant");
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

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
              Available Grants
            </h1>
            <p className="text-gray-600">
              Browse and apply for environmental grants and funding
              opportunities
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>
                  Open Grants:{" "}
                  {grants.filter((g) => g.status === "Open").length}
                </span>
              </div>
              {/* <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>
                  Total Funding:{" "}
                  {formatCurrency(
                    grants.reduce((sum, grant) => sum + grant.amount, 0)
                  )}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </motion.div>

      {/* <motion.div variants={itemVariants} className="mb-6">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-2 w-2" />

                <input
                  type="text"
                  placeholder="Search grants by name, organization, or description..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`py-1 px-4 flex items-center gap-2 rounded-lg transition-colors ${
                  showFilters
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Filter className="h-3 w-3" /> Filters
                {(filters.sector !== "All" ||
                  filters.status !== "All" ||
                  filters.minAmount ||
                  filters.maxAmount ||
                  filters.deadline) && (
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              <button
                onClick={clearFilters}
                className="px-4 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
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
                        placeholder="Min Amount"
                        value={filters.minAmount}
                        onChange={(e) =>
                          handleFilterChange("minAmount", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        type="number"
                        placeholder="Max Amount"
                        value={filters.maxAmount}
                        onChange={(e) =>
                          handleFilterChange("maxAmount", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deadline After
                    </label>
                    <input
                      type="date"
                      value={filters.deadline}
                      onChange={(e) =>
                        handleFilterChange("deadline", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div> */}

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 
        "
      >
        {/* <div className="bg-white rounded-card shadow-card p-4">
        mb-6
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Grants</p>
              <p className="text-2xl font-bold text-gray-900">
                {grants.length}
              </p>
            </div>

            <div className="p-2 bg-primary-50 rounded-lg">
              <Award className="h-3 w-3 text-primary-600" />
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Funding Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  grants.reduce((sum, grant) => sum + grant.amount, 0)
                )}
              </p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-3 w-3 text-green-600" />
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  grants.reduce((sum, grant) => {
                    const rate = parseFloat(grant.successRate);
                    return sum + (isNaN(rate) ? 0 : rate);
                  }, 0) / grants.length
                )}
                %
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Target className="h-3 w-3 text-blue-600" />
            </div>
          </div>
        </div> */}

        {/* <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Closest Deadline</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.min(...grants.map((g) => getDaysRemaining(g.deadline)))}{" "}
                days
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-3 w-3 text-yellow-600" />
            </div>
          </div>
        </div> */}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-white rounded-card shadow-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grant Details
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGrants.length > 0 ? (
                currentGrants.map((grant) => (
                  <tr
                    key={grant.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {grant.grantName}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {grant.description}
                        </p>

                        {/* <div className="flex flex-wrap gap-1 mt-2">
                          {grant.sector.slice(0, 3).map((sector, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {sector}
                            </span>
                          ))}
                          {grant.sector.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              +{grant.sector.length - 3} more
                            </span>
                          )}
                        </div> */}
                      </div>
                    </td>

                    {/* <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {grant.organization}
                      </div>
                      <div className="text-sm text-gray-500">
                        {grant.eligibility}
                      </div>
                    </td> */}
                    {/* <td className="px-6 py-4">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(grant.amount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Match: {grant.matchRequired}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(grant.deadline)}
                      </div>
                      <div
                        className={`text-xs ${
                          getDaysRemaining(grant.deadline) < 30
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {getDaysRemaining(grant.deadline)} days remaining
                      </div>
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[grant.status as string]
                          }`}
                        >
                          {grant.status}
                        </span>

                        {/* <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-3 w-3 mr-1" />
                          {grant.applications} applications
                        </div> */}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleGrantClick(grant)}
                          className="text-primary-600 hover:text-primary-900 flex items-center gap-1 text-sm font-medium"
                        >
                          <Eye className="h-2 w-2" />
                          View Details
                        </button>

                        <button
                          onClick={() => handleApplyClick(grant)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg flex items-center gap-2 justify-center transition-colors text-sm"
                        >
                          <FileText className="h-2 w-2" />
                          Apply Now
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-lg font-medium mb-1">
                        No grants found
                      </p>
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
        {filteredGrants.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredGrants.length)}
                </span>{" "}
                of <span className="font-medium">{filteredGrants.length}</span>{" "}
                grants
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-2 py-1 rounded-md ${
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
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Grant Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedGrant && (
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
                      Grant Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </div>

                  <div className="mt-1 flex items-center gap-4">
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedGrant.grantNumber}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[selectedGrant.status]
                      }`}
                    >
                      {selectedGrant.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="mb-4">
                    <h1 className="text-lg font-bold text-gray-900 mb-2">
                      {selectedGrant.grantName}
                    </h1>
                    <p className="text-base text-gray-600">
                      {selectedGrant.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">
                            Funding Organization
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedGrant.organization}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Sectors</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedGrant.sector.map((sector, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {sector}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Eligibility</p>
                          <p className="font-medium text-gray-900">
                            {selectedGrant.eligibility}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Funding Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                        Funding Details
                      </h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Grant Amount
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                              {formatCurrency(selectedGrant.amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-medium text-gray-900">
                              {selectedGrant.duration}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Matching Requirement
                          </p>
                          <p className="font-medium text-gray-900">
                            {selectedGrant.matchRequired}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              Applications
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedGrant.applications}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Success Rate
                            </p>
                            <p className="font-medium text-gray-900">
                              {selectedGrant.successRate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Required Fields Section */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                      Required Application Documents
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <ul className="space-y-2">
                        {selectedGrant.requiredFields.map((field, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{field}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">
                      Timeline
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-red-800 mb-1">
                          Application Deadline
                        </p>
                        <p className="text-lg font-bold text-red-900">
                          {formatDate(selectedGrant.deadline)}
                        </p>
                        <p className="text-sm text-red-600">
                          ({getDaysRemaining(selectedGrant.deadline)} days
                          remaining)
                        </p>
                      </div> */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">
                          Review Period
                        </p>
                        <p className="text-lg font-bold text-blue-900">
                          4-6 weeks
                        </p>
                        <p className="text-sm text-blue-600">After deadline</p>
                      </div>

                      {/* <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Disbursement
                        </p>
                        <p className="text-lg font-bold text-green-900">
                          2-3 weeks
                        </p>
                        <p className="text-sm text-green-600">After approval</p>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-2">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Note:</span> Ensure all
                      required documents are prepared before starting your
                      application
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>

                      <button
                        onClick={() => handleApplyClick()}
                        className="px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-xs"
                      >
                        <FileText className="h-3 w-3" />
                        Start Application
                      </button>
                    </div>
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

export default AvailableGrants;
