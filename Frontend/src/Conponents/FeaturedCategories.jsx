import React from 'react';
import { 
  Sprout, 
  Leaf, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Baby, 
  Heart, 
  Wrench, 
  Landmark, 
  Wallet, 
  FlaskConical, 
  Smartphone, 
  Truck, 
  Store
} from "lucide-react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    name: "Agriculture",
    icon: Sprout,
    count: "150+ schemes",
    description: "Farming, irrigation, and rural development programs",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    name: "Rural & Environment",
    icon: Leaf,
    count: "100+ schemes",
    description: "Village development, forestry, and environmental protection",
    color: "bg-lime-50 text-lime-700 border-lime-200",
  },
  {
    name: "Social welfare & Empowerment",
    icon: Users,
    count: "200+ schemes",
    description: "Support for women, elderly, and disadvantaged groups",
    color: "bg-pink-50 text-pink-700 border-pink-200",
  },
  {
    name: "Education & Learning",
    icon: GraduationCap,
    count: "120+ schemes",
    description: "Scholarships, schools, and higher education support",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    name: "Business & Entrepreneurship",
    icon: Briefcase,
    count: "110+ schemes",
    description: "Startup funding, MSME, and industrial support",
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    name: "Women and Child",
    icon: Baby,
    count: "90+ schemes",
    description: "Schemes for women empowerment and child development",
    color: "bg-pink-100 text-pink-700 border-pink-300",
  },
  {
    name: "Health & Wellness",
    icon: Heart,
    count: "95+ schemes",
    description: "Medical insurance, public health, and wellness programs",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    name: "Skills & Employment",
    icon: Wrench,
    count: "80+ schemes",
    description: "Skill training, jobs, and employment guarantee programs",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    name: "Banking",
    icon: Landmark,
    count: "70+ schemes",
    description: "Banking services, accounts, and loans",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Financial Services and Insurance",
    icon: Wallet,
    count: "60+ schemes",
    description: "Financial aid, credit, and insurance services",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    name: "Science",
    icon: FlaskConical,
    count: "50+ schemes",
    description: "Research, technology, and scientific development",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    name: "IT & Communications",
    icon: Smartphone,
    count: "65+ schemes",
    description: "Digital services, IT, and communication infrastructure",
    color: "bg-sky-50 text-sky-700 border-sky-200",
  },
  // {
  //   name: "Transport & Infrastructure",
  //   icon: Truck,
  //   count: "85+ schemes",
  //   description: "Roads, railways, and infrastructure development",
  //   color: "bg-gray-50 text-gray-700 border-gray-200",
  // },
];

export default categories;


export function FeaturedCategories() {

  const selector = useSelector(store => store.dashData.items);
  const navigate = useNavigate();

  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Browse by Category</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore government schemes organized by different sectors and areas of focus
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.name} 
                onClick={() => navigate("/search", {state: {
                  categorySelected: category.name
                }})}
                className="group cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-lg p-3 ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-semibold transition-colors group-hover:text-primary">
                          {category.name}
                        </h3>
                        <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                          {selector.category[category.name].length}+ Schemes 
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
