'use client';
import { TrendingUp, Shield, BarChart3, CheckCircle, AlertTriangle, XCircle, Brain } from 'lucide-react';
import ScoreRing from './ScoreRing';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props { analysis: any; landTitle?: string; }

const riskColors: any = { low: 'text-brand-400 bg-brand-950 border-brand-900', medium: 'text-yellow-400 bg-yellow-950 border-yellow-900', high: 'text-red-400 bg-red-950 border-red-900' };
const verdictConfig: any = {
  buy: { label: 'Strong Buy', color: 'text-brand-400', bg: 'bg-brand-950 border-brand-900', icon: CheckCircle },
  hold: { label: 'Hold / Wait', color: 'text-yellow-400', bg: 'bg-yellow-950 border-yellow-900', icon: AlertTriangle },
  avoid: { label: 'Avoid', color: 'text-red-400', bg: 'bg-red-950 border-red-900', icon: XCircle },
};

export default function AIAnalysisCard({ analysis, landTitle }: Props) {
  const verdict = verdictConfig[analysis.verdict] || verdictConfig.hold;
  const VerdictIcon = verdict.icon;

  const projectionData = analysis.priceProjection ? [
    { year: 'Now', price: analysis.priceProjection.currentFairValue || 0 },
    { year: 'Y1', price: analysis.priceProjection.year1 || 0 },
    { year: 'Y2', price: analysis.priceProjection.year2 || 0 },
    { year: 'Y3', price: analysis.priceProjection.year3 || 0 },
    { year: 'Y4', price: analysis.priceProjection.year4 || 0 },
    { year: 'Y5', price: analysis.priceProjection.year5 || 0 },
  ] : [];

  return (
    <div className="space-y-5">
      {/* Header scores */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Brain className="w-5 h-5 text-brand-400" />
          <h3 className="font-bold text-white">AI Analysis Report</h3>
          {landTitle && <span className="text-sm text-gray-500">— {landTitle}</span>}
        </div>
        <div className="flex flex-wrap items-center gap-8 mb-5">
          <ScoreRing score={analysis.overallScore} size={100} label="Overall" />
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{analysis.investmentScore}</p>
              <p className="text-xs text-gray-500">Investment Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{analysis.riskScore}</p>
              <p className="text-xs text-gray-500">Risk Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">{analysis.rentalYield || 'N/A'}%</p>
              <p className="text-xs text-gray-500">Rental Yield</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{analysis.annualAppreciation || 'N/A'}%</p>
              <p className="text-xs text-gray-500">Annual Growth</p>
            </div>
          </div>
          <div className={`px-5 py-3 rounded-xl border ${verdict.bg} flex items-center gap-2`}>
            <VerdictIcon className={`w-5 h-5 ${verdict.color}`} />
            <div>
              <p className="text-xs text-gray-400">AI Verdict</p>
              <p className={`font-bold ${verdict.color}`}>{verdict.label}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed bg-surface rounded-xl p-4 border border-surface-border">
          {analysis.summary}
        </p>
      </div>

      {/* Price Projection Chart */}
      {projectionData.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-brand-400" />
            <h4 className="font-semibold text-white">5-Year Price Projection (৳)</h4>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={projectionData} barSize={32}>
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: '#161b27', border: '1px solid #1e2736', borderRadius: '12px', color: '#fff' }}
                formatter={(v: any) => [`৳${Number(v).toLocaleString()}`, 'Price']}
              />
              <Bar dataKey="price" radius={[6, 6, 0, 0]}>
                {projectionData.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? '#374151' : `rgba(34, 197, 94, ${0.3 + i * 0.12})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Risk Factors */}
      {analysis.riskFactors?.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-yellow-400" />
            <h4 className="font-semibold text-white">Risk Factors</h4>
          </div>
          <div className="space-y-3">
            {analysis.riskFactors.map((risk: any, i: number) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${riskColors[risk.severity] || riskColors.medium}`}>
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">{risk.factor}</p>
                  <p className="text-xs opacity-80 mt-0.5">{risk.description}</p>
                </div>
                <span className="ml-auto text-xs font-medium capitalize px-2 py-0.5 rounded-full bg-black/20">{risk.severity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Recommendations */}
      <div className="grid md:grid-cols-2 gap-5">
        {analysis.strengths?.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-brand-400" />
              <h4 className="font-semibold text-white text-sm">Strengths</h4>
            </div>
            <ul className="space-y-2">
              {analysis.strengths.map((s: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-brand-400 mt-0.5">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {analysis.recommendations?.length > 0 && (
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <h4 className="font-semibold text-white text-sm">Recommendations</h4>
            </div>
            <ul className="space-y-2">
              {analysis.recommendations.map((r: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-400 mt-0.5">→</span> {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {analysis.bestUseCase && (
        <div className="card p-4 flex items-center gap-3 bg-brand-950 border-brand-900">
          <Brain className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-400">Best Use Case</p>
            <p className="text-sm font-medium text-white">{analysis.bestUseCase}</p>
          </div>
        </div>
      )}

      {analysis.analyzedAt && (
        <p className="text-xs text-gray-600 text-center">
          Analyzed {new Date(analysis.analyzedAt).toLocaleDateString('en-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
    </div>
  );
}
