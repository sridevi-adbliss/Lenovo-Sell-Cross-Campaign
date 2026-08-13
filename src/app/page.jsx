"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import indianCities from "../data/cities";

export default function Home() {
  const formRef = useRef(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      industry: formData.get("industry"),
      jobLevel: formData.get("jobLevel"),
      jobTitle: formData.get("jobTitle"),
      city: formData.get("city"),
      decisionMaking: formData.get("decisionMaking"),
      timelineEvaluation: formData.get("timelineEvaluation"),
      aiServerRequirement: formData.get("aiServerRequirement"),
      budgetAllocation: formData.get("budgetAllocation"),
      consent1: formData.get("consent1") === "on",
      consent2: formData.get("consent2") === "on",
    };

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("result : ", result);
      if (!response.ok) {
        if (result.errors) {
          const errorMessages = result.errors.map((e) => e.message).join(", ");

          setSubmitError(errorMessages);
        } else {
          setSubmitError(
            result.message || "Failed to submit form. Please try again.",
          );
        }

        return;
      }
      // Download PDF
      const link = document.createElement("a");

      link.href = "/assets/ThinkSystem Neptune Enterprise Solutions Guide.pdf";

      link.download = "ThinkSystem Neptune Enterprise Solutions Guide.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset form
      form.reset();

      // Show Thank You message
      setShowThankYou(true);

      setTimeout(() => {
        setShowThankYou(false);
      }, 5000);
    } catch (error) {
      console.error("Network error:", error);

      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvalid = (e) => {
    e.target.setCustomValidity("Please fill in this field");
  };

  const handleInput = (e) => {
    e.target.setCustomValidity("");
  };

  return (
    <main className="bg-[#210022] text-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative w-full bg-[#EEDDEA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 lg:py-8">
          {/* Top Row - Lenovo Left, Intel Right */}
          <div className="flex items-center justify-between mb-6">
            {/* Left - Lenovo Tag */}
            <div>
              <Image
                src="/Images/lenovo_tag.png"
                alt="Lenovo"
                width={160}
                height={55}
                className="w-28 md:w-36 h-auto"
              />
            </div>

            {/* Right - Intel Logo */}
            <div className="flex flex-col items-end montserrat-font">
              <p className="text-black text-[11px] sm:text-[12px] uppercase tracking-wider font-medium">
                Powered by
              </p>
              <Image
                src="/images/intel.png"
                alt="Intel"
                width={60}
                height={28}
                style={{ width: "auto", height: "auto" }}
                className="object-contain my-1"
              />
              <p className="text-black text-[10px] sm:text-[12px] font-medium text-center md:text-right">
                That's the power of Lenovo with Intel inside<sup>®</sup>
              </p>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-[24px] md:text-[36px] font-bold leading-tight text-left text-[#4D144A] max-w-4xl mb-6">
            Partner with Lenovo for more efficient hybrid AI
          </h1>

          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-[1200px] h-[400px] overflow-hidden">
              <Image
                src="/Images/hero.png"
                alt="Hero Image"
                width={1200}
                height={300}
                priority
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= AI WORK HAS CHANGED ================= */}
      <section
        className="py-10 lg:py-12"
        style={{
          backgroundColor: "#f8f9f9",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-6 text-[#1E0013]">
              <p className="text-black text-[18px] font-bold leading-8">
                No matter where you are in your hybrid AI journey, Lenovo and
                Intel® can help you get there faster with deep expertise,
                market-leading server solutions, and expert services.
              </p>

              <p className="text-black text-[18px] leading-8">
                Lenovo ThinkSystem servers, powered by Intel® Xeon® processors
                with built-in AI acceleration, offer both performance and
                flexibility –{" "}
                <strong>
                  delivering 5.5x better AI inferencing performance than
                  competing processors.1{" "}
                </strong>
              </p>

              <p className="text-black text-[18px] leading-8">
                Pay as you go with Lenovo TruScale and experience scalability in
                ways that traditional procurement methods can't match.
                TruScale's end-to-end services include initial consultation,
                analysis, and configuration through ongoing assessment,
                maintenance services, and remote monitoring. Pricing structures
                are simple and include all associated services in one monthly
                bill.
              </p>

              <p className="text-black text-[18px] leading-8">
                Optimizing your data center with Lenovo ThinkSystem servers,
                powered by Intel® Xeon® 6 processors – efficiently supported by
                Lenovo TruScale –
                <strong>
                  {" "}
                  can help reduce CO2e and power consumption up to 20%.2{" "}
                </strong>
              </p>

              <p className="text-black text-[18px] leading-8">
                Find out how much you can reduce your total cost of ownership
                and experience the full benefits of hybrid AI by partnering with
                Lenovo and Intel®.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="text-center mb-3">
              <p className="mt-2 text-base text-black">
                Fill out the form below to download exclusive whitepaper on
                'ThinkSystem Neptune Enterprise Infographics'.
              </p>
            </div>

            {/* White Form Card */}
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-xl px-4 sm:px-6 lg:px-8 py-6">
                <form
                  ref={formRef}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  {/* First Name */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Business Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Business Phone */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Business Phone*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Company*
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Industry*
                    </label>
                    <select
                      name="industry"
                      required
                      defaultValue=""
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Government">Government</option>
                    </select>
                  </div>

                  {/* Job Level */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Job Level*
                    </label>
                    <input
                      type="text"
                      name="jobLevel"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Job Title*
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      required
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    />
                  </div>

                  {/* City */}
                  <div className="sm:col-span-2 relative">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      City*
                    </label>

                    {/* Hidden input for form submission */}
                    <input type="hidden" name="city" value={selectedCity} />

                    {/* Search input */}
                    <input
                      type="text"
                      value={citySearch}
                      placeholder="Search City"
                      required={!selectedCity}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        setSelectedCity("");
                        setShowCityDropdown(true);
                      }}
                      onFocus={() => setShowCityDropdown(true)}
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                    />

                    {/* Dropdown */}
                    {showCityDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {indianCities
                          .filter((city) =>
                            city
                              .toLowerCase()
                              .includes(citySearch.toLowerCase()),
                          )
                          .map((city) => (
                            <button
                              key={city}
                              type="button"
                              onClick={() => {
                                setSelectedCity(city);
                                setCitySearch(city);
                                setShowCityDropdown(false);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-black hover:bg-gray-100"
                            >
                              {city}
                            </button>
                          ))}

                        {indianCities.filter((city) =>
                          city.toLowerCase().includes(citySearch.toLowerCase()),
                        ).length === 0 && (
                          <div className="px-3 py-2 text-sm text-gray-500">
                            No cities found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Decision Making */}
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Are you directly involved in decision-making for server,
                      infrastructure, or AI investment projects?*
                    </label>
                    <select
                      name="decisionMaking"
                      required
                      defaultValue=""
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Timeline for Evaluation */}
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      What is your expected timeline for evaluating or
                      implementing new infrastructure solutions?*
                    </label>
                    <select
                      name="timelineEvaluation"
                      required
                      defaultValue=""
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    >
                      <option value="">Select Timeline</option>
                      <option value="0-3">0 to 3 months</option>
                      <option value="3-6">3 to 6 months</option>
                      <option value="6-9">6 to 9 months</option>
                      <option value="9-12">9 to 12 months</option>
                    </select>
                  </div>

                  {/* AI-Ready Server Requirement */}
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Does your organization currently have a requirement to
                      upgrade or deploy new AI-ready servers or infrastructure?*
                    </label>
                    <select
                      name="aiServerRequirement"
                      required
                      defaultValue=""
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>

                  {/* Budget Allocation */}
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-medium text-gray-700 mb-1">
                      Has your organization allocated a budget for AI-ready
                      infrastructure or data center modernization initiatives?*
                    </label>
                    <select
                      name="budgetAllocation"
                      required
                      defaultValue=""
                      className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-black bg-white focus:outline-none focus:border-[#E2231A] focus:ring-2 focus:ring-[#E2231A]/20 transition"
                      onInvalid={handleInvalid}
                      onInput={handleInput}
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="planned">
                        Planned for next fiscal year
                      </option>
                      <option value="not-sure">Not sure</option>
                    </select>
                  </div>

                  {/* Consent 1 */}
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer leading-6">
                      <input
                        type="checkbox"
                        name="consent1"
                        required
                        className="mt-1 accent-[#E2231A]"
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "You must agree to continue",
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                      />
                      <span>
                        By completing this form, you are confirming you are
                        <strong> 18 years of age or older.</strong>
                      </span>
                    </label>
                  </div>

                  {/* Consent 2 */}
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer leading-6">
                      <input
                        type="checkbox"
                        name="consent2"
                        required
                        className="mt-1 accent-[#E2231A]"
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            "You must agree to continue",
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                      />
                      <span>
                        By submitting this form, you agree to Lenovo Group of
                        Companies and Businestech contacting you for
                        marketing-related communications. You also acknowledge
                        that you have read and understood the applicable privacy
                        policies.
                      </span>
                    </label>
                  </div>

                  {submitError && (
                    <div className="md:col-span-2 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                      {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="sm:col-span-2 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-10 bg-[#0D6EFD] hover:bg-[#0B5ED7] disabled:bg-blue-300 text-white text-sm font-semibold rounded-md transition"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>

                {/* Thank You Message */}
                {showThankYou && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-400 rounded-md animate-fadeIn">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-green-800 font-semibold text-lg">
                          Thank You!
                        </h4>
                        <p className="text-green-700 text-sm">
                          A Lenovo representative will be in contact with you
                          soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <Image
        src="/Images/discussion.png"
        alt="Discussion"
        width={1920}
        height={600}
        className="w-full h-auto"
      />

      {/* ================= FOOTER ================= */}
      {/* <footer className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-gray-300 space-y-2 text-center md:text-left">
            <p>© 2026 Lenovo. All rights reserved.</p>
            <p>
              © 2026 AdBliss Digital Media LLP, Bangalore, Karnataka, India.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-4">
              <div className="px-5 py-2 rounded">
                <Image
                  src="/Images/intel.png"
                  alt="Intel"
                  width={80}
                  height={28}
                  className="h-auto w-[80px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm uppercase tracking-wider text-gray-400 mb-2">
                  Powered by
                </span>
                <div className="bg-[#E2231A] px-5 py-2 rounded">
                  <Image
                    src="/Images/lenovo_tag.png"
                    alt="Lenovo"
                    width={80}
                    height={28}
                    className="h-auto w-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer> */}
      <footer className="bg-black text-white py-6">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-44">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left - AdBliss */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <p className="text-[11px] sm:text-[12px] text-gray-300">
                © 2026 AdBliss Digital Media LLP
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-400">
                Bangalore, Karnataka, India
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-400 mt-1">
                © 2026 Lenovo. All rights reserved.
              </p>
            </div>

            {/* Center - Lenovo Logo */}
            <Image
              src="/images/lenovo_tag.png"
              alt="Lenovo"
              width={120}
              height={38}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />

            {/* Right - Powered by with Intel */}
            <div className="flex flex-col items-center sm:items-end">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400">
                Powered by
              </p>
              <Image
                src="/images/intel.png"
                alt="Intel"
                width={55}
                height={25}
                style={{ width: "auto", height: "auto" }}
                className="object-contain my-1"
              />
              <p className="text-[8px] sm:text-[9px] text-gray-300 text-center sm:text-right">
                That's the power of Lenovo with Intel inside<sup>®</sup>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
