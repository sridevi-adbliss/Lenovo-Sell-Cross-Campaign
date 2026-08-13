import mongoose from "mongoose";

const formSubmissionSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxLength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxLength: [100, "Company name cannot exceed 100 characters"],
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
      trim: true,
      maxLength: [100, "Industry cannot exceed 100 characters"],
    },
    jobLevel: {
      type: String,
      required: [true, "Job level is required"],
      trim: true,
      maxLength: [100, "Job level cannot exceed 100 characters"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxLength: [100, "Job title cannot exceed 100 characters"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxLength: [50, "City name cannot exceed 50 characters"],
    },
    decisionMaking: {
      type: String,
      required: [true, "Decision Making is required"],
      enum: ["yes", "no"],
    },
    timelineEvaluation: {
      type: String,
      required: [true, "Timeline Evaluation is required"],
      enum: ["0-3", "3-6", "6-9", "9-12"],
    },
    aiServerRequirement: {
      type: String,
      required: [true, "Ai Server Requirement is required"],
      enum: ["yes", "no"],
    },
    budgetAllocation: {
      type: String,
      trim: true,
      required: [true, "Budget Allocation is required"],
      enum: ["yes", "no", "planned", "not-sure"],
    },
    consent1: {
      type: Boolean,
      required: [true, "Consent is required"],
      default: false,
    },
    consent2: {
      type: Boolean,
      required: [true, "Consent is required"],
      default: false,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

formSubmissionSchema.index({ email: 1 });
formSubmissionSchema.index({ submittedAt: -1 });

formSubmissionSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.ipAddress;
  delete obj.userAgent;
  return obj;
};

const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", formSubmissionSchema);

export default FormSubmission;
