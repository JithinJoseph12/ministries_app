// app/ministry/page.jsx
"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, X, HelpCircle, Heart, Users, Globe, Mail, Calendar, 
  MapPin, Target, BookOpen, CheckCircle, FileText, ImagePlus,
  Church, ChevronDown, Bold, Italic, Underline, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, Undo2, Redo2, Lightbulb, Check,  Info,

  BriefcaseBusiness,
  ImageIcon,

  ClipboardCheck,
} from "lucide-react";

const MinistryPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    // Basic Information
    ministryName: "",
    category: "",
    missionStatement: "",
    fullDescription: "",
    // Ministry Details
    yearFounded: "",
    primaryLocation: "",
    serviceArea: "",
    website: "",
    email: "",
    leader: "",
    // Additional Information
    whatWeDo: "",
    whoWeServe: "",
    // Logo
    ministryLogo: null,
    logoPreview: null,
  });

  const [logoError, setLogoError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedServiceArea, setSelectedServiceArea] = useState("");
  const [charCount, setCharCount] = useState(0);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Mock data for selects
  const categories = [
    "Worship & Music",
    "Teaching & Discipleship",
    "Outreach & Evangelism",
    "Prayer & Intercession",
    "Youth & Young Adults",
    "Children's Ministry",
    "Men's Ministry",
    "Women's Ministry",
    "Marriage & Family",
    "Counseling & Care",
    "Missions",
    "Administration",
  ];

  const serviceAreas = [
    "Local Community",
    "City-wide",
    "Regional",
    "National",
    "International",
    "Online Global",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle description change with character count
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, fullDescription: value }));
    setCharCount(value.length);
  };

  // Handle select changes
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleServiceAreaChange = (e) => {
    const value = e.target.value;
    setSelectedServiceArea(value);
    setFormData((prev) => ({ ...prev, serviceArea: value }));
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setLogoError("Only PNG, JPG, or SVG files are allowed (Max 5MB)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("File size must be less than 5MB");
      return;
    }

    setLogoError("");
    setFormData((prev) => ({ ...prev, ministryLogo: file }));

    // Create preview for non-SVG files
    if (file.type !== "image/svg+xml") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // For SVG, create a blob URL
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logoPreview: url }));
    }
  };

  const removeLogo = () => {
    if (formData.logoPreview && formData.logoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.logoPreview);
    }
    setFormData((prev) => ({ ...prev, ministryLogo: null, logoPreview: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = async (e, action) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.ministryName.trim()) {
      alert("Please enter a ministry name");
      return;
    }
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    if (!formData.missionStatement.trim()) {
      alert("Please enter a mission statement");
      return;
    }
    
    if (action === "publish") {
      try {
        setIsSubmitting(true);
        const response = await fetch("/api/ministries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setShowSuccessPopup(true);
          setTimeout(() => setShowSuccessPopup(false), 3000);
          handleCancel(false); // Reset the form after success
        } else {
          alert(`Error: ${data.message || "Failed to publish ministry"}`);
        }
      } catch (error) {
        console.error("Submit error:", error);
        alert("An error occurred while publishing the ministry.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log(`${action}:`, formData);
      alert(`Ministry profile saved as draft successfully!`);
    }
  };

  const handleCancel = (showConfirm = true) => {
    if (!showConfirm || window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      setFormData({
        ministryName: "",
        category: "",
        missionStatement: "",
        fullDescription: "",
        yearFounded: "",
        primaryLocation: "",
        serviceArea: "",
        website: "",
        email: "",
        leader: "",
        whatWeDo: "",
        whoWeServe: "",
        ministryLogo: null,
        logoPreview: null,
      });
      setSelectedCategory("");
      setSelectedServiceArea("");
      setLogoError("");
      setCharCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Info,
      label: "General Information",
      id: "general-information",
    },
    {
      icon: FileText,
      label: "Details",
      id: "details",
    },
    {
      icon: ImageIcon,
      label: "Media",
      id: "media",
    },
    {
      icon: Target,
      label: "Additional Information",
      id: "additional-information",
    },
    {
      icon: ClipboardCheck,
      label: "Review & Publish",
      id: "review-publish",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Animated Success Popup */}
      <div 
        className={`fixed top-6 right-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-500 z-50 ${
          showSuccessPopup ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="bg-emerald-100 p-1.5 rounded-full">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h4 className="font-semibold text-emerald-900">Successfully Added</h4>
          <p className="text-sm text-emerald-700">The ministry has been published.</p>
        </div>
      </div>

      <main className="flex-1">
        <div className="p-8 max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-500 mb-1">Ministry / Add New Ministry</div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#1e3a8a" }}>Add New Ministry</h1>
            <p className="text-gray-500 mt-1">Fill in the details below to create a new ministry profile.</p>
          </div>

          <div
  className="bg-white rounded-2xl border border-[#e8edf5] flex items-center overflow-hidden mb-8"
  style={{
    height: "66px",
  }}
>
  {steps.map((step, index) => {
    const Icon = step.icon;
    const isActive = index === currentStep;

    return (
      <button
        key={index}
        type="button"
        onClick={() => {
          setCurrentStep(index);
          const element = document.getElementById(step.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="relative flex-1 h-full flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
      >
        {isActive && (
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: "3px",
              background: "#D6A646",
            }}
          />
        )}

        <Icon
          size={18}
          strokeWidth={2}
          style={{
            color: isActive ? "#D6A646" : "#6B7280",
          }}
        />

        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: isActive ? "#D6A646" : "#243B63",
          }}
        >
          {step.label}
        </span>
      </button>
    );
  })}
</div>

          <form onSubmit={(e) => handleSubmit(e, "publish")}>
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-8 space-y-8">
                {/* 1. Basic Information */}
                <div id="general-information" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <Church size={18} strokeWidth={2} style={{ color: "#3B5FBF" }} />
                    </div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      1. Basic Information
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ministry Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="ministryName"
                        value={formData.ministryName}
                        onChange={handleChange}
                        placeholder="Enter ministry name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                      <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mission Statement <span className="text-red-500">*</span></label>
                      <textarea
                        name="missionStatement"
                        value={formData.missionStatement}
                        onChange={handleChange}
                        rows="3"
                        placeholder="What is your ministry's mission?"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-semibold text-gray-700">Full Description</label>
                        <span className="text-xs text-gray-400">{charCount}/60 minimum</span>
                      </div>
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "1px solid #e8edf5",
                          background: "#fff",
                        }}
                      >
                        {/* Toolbar */}
                        <div
                          className="flex items-center gap-4 px-4 h-11 border-b"
                          style={{ borderColor: "#e8edf5" }}
                        >
                          <button
                            type="button"
                            className="flex items-center gap-1 text-sm"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: "#243B63",
                            }}
                          >
                            Paragraph
                            <ChevronDown size={14} />
                          </button>
                          <Bold size={15} />
                          <Italic size={15} />
                          <Underline size={15} />
                          <List size={15} />
                          <ListOrdered size={15} />
                          <AlignLeft size={15} />
                          <AlignCenter size={15} />
                          <AlignRight size={15} />
                          <Undo2 size={15} className="ml-auto text-gray-400" />
                          <Redo2 size={15} className="text-gray-400" />
                        </div>

                        {/* Textarea */}
                        <textarea
                          name="fullDescription"
                          value={formData.fullDescription}
                          onChange={handleDescriptionChange}
                          placeholder="Provide a detailed description of your ministry, programs, and purpose."
                          className="w-full resize-none outline-none p-4"
                          style={{
                            height: "180px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "15px",
                            color: "#243B63",
                          }}
                        />

                        {/* Bottom counter */}
                        <div
                          className="flex justify-end px-4 py-2 text-xs"
                          style={{
                            color: "#9AAAC0",
                            borderTop: "1px solid #f5f7fb",
                          }}
                        >
                          {formData.fullDescription.length}/2000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Ministry Details */}
                <div id="details" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <FileText size={18} strokeWidth={2} style={{ color: "#3B5FBF" }} />
                    </div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      2. Ministry Details
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Year Founded</label>
                        <input
                          type="text"
                          name="yearFounded"
                          value={formData.yearFounded}
                          onChange={handleChange}
                          placeholder="YYYY"
                          maxLength="4"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Location</label>
                        <input
                          type="text"
                          name="primaryLocation"
                          value={formData.primaryLocation}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Service Area</label>
                      <select
                        value={selectedServiceArea}
                        onChange={handleServiceAreaChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      >
                        <option value="">Select service area</option>
                        {serviceAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Ministry Leader </label>
                      <input
                        type="text"
                        name="leader"
                        value={formData.leader}
                        onChange={handleChange}
                        placeholder="Leader name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Website (optional)</label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="info@example.com"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>



                {/* 4. Ministry Logo */}
                <div id="media" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <ImagePlus size={18} strokeWidth={2} style={{ color: "#3B5FBF" }} />
                    </div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      3. Ministry Logo
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition cursor-pointer bg-gray-50">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logoUpload"
                        ref={fileInputRef}
                      />
                      <label htmlFor="logoUpload" className="cursor-pointer block">
                        <div className="text-3xl mb-2">⬆️</div>
                        <div className="text-gray-600 font-medium">Click to upload logo</div>
                        <div className="text-xs text-gray-400 mt-1">PNG, JPG or SVG (Max. 5MB)</div>
                        {formData.ministryLogo && <p className="text-sm text-green-600 mt-2">{formData.ministryLogo.name}</p>}
                        {logoError && <p className="text-sm text-red-500 mt-2">{logoError}</p>}
                      </label>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Recommended size: 400x400px</p>
                      <p>• This logo will appear in ministry cards</p>
                      <p>• Choose a high-quality, recognizable logo</p>
                    </div>
                  </div>
                  {formData.logoPreview && (
                    <div className="mt-4 relative inline-block">
                      <div className="w-32 h-32 rounded-2xl border-2 border-gray-200 overflow-hidden bg-gray-50 shadow-md">
                        <img
                          src={formData.logoPreview}
                          alt="Ministry logo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-md"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                                {/* 3. Additional Information */}
                <div id="additional-information" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "#EEF4FF",
                        border: "1px solid #DCE6F8",
                      }}
                    >
                      <Target size={18} strokeWidth={2} style={{ color: "#3B5FBF" }} />
                    </div>
                    <h2
                      className="text-xl font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1e3a8a",
                      }}
                    >
                      4. Additional Information
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">What We Do</label>
                      <textarea
                        name="whatWeDo"
                        value={formData.whatWeDo}
                        onChange={handleChange}
                        rows="3"
                        placeholder="List the key areas of service or ministry. e.g., Prayer, Outreach, Counseling..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Who We Serve</label>
                      <textarea
                        name="whoWeServe"
                        value={formData.whoWeServe}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Who is your ministry intended to serve? e.g., Families, Youth, Those in Need..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div id="review-publish" className="flex justify-end gap-3 pt-2 pb-8 scroll-mt-24">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, "draft")}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition shadow-sm disabled:bg-blue-400"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Ministry"}
                  </button>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-4 space-y-6">
  

                {/* Tips */}
                <div className="bg-white rounded-2xl border border-[#e8edf5] p-6 shadow-sm">
                  {/* Heading */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#FFF8E8]">
                      <Lightbulb size={18} strokeWidth={2} style={{ color: "#D4A017" }} />
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#1e3a8a",
                      }}
                    >
                      Tips
                    </h3>
                  </div>

                  {/* Tips List */}
                  <ul className="space-y-4">
                    {[
                      "Use a clear and engaging ministry name",
                      "Write a strong mission statement",
                      "Add a detailed description of your work",
                      "Upload a high-quality, recognizable logo",
                      "Keep contact information up to date",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check
                          size={16}
                          strokeWidth={3}
                          style={{ color: "#4CAF72", flexShrink: 0 }}
                        />
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: "#243B63",
                            lineHeight: "1.6",
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-[#e8edf5] p-5 shadow-sm">
  <div className="flex items-start gap-3">
    {/* Icon */}
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{
        background: "#FFF7F7",
      }}
    >
      <Heart
        size={17}
        strokeWidth={2}
        style={{
          color: "#E98C8C",
        }}
      />
    </div>

    {/* Content */}
    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#1e3a8a",
          lineHeight: "1.2",
          marginBottom: "10px",
        }}
      >
        Why This Matters
      </h3>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: "#6B7280",
          lineHeight: "1.7",
          fontWeight: 500,
        }}
      >
        A complete ministry profile helps others discover and connect with your mission.
      </p>
    </div>
  </div>
</div>

                {/* Need Help */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-[22px] mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1e3a8a" }}>🎧 Need Help?</h3>
                  <p className="text-sm text-gray-500 mb-4">If you need assistance adding your ministry, our team is here to help.</p>
                  <button type="button" className="border border-gray-300 rounded-lg px-4 py-2 text-blue-700 font-medium hover:bg-gray-50 transition text-left">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MinistryPage;