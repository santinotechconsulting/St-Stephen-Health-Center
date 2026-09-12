import React, { useState } from 'react';
import {
  HelpCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { LAB_TESTS, COMPLETE_CHECKUP_PACKAGE } from '../data/pharmacyData';
import { LabTest } from '../types';
import { formatCurrency, Currency } from '../utils/currency';

interface TestRecommenderProps {
  onSelectTest: (test: LabTest) => void;
  onSelectPackage: () => void;
  currency: Currency;
}

interface Scenario {
  id: string;
  badge: string;
  question: string;
  symptoms: string;
  recommendedTestIds: string[];
  isPackageRecommend?: boolean;
  advice: string;
}

export const TestRecommender: React.FC<TestRecommenderProps> = ({
  onSelectTest,
  onSelectPackage,
  currency,
}) => {
  const scenarios: Scenario[] = [
    {
      id: 'routine-school',
      badge: 'Back-to-School Readiness',
      question: 'Official School Fitness Form / New Enrolment',
      symptoms: 'Child is feeling well but school requires comprehensive laboratory screening & fitness certification.',
      recommendedTestIds: [],
      isPackageRecommend: true,
      advice: 'The Complete Back-to-School Health Bundle covers all 5 tests (Malaria, Typhoid, Hepatitis, Hemoglobin, Electrophoresis) plus the official medical fitness stamp at a 38% discount.',
    },
    {
      id: 'fever-chills',
      badge: 'Acute Fever',
      question: 'Fever, Chills, Body Warmth, Irritability',
      symptoms: 'Sudden temperature spike, sweating, body ache, or mosquito exposure.',
      recommendedTestIds: ['malaria-test', 'typhoid-test'],
      advice: 'In Bonamekano, acute fever is most frequently caused by Plasmodium falciparum malaria or early enteric typhoid fever. Both can be rapidly ruled out in under 25 minutes.',
    },
    {
      id: 'pale-fatigue',
      badge: 'Anemia & Nutrition',
      question: 'Pale Lips, Tiredness, Difficulty Focusing in Class',
      symptoms: 'Child seems sleepy, pale inner eyelids or palms, gets exhausted easily during physical play.',
      recommendedTestIds: ['blood-level-hemoglobin', 'hemoglobin-electrophoresis'],
      advice: 'A rapid hemoglobin check determines if blood iron levels are low, while hemoglobin electrophoresis checks for the sickle cell gene trait to prevent future crises.',
    },
    {
      id: 'stomach-fever',
      badge: 'Gastrointestinal',
      question: 'Stomach Pain, Poor Appetite, Digestive Upset',
      symptoms: 'Persistent abdominal discomfort, nausea, loose stools or loss of interest in meals.',
      recommendedTestIds: ['typhoid-test', 'hepatitis-screening'],
      advice: 'Foodborne or waterborne microbial infections like Typhoid fever or viral Hepatitis require timely laboratory detection to prevent liver inflammation.',
    },
    {
      id: 'sickle-profile',
      badge: 'Genetic Hemoglobin Check',
      question: 'Unknown Sickle Cell Status (AS, SS, AA)',
      symptoms: 'Parents have not yet determined child’s definitive hemoglobin genotype.',
      recommendedTestIds: ['hemoglobin-electrophoresis'],
      advice: 'Hemoglobin Electrophoresis is crucial for every African school child to identify hemoglobin variants (AA, AS, SS, AC) and guide sports safety, hydration, and medical care.',
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0].id);

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-blue-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#002f6c] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Parent Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#002f6c] tracking-tight uppercase font-display">
            WHICH TESTS DOES YOUR CHILD NEED?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Select your child's current health status or school requirement to receive instant diagnostic guidance.
          </p>
        </div>

        {/* Tab selector buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeScenarioId === sc.id
                  ? 'bg-[#002f6c] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              id={`scenario-btn-${sc.id}`}
            >
              {sc.badge}
            </button>
          ))}
        </div>

        {/* Selected Guidance Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-md max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase text-red-600 tracking-wider">
                Scenario Match:
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {currentScenario.question}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {currentScenario.symptoms}
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex-shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Doctor Protocol</span>
            </div>
          </div>

          <div className="my-5 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-950 leading-relaxed">
            <span className="font-bold text-[#002f6c] block mb-1">Clinical Assessment:</span>
            {currentScenario.advice}
          </div>

          {/* Action based on recommendation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-xs font-bold text-slate-600">
              Recommended Next Step:
            </span>

            {currentScenario.isPackageRecommend ? (
              <button
                onClick={onSelectPackage}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d81e27] hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                id="recommender-book-bundle"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Complete Back-to-School Bundle ({formatCurrency(COMPLETE_CHECKUP_PACKAGE.packagePriceXAF, currency)})</span>
              </button>
            ) : (
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {currentScenario.recommendedTestIds.map((tid) => {
                  const test = LAB_TESTS.find((t) => t.id === tid);
                  if (!test) return null;
                  return (
                    <button
                      key={test.id}
                      onClick={() => onSelectTest(test)}
                      className="px-4 py-2.5 rounded-lg bg-[#002f6c] hover:bg-[#001f47] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <span>Book {test.title} ({formatCurrency(test.discountedPriceXAF || test.priceXAF, currency)})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
