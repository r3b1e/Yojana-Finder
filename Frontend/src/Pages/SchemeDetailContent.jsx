import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  MapPin,
  Calendar,
  FileText,
  CheckCircle,
  Users,
  DollarSign,
  Globe,
  Share2,
  Bookmark,
} from "lucide-react";
import { sampleScheme } from "../lib/sample-scheme";
import { useLocation, useParams } from "react-router-dom";
import {Link} from "react-router-dom"
import axios from "axios";
import { Loader } from "../Conponents/Loader";
import { baseUrl } from "../lib/base";

// Props: { scheme: Object }
export function SchemeDetailContent() {

  // const scheme = sampleScheme;
  const [language, setLanguage] = useState("en");
  const location = useLocation()
  const { slug } = useParams();

 const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [schemeCards, setSchemeCards] = useState([]);
  const [isSaved, setisSaved] = useState(false);
   const [tab, setTab] = useState("overview");

  const getDataBySlug = async() => {
    setLoading(true); // Start loading
    try {
      // 2. Fetch data using the slug
      // NOTE: Replace this with your actual API call structure!
      const res = await axios.get(`${baseUrl}/scheme/by/${slug}`);
      
      // 3. Update the component state with the fetched data
      setScheme(res.data); 
    } catch (error) {
      console.error("Error fetching scheme details:", error);
    } finally {
      setLoading(false); // End loading regardless of success/fail
    }
  }



  useEffect(() => {
    if (location.state?.scheme) {
      setScheme(location.state.scheme);
      setLoading(false);
    } else {
      getDataBySlug();
    }
  }, [location.state?.scheme]); // Dependency array ensures this runs when state changes

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("Schemes")) || [];
    storedCards.forEach(element => {
      if(element._id === scheme?._id){
        setisSaved(true);
      }
    });
    setSchemeCards(storedCards);
    console.log(storedCards)
  }, [scheme])
    // --- Render Logic ---

  if (loading) {
    return <Loader />;
  }
  
  if (!scheme) {
    return <div>Scheme not found or failed to load.</div>;
  }

  const name = scheme.scheme_name[language];
  const details = scheme.details[language];
  const benefits = scheme.benefits[language];
  const eligibility = scheme.eligibility[language];
  const applicationSteps = scheme.application[language];
  const documents = scheme.documents[language];
  const categories = scheme.schemeCategory[language];
  const tags = scheme.tags[language];

  // Simple Tabs implementation
 
  const handleSave = () => {

    if(!isSaved){
      console.log("hello");
    const allSaved = [...schemeCards, scheme]
    setSchemeCards(allSaved);
    localStorage.setItem("Schemes", JSON.stringify(allSaved));
    setisSaved(true);
    }
    else{
      const allSaved = schemeCards.filter((ele) => {
        return ele._id !==scheme._id;
      })
      setSchemeCards(allSaved)
      localStorage.setItem("Schemes", JSON.stringify(allSaved));
      setisSaved(false);
    }
    
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/search" className="hover:text-foreground">Search</Link>
        <span>/</span>
        <span className="text-foreground">Scheme Details</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/search">
              <button className="rounded border px-3 py-1 text-sm flex items-center gap-1 hover:bg-muted">
                <ArrowLeft className="h-4 w-4" />
                Back to Search
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <button
                className={`flex justify-center items-center px-3 py-1 text-sm rounded ${language === "en" ? "bg-primary text-primary-foreground" : "border"}`}
                onClick={() => setLanguage("en")}
              >
                <Globe className="h-4 w-4 mr-1" />English
              </button>
              <button
                className={`flex justify-center items-center px-3 py-1 text-sm rounded ${language === "hi" ? "bg-primary text-primary-foreground" : "border"}`}
                onClick={() => setLanguage("hi")}
              >
                <Globe className="h-4 w-4 mr-1" />हिंदी
              </button>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-balance mb-4">{name}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{scheme.level} Government Scheme</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: {new Date(scheme.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat, idx) => (
              <span key={idx} className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{cat}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="rounded border px-3 py-1 flex items-center gap-2 text-sm hover:bg-muted">
            <Share2 className="h-4 w-4" />Share
          </button>
          <button onClick={() => handleSave()} className={`rounded border px-3 py-1 flex items-center gap-2 text-sm ${isSaved ? "bg-primary text-primary-foreground cursor-pointer" : "cursor-pointer hover:bg-muted"}`}>
            <Bookmark className="h-4 w-4" />Save
          </button>
          {/* <button className="rounded bg-primary px-8 py-2 text-primary-foreground flex items-center gap-2 text-sm">
            Apply Now<ExternalLink className="h-4 w-4" />
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="space-y-6">
            <div className="mb-4 grid grid-cols-4 gap-2">
              {["overview", "eligibility", "application", "documents"].map((key) => (
                <button
                  key={key}
                  className={`px-3 py-2 rounded text-sm font-medium ${tab === key ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
                  onClick={() => setTab(key)}
                >
                  {key === "overview" ? "Overview" : key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <>
                <div className="rounded border bg-card mb-6">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <FileText className="h-5 w-5" />
                    <span className="font-semibold text-lg">Scheme Details</span>
                  </div>
                  <div className="p-4">
                    <p className="text-foreground leading-relaxed">{details}</p>
                  </div>
                </div>

                <div className="rounded border bg-card mb-6">
                  <div className="flex items-center gap-2 p-4 border-b">
                    <DollarSign className="h-5 w-5" />
                    <span className="font-semibold text-lg">Benefits & Financial Assistance</span>
                  </div>
                  <div className="p-4">
                    <p className="text-foreground leading-relaxed">{benefits}</p>
                  </div>
                </div>

                <div className="rounded border bg-card">
                  <div className="p-4 font-semibold text-lg">Tags</div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="rounded border px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {tab === "eligibility" && (
              <div className="rounded border bg-card">
                <div className="flex items-center gap-2 p-4 border-b">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold text-lg">Eligibility Criteria</span>
                </div>
                <div className="p-4">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">{eligibility}</p>
                </div>
              </div>
            )}

            {tab === "application" && (
              <div className="rounded border bg-card">
                <div className="flex items-center gap-2 p-4 border-b">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold text-lg">Application Process</span>
                </div>
                <div className="p-4 space-y-4">
                  {applicationSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "documents" && (
              <div className="rounded border bg-card">
                <div className="flex items-center gap-2 p-4 border-b">
                  <FileText className="h-5 w-5" />
                  <span className="font-semibold text-lg">Required Documents</span>
                </div>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* <div className="rounded border bg-card">
            <div className="p-4 border-b">
              <span className="font-semibold text-lg">Quick Actions</span>
            </div>
            <div className="p-4 space-y-3">
              <button className="w-full rounded bg-primary py-2 text-primary-foreground flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />Apply Online
              </button>
              <button className="w-full rounded border py-2 text-sm bg-transparent">
                Download Application Form
              </button>
              <button className="w-full rounded border py-2 text-sm bg-transparent">
                Check Application Status
              </button>
              <div className="border-b my-4"></div>
              <button className="w-full flex items-center gap-2 py-2 bg-transparent text-sm hover:bg-muted">
                <FileText className="h-4 w-4" />View Guidelines
              </button>
              <button className="w-full flex items-center gap-2 py-2 bg-transparent text-sm hover:bg-muted">
                <Users className="h-4 w-4" />Contact Support
              </button>
            </div>
          </div> */}
          <div className="rounded border bg-card">
            <div className="p-4 border-b"><span className="font-semibold text-lg">Scheme Information</span></div>
            <div className="p-4 space-y-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Scheme Level</span>
                <p className="text-sm font-medium">{scheme.level} Government</p>
              </div>
              <div className="border-b"></div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Categories</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {categories.map((category, idx) => (
                    <span key={idx} className="rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{category}</span>
                  ))}
                </div>
              </div>
              <div className="border-b"></div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                <p className="text-sm">{new Date(scheme.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="border-b"></div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Scheme ID</span>
                <p className="text-sm font-mono">{scheme._id}</p>
              </div>
            </div>
          </div>
          <div className="rounded border bg-card">
            <div className="p-4 border-b"><span className="font-semibold text-lg">Related Schemes</span></div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                Discover other schemes that might be relevant to your needs.
              </p>
              <button className="w-full mt-3 rounded border py-2 text-sm bg-transparent">
                View Similar Schemes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
