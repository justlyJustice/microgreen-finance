import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";

const GrantForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    ageRange: "",
    nationality: "",
    nationalId: "",
    isPWD: "",
    pwdDetails: "",
    phoneNumber: "",
    email: "",
    residentialAddress: "",

    businessName: "",
    registrationStatus: "",
    registrationNumber: "",
    yearStarted: "",
    businessAddress: "",
    enterpriseType: "",
    fullTimeEmployees: "",
    partTimeEmployees: "",

    // Section C
    primarySector: "",
    otherSector: "",
    greenActivityDescription: "",

    // Section D
    grantCategory: "",
    amountRequested: "",
    grantUse: "",
    coContribution: "",
    coContributionDetails: "",

    // Section E
    currentRevenue: "",
    expectedRevenueIncrease: "",
    jobsWomen: "",
    jobsYouth: "",
    jobsPWDs: "",
    communityImpact: "",

    // Section F
    environmentalRisks: "",
    mitigationMeasures: "",
    laborCompliance: "",

    // Section G
    trainingCommitment: "",
    trainingAreas: {
      businessManagement: false,
      financialLiteracy: false,
      climateSmartProduction: false,
      marketingBranding: false,
      recordKeeping: false,
    },

    // Section I
    keepFinancialRecords: "",
    recordTypes: {
      sales: false,
      expenses: false,
      inventory: false,
      profitLoss: false,
    },
    businessManager: "",
    otherManager: "",
    operationalChallenges: {
      accessToFinance: false,
      equipmentTools: false,
      skilledLabor: false,
      marketAccess: false,
      highCostInputs: false,
      powerEnergy: false,
      transportationLogistics: false,
    },

    // Section J
    primaryCustomers: {
      individuals: false,
      smes: false,
      largeCompanies: false,
      government: false,
      exportMarkets: false,
    },
    salesMethods: {
      directSales: false,
      onlineSocialMedia: false,
      agentsDistributors: false,
      cooperatives: false,
    },
    supplyAgreements: "",
    supplyAgreementsDetails: "",

    // Section K
    sustainabilityDescription: "",
    innovativeTechnology: "",
    technologyDescription: "",
    environmentalImpactReduction: "",

    // Section L
    businessRisks: "",
    riskMitigation: "",

    // Section M
    expectedRevenue: "",
    expectedExpenses: "",
    expectedProfit: "",

    // Section N
    previousFunding: "",
    fundingDetails: "",
    otherPrograms: "",

    // Section O
    ownsSmartphone: "",
    internetAccess: "",
    digitalReporting: "",

    // Section P
    dataConsent: "",

    // Section H
    declaration: false,
  });

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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      // const [parent, child] = name.split(".");
      // if (child) {
      //   setFormData((prev) => ({
      //     ...prev,
      //     [parent]: {
      //       ...prev[parent],
      //       [child]: checked,
      //     },
      //   }));
      // } else {
      //   setFormData((prev) => ({
      //     ...prev,
      //     [name]: checked,
      //   }));
      // }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto p-2"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Grant Application Form
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Instructions to Applicants
          </h2>

          <p className="text-gray-700">
            Please complete all sections of this application form accurately.
            All information provided will be treated confidentially and used
            solely for the purpose of evaluating your application under the
            MicroGREEN Financial Grant Programme.
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Applicant Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name:
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender:
              </label>

              <div className="flex gap-6 mt-2">
                {["Male", "Female"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-1 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth:
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range:
              </label>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {["15–24", "25–35", "36–45", "46+"].map((range) => (
                  <label key={range} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="ageRange"
                      value={range}
                      checked={formData.ageRange === range}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-1 text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality:
              </label>

              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                National Identification Number:
              </label>

              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you a Person with Disability (PWD)?
              </label>

              <div className="flex gap-2 mb-2">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isPWD"
                      value={option}
                      checked={formData.isPWD === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-1 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.isPWD === "Yes" && (
                <input
                  type="text"
                  name="pwdDetails"
                  value={formData.pwdDetails}
                  onChange={handleInputChange}
                  placeholder="Please specify"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number:
              </label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address:
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Residential Address (State, LGA, Community):
              </label>

              <textarea
                name="residentialAddress"
                value={formData.residentialAddress}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                required
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Enterprise Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of Business / Enterprise:
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Registration Status:
              </label>
              <div className="space-y-2 mt-2">
                {["Registered", "Informal", "In process of registration"].map(
                  (status) => (
                    <label key={status} className="flex items-center">
                      <input
                        type="radio"
                        name="registrationStatus"
                        value={status}
                        checked={formData.registrationStatus === status}
                        onChange={handleInputChange}
                        className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{status}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number (if applicable):
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Business Started:
              </label>
              <input
                type="number"
                name="yearStarted"
                value={formData.yearStarted}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address (State, LGA):
              </label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Enterprise:
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Micro", "Small", "Cooperative", "Start-up"].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="enterpriseType"
                      value={type}
                      checked={formData.enterpriseType === type}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Full-Time Employees:
              </label>
              <input
                type="number"
                name="fullTimeEmployees"
                value={formData.fullTimeEmployees}
                onChange={handleInputChange}
                min="0"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Part-Time Employees:
              </label>
              <input
                type="number"
                name="partTimeEmployees"
                value={formData.partTimeEmployees}
                onChange={handleInputChange}
                min="0"
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>
        </motion.section>

        {/* Green Sector Classification */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Green Sector Classification
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Primary Sector (tick one):
              </label>
              <div className="space-y-2">
                {[
                  "Climate-smart agriculture / agro-processing",
                  "Agroforestry / forestry",
                  "Fisheries / aquaculture",
                  "Renewable energy / energy efficiency",
                  "Waste recycling / circular economy",
                  "Biodiversity / eco-enterprise",
                  "Other (specify)",
                ].map((sector) => (
                  <label key={sector} className="flex items-center">
                    <input
                      type="radio"
                      name="primarySector"
                      value={sector}
                      checked={formData.primarySector === sector}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{sector}</span>
                  </label>
                ))}
              </div>
              {formData.primarySector === "Other (specify)" && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="otherSector"
                    value={formData.otherSector}
                    onChange={handleInputChange}
                    placeholder="Please specify"
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brief description of your green or climate-positive activity
                (max 200 words):
              </label>
              <textarea
                name="greenActivityDescription"
                value={formData.greenActivityDescription}
                onChange={handleInputChange}
                rows={6}
                maxLength={1000}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your green/climate-positive activities..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.greenActivityDescription.length}/1000 characters
              </p>
            </div>
          </div>
        </motion.section>

        {/* Grant Request Details */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Grant Request Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Grant Category Applied For:
              </label>
              <div className="space-y-2">
                {[
                  "Micro / Start-up ($1,000–$5,000)",
                  "Early-Stage MSME ($5,001–$15,000)",
                  "Growth MSME ($15,001–$30,000)",
                ].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="grantCategory"
                      value={category}
                      checked={formData.grantCategory === category}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Requested (USD):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="amountRequested"
                  value={formData.amountRequested}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proposed Use of Grant Funds (please itemize):
              </label>
              <textarea
                name="grantUse"
                value={formData.grantUse}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Please itemize how you plan to use the grant funds..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Will you provide a co-contribution (cash or in-kind)?
              </label>
              <div className="flex gap-4 mb-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="coContribution"
                      value={option}
                      checked={formData.coContribution === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
              {formData.coContribution === "Yes" && (
                <input
                  type="text"
                  name="coContributionDetails"
                  value={formData.coContributionDetails}
                  onChange={handleInputChange}
                  placeholder="Please specify amount/type"
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              )}
            </div>
          </div>
        </motion.section>

        {/* Business Impact and Job Creation */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Business Impact and Job Creation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current monthly business revenue (approx.):
              </label>

              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="currentRevenue"
                  value={formData.currentRevenue}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected revenue increase after grant support:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="expectedRevenueIncrease"
                  value={formData.expectedRevenueIncrease}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of jobs to be created within 12 months:
              </label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Women:
                  </label>
                  <input
                    type="number"
                    name="jobsWomen"
                    value={formData.jobsWomen}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Youth:
                  </label>
                  <input
                    type="number"
                    name="jobsYouth"
                    value={formData.jobsYouth}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    PWDs:
                  </label>
                  <input
                    type="number"
                    name="jobsPWDs"
                    value={formData.jobsPWDs}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will this grant improve livelihoods in your community? (max
                150 words):
              </label>
              <textarea
                name="communityImpact"
                value={formData.communityImpact}
                onChange={handleInputChange}
                rows={5}
                maxLength={750}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe how the grant will benefit your community..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.communityImpact.length}/750 characters
              </p>
            </div>
          </div>
        </motion.section>

        {/* Environmental and Social Safeguards */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Environmental and Social Safeguards
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Does your business activity pose any environmental risks?
              </label>

              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="environmentalRisks"
                      value={option}
                      checked={formData.environmentalRisks === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.environmentalRisks === "Yes" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  If yes, describe mitigation measures:
                </label>
                <textarea
                  name="mitigationMeasures"
                  value={formData.mitigationMeasures}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe your environmental risk mitigation measures..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you comply with labor standards (fair wages, no child labor,
                safe working conditions)?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="laborCompliance"
                      value={option}
                      checked={formData.laborCompliance === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Capacity Building and Training Commitment */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Capacity Building and Training Commitment
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you willing to participate in mandatory training, mentoring,
                and reporting activities?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="trainingCommitment"
                      value={option}
                      checked={formData.trainingCommitment === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred training areas (tick all that apply):
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "businessManagement", label: "Business management" },
                  { key: "financialLiteracy", label: "Financial literacy" },
                  {
                    key: "climateSmartProduction",
                    label: "Climate-smart production",
                  },
                  { key: "marketingBranding", label: "Marketing and branding" },
                  { key: "recordKeeping", label: "Record keeping" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`trainingAreas.${key}`}
                      // checked={formData.trainingAreas[key]}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Business Operations & Management */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Business Operations & Management
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you currently keep financial records for your business?
              </label>
              <div className="flex gap-4 mb-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="keepFinancialRecords"
                      value={option}
                      checked={formData.keepFinancialRecords === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.keepFinancialRecords === "Yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    If yes, what type of records do you keep?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: "sales", label: "Sales" },
                      { key: "expenses", label: "Expenses" },
                      { key: "inventory", label: "Inventory" },
                      { key: "profitLoss", label: "Profit & Loss" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          name={`recordTypes.${key}`}
                          // checked={formData.recordTypes[key]}
                          onChange={handleInputChange}
                          className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who manages the day-to-day operations of the business?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                {["Owner", "Manager", "Family member", "Other"].map(
                  (manager) => (
                    <label key={manager} className="flex items-center">
                      <input
                        type="radio"
                        name="businessManager"
                        value={manager}
                        checked={formData.businessManager === manager}
                        onChange={handleInputChange}
                        className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{manager}</span>
                    </label>
                  )
                )}
              </div>

              {formData.businessManager === "Other" && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="otherManager"
                    value={formData.otherManager}
                    onChange={handleInputChange}
                    placeholder="Please specify"
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What are your top three operational challenges? (tick up to 3)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "accessToFinance", label: "Access to finance" },
                  { key: "equipmentTools", label: "Equipment/tools" },
                  { key: "skilledLabor", label: "Skilled labor" },
                  { key: "marketAccess", label: "Market access" },
                  { key: "highCostInputs", label: "High cost of inputs" },
                  { key: "powerEnergy", label: "Power/energy" },
                  {
                    key: "transportationLogistics",
                    label: "Transportation/logistics",
                  },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`operationalChallenges.${key}`}
                      // checked={formData.operationalChallenges[key]}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Market & Customers */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Market & Customers
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Who are your primary customers?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "individuals", label: "Individuals/households" },
                  { key: "smes", label: "SMEs" },
                  { key: "largeCompanies", label: "Large companies" },
                  { key: "government", label: "Government" },
                  { key: "exportMarkets", label: "Export markets" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`primaryCustomers.${key}`}
                      // checked={formData.primaryCustomers[key]}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How do you currently sell your products/services?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: "directSales", label: "Direct sales" },
                  { key: "onlineSocialMedia", label: "Online/social media" },
                  { key: "agentsDistributors", label: "Agents/distributors" },
                  { key: "cooperatives", label: "Cooperatives" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      name={`salesMethods.${key}`}
                      // checked={formData.salesMethods[key]}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have existing supply or off-taker agreements?
              </label>
              <div className="flex gap-4 mb-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="supplyAgreements"
                      value={option}
                      checked={formData.supplyAgreements === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.supplyAgreements === "Yes" && (
                <div>
                  <textarea
                    name="supplyAgreementsDetails"
                    value={formData.supplyAgreementsDetails}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Please describe your supply or off-taker agreements..."
                  />
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Innovation & Sustainability */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Innovation & Sustainability
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What makes your business environmentally sustainable or
                climate-smart? (max 150 words):
              </label>
              <textarea
                name="sustainabilityDescription"
                value={formData.sustainabilityDescription}
                onChange={handleInputChange}
                rows={5}
                maxLength={750}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your environmental sustainability or climate-smart practices..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.sustainabilityDescription.length}/750 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Does your enterprise use any innovative technology or process?
              </label>
              <div className="flex gap-4 mb-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="innovativeTechnology"
                      value={option}
                      checked={formData.innovativeTechnology === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.innovativeTechnology === "Yes" && (
                <div>
                  <textarea
                    name="technologyDescription"
                    value={formData.technologyDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Briefly describe the innovative technology or process..."
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will your business reduce environmental impact over the next
                12–24 months? (max 100 words):
              </label>
              <textarea
                name="environmentalImpactReduction"
                value={formData.environmentalImpactReduction}
                onChange={handleInputChange}
                rows={4}
                maxLength={500}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your plans for reducing environmental impact..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.environmentalImpactReduction.length}/500 characters
              </p>
            </div>
          </div>
        </motion.section>

        {/* Risk Assessment */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Risk Assessment
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are the main risks to your business growth? (e.g., climate,
                market, security):
              </label>
              <textarea
                name="businessRisks"
                value={formData.businessRisks}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe the main risks to your business growth..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you plan to manage or mitigate these risks?
              </label>
              <textarea
                name="riskMitigation"
                value={formData.riskMitigation}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Describe your risk management and mitigation strategies..."
                required
              />
            </div>
          </div>
        </motion.section>

        {/* Financial Projections (Simplified) */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Financial Projections (Simplified)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected monthly revenue after grant support:
              </label>

              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="expectedRevenue"
                  value={formData.expectedRevenue}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected monthly expenses after grant support:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="expectedExpenses"
                  value={formData.expectedExpenses}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected net profit after grant support:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="expectedProfit"
                  value={formData.expectedProfit}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-7 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Previous Funding & Support */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Previous Funding & Support
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have you received any grants or loans in the past 3 years?
              </label>
              <div className="flex gap-4 mb-3">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="previousFunding"
                      value={option}
                      checked={formData.previousFunding === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>

              {formData.previousFunding === "Yes" && (
                <div>
                  <textarea
                    name="fundingDetails"
                    value={formData.fundingDetails}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Provide details (source, amount, year)..."
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you currently benefiting from any other donor-funded
                programme?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="otherPrograms"
                      value={option}
                      checked={formData.otherPrograms === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Digital Readiness */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Digital Readiness
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you own a smartphone?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="ownsSmartphone"
                      value={option}
                      checked={formData.ownsSmartphone === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have access to the internet?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="internetAccess"
                      value={option}
                      checked={formData.internetAccess === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you able to submit reports digitally (WhatsApp, email,
                portal)?
              </label>
              <div className="flex gap-4">
                {["Yes", "No"].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="digitalReporting"
                      value={option}
                      checked={formData.digitalReporting === option}
                      onChange={handleInputChange}
                      className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Consent & Data Protection */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Consent & Data Protection
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Do you consent to the use of your data for programme monitoring,
              evaluation, and donor reporting (in line with data protection
              laws)?
            </label>
            <div className="flex gap-4">
              {["Yes", "No"].map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="dataConsent"
                    value={option}
                    checked={formData.dataConsent === option}
                    onChange={handleInputChange}
                    className="h-2 w-2 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span className="ml-2 text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Declaration */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-card shadow-card p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b">
            Declaration
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 italic">
                I hereby declare that the information provided in this I
                understand that providing false information may lead to
                disqualification or termination of grant support.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleInputChange}
                  className="h-2 w-2 text-primary-600 rounded focus:ring-primary-500"
                  required
                />
                <span className="ml-2 text-gray-700 font-medium">
                  I agree to the above declaration
                </span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applicant Name:
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    readOnly
                    className="w-full p-1 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date:
                  </label>

                  <input
                    type="date"
                    value={new Date().toISOString().split("T")[0]}
                    readOnly
                    className="w-full p-1 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-8"
        >
          <button
            type="submit"
            className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            Submit Application
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default GrantForm;
