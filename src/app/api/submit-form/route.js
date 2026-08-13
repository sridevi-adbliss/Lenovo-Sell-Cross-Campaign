import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import FormSubmission from "@/models/formSubmission";
import { validateForm } from "@/lib/validator";
import { formSubmitLimiter } from "@/lib/rateLimiter";
import { runRateLimiter } from "@/lib/nextRateLimit";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    const submissions = await FormSubmission.find()
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await FormSubmission.countDocuments();

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await runRateLimiter(request, formSubmitLimiter);

    if (rateLimitResult.limited) {
      // Return rate limit response
      return NextResponse.json(
        rateLimitResult.data || {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        {
          status: rateLimitResult.status || 429,
          headers: rateLimitResult.headers || {},
        },
      );
    }

    // Proceed with form submission
    await connectDB();
    const body = await request.json();

    const sanitizeString = (value) =>
      value == null ? value : String(value).trim();

    const submissionData = {
      ...body,
      firstName: sanitizeString(body.firstName),
      lastName: sanitizeString(body.lastName),
      email: sanitizeString(body.email),
      phone: sanitizeString(body.phone),
      company: sanitizeString(body.company),
      industry: sanitizeString(body.industry),
      jobLevel: sanitizeString(body.jobLevel),
      jobTitle: sanitizeString(body.jobTitle),
      city: sanitizeString(body.city),
      decisionMaking: sanitizeString(body.decisionMaking),
      timelineEvaluation: sanitizeString(body.timelineEvaluation),
      aiServerRequirement: sanitizeString(body.aiServerRequirement),
      budgetAllocation: sanitizeString(body.budgetAllocation),
    };

    // Validate input
    const validationErrors = validateForm(submissionData);
    if (validationErrors) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 },
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      jobLevel,
      jobTitle,
      city,
      decisionMaking,
      timelineEvaluation,
      aiServerRequirement,
      budgetAllocation,
      consent1,
      consent2,
    } = submissionData;

    // Check for duplicate email
    const existingSubmission = await FormSubmission.findOne({ email });
    if (existingSubmission) {
      return NextResponse.json(
        { success: false, message: "This email has already been submitted" },
        { status: 409 },
      );
    }

    // Create submission
    const submission = new FormSubmission({
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      jobLevel,
      jobTitle,
      city,
      decisionMaking,
      timelineEvaluation,
      aiServerRequirement,
      budgetAllocation,
      consent1,
      consent2,
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    await submission.save();

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        data: submission,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
