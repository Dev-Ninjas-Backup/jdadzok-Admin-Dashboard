import {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsMutation,
} from "@/redux/features/cms/cmsApi";
import { FileText, Save } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type ContentTab = "about" | "privacy" | "terms";

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<ContentTab>("about");
  const [content, setContent] = useState("");

  const { data: aboutData } = useGetAboutUsQuery(undefined, {
    skip: activeTab !== "about",
  });
  const { data: privacyData } = useGetPrivacyPolicyQuery(undefined, {
    skip: activeTab !== "privacy",
  });
  const { data: termsData } = useGetTermsQuery(undefined, {
    skip: activeTab !== "terms",
  });

  const [updateAbout] = useUpdateAboutUsMutation();
  const [updatePrivacy] = useUpdatePrivacyPolicyMutation();
  const [updateTerms] = useUpdateTermsMutation();

  useEffect(() => {
    if (activeTab === "about") {
      setContent(aboutData?.about ?? aboutData?.data?.about ?? "");
    } else if (activeTab === "privacy") {
      setContent(privacyData?.text ?? privacyData?.data?.text ?? "");
    } else {
      setContent(termsData?.text ?? termsData?.data?.text ?? "");
    }
  }, [activeTab, aboutData, privacyData, termsData]);

  const handleSave = async () => {
    try {
      if (activeTab === "about") {
        await updateAbout({ about: content }).unwrap();
      } else if (activeTab === "privacy") {
        await updatePrivacy({ text: content }).unwrap();
      } else {
        await updateTerms({ text: content }).unwrap();
      }
      toast.success("Content saved");
    } catch {
      toast.error("Failed to save content");
    }
  };

  const tabs: { id: ContentTab; label: string }[] = [
    { id: "about", label: "About Us" },
    { id: "privacy", label: "Privacy Policy" },
    { id: "terms", label: "Terms & Conditions" },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl text-[#101828]">
            Content Management
          </h1>
          <p className="text-[#4A5565] text-sm sm:text-base">
            Edit public CMS pages served to the mobile app and website
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 cursor-pointer bg-[#030213] text-white rounded-lg px-4 py-2 text-sm"
        >
          <Save size={16} />
          Save
        </button>
      </div>

      <div className="flex flex-wrap gap-2 bg-[#ECECF0] rounded-full p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-[#0A0A0A] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#0000001a] rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-[#101828]">
          <FileText size={18} />
          <h2 className="font-medium">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          placeholder="Enter page content..."
          className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
    </div>
  );
}
