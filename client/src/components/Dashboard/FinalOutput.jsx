import { FileText, Download, Zap } from 'lucide-react';

export default function FinalOutput({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-slide-in">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <FileText size={20} className="text-gray-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">Final Output</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Completed
            </span>
            {result.poweredBy && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                <Zap size={10} />
                {result.poweredBy}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            {result.summary || 'Analysis report generated successfully!'}
          </p>
          {result.reviewScore && (
            <p className="text-xs text-gray-400 mt-1">
              Review Score: {result.reviewScore} — Stored in 0G Storage Simulation
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FileText size={14} />
          View Result
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
          <Download size={14} />
          Download
        </button>
      </div>
    </div>
  );
}
