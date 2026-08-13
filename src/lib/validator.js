export function validateForm(data) {
  const errors = [];

  // First Name
  if (!data.firstName?.trim()) {
    errors.push({ field: "firstName", message: "First name is required" });
  } else if (data.firstName.length > 50) {
    errors.push({
      field: "firstName",
      message: "First name cannot exceed 50 characters",
    });
  } else if (!/^[a-zA-Z\s-]+$/.test(data.firstName)) {
    errors.push({
      field: "firstName",
      message: "First name can only contain letters, spaces, and hyphens",
    });
  }

  // Last Name
  if (!data.lastName?.trim()) {
    errors.push({ field: "lastName", message: "Last name is required" });
  } else if (data.lastName.length > 50) {
    errors.push({
      field: "lastName",
      message: "Last name cannot exceed 50 characters",
    });
  } else if (!/^[a-zA-Z\s-]+$/.test(data.lastName)) {
    errors.push({
      field: "lastName",
      message: "Last name can only contain letters, spaces, and hyphens",
    });
  }

  // Email
  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Phone
  if (!data.phone?.trim()) {
    errors.push({ field: "phone", message: "Phone number is required" });
  } else if (!/^\+?[\d\s-]{10,}$/.test(data.phone)) {
    errors.push({
      field: "phone",
      message: "Please enter a valid phone number",
    });
  }

  // Company
  if (!data.company?.trim()) {
    errors.push({ field: "company", message: "Company name is required" });
  } else if (data.company.length > 100) {
    errors.push({
      field: "company",
      message: "Company name cannot exceed 100 characters",
    });
  }

  // Industry
  if (!data.industry?.trim()) {
    errors.push({ field: "industry", message: "Industry is required" });
  } else if (data.industry.length > 100) {
    errors.push({
      field: "industry",
      message: "Industry cannot exceed 100 characters",
    });
  }

  // Job Level
  if (!data.jobLevel?.trim()) {
    errors.push({ field: "jobLevel", message: "Job level is required" });
  } else if (data.jobLevel.length > 100) {
    errors.push({
      field: "jobLevel",
      message: "Job level cannot exceed 100 characters",
    });
  }

  // Job Title
  if (!data.jobTitle?.trim()) {
    errors.push({ field: "jobTitle", message: "Job title is required" });
  } else if (data.jobTitle.length > 100) {
    errors.push({
      field: "jobTitle",
      message: "Job title cannot exceed 100 characters",
    });
  }

  // City
  if (!data.city?.trim()) {
    errors.push({ field: "city", message: "City is required" });
  } else if (data.city.length > 50) {
    errors.push({ field: "city", message: "City cannot exceed 50 characters" });
  }

  // Decision Making
  if (!data.decisionMaking) {
    errors.push({
      field: "decisionMaking",
      message: "Decision Making is required",
    });
  } else if (!["yes", "no"].includes(data.decisionMaking)) {
    errors.push({
      field: "decisionMaking",
      message: "Invalid Decision Making value",
    });
  }

  // Timeline Evaluation
  if (!data.timelineEvaluation) {
    errors.push({
      field: "timelineEvaluation",
      message: "Timeline Evaluation is required",
    });
  } else if (!["0-3", "3-6", "6-9", "9-12"].includes(data.timelineEvaluation)) {
    errors.push({
      field: "timelineEvaluation",
      message: "Invalid timeline value",
    });
  }

  // AI Server Requirement
  if (!data.aiServerRequirement) {
    errors.push({
      field: "aiServerRequirement",
      message: "AI Server Requirement is required",
    });
  } else if (!["yes", "no"].includes(data.aiServerRequirement)) {
    errors.push({
      field: "aiServerRequirement",
      message: "Invalid AI Server Requirement value",
    });
  }

  // Budget Allocation
  const budgetAllocation = String(data.budgetAllocation || "").trim();
  if (!budgetAllocation) {
    errors.push({
      field: "budgetAllocation",
      message: "Budget Allocation is required",
    });
  } else if (
    !["yes", "no", "planned", "not-sure"].includes(budgetAllocation)
  ) {
    errors.push({
      field: "budgetAllocation",
      message: "Invalid Budget Allocation value",
    });
  }

  // Consent 1
  if (data.consent1 !== true) {
    errors.push({ field: "consent1", message: "You must agree to the terms" });
  }

  // Consent 2
  if (data.consent2 !== true) {
    errors.push({ field: "consent2", message: "You must agree to the terms" });
  }

  return errors.length > 0 ? errors : null;
}
