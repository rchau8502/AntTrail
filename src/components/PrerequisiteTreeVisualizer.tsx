import React from 'react'
import { PrerequisiteEvaluationTree } from '../academic-engine/types'
import { CheckCircle2, XCircle, ArrowRight, CornerDownRight } from 'lucide-react'

interface PrerequisiteTreeVisualizerProps {
  tree?: PrerequisiteEvaluationTree
}

export const PrerequisiteTreeVisualizer: React.FC<PrerequisiteTreeVisualizerProps> = ({ tree }) => {
  if (!tree) return null

  const renderNode = (node: PrerequisiteEvaluationTree, depth: number = 0) => {
    const isAnd = node.node.type === 'and'
    const isOr = node.node.type === 'or'
    const isGroup = isAnd || isOr

    return (
      <div key={node.label + depth} className={`flex flex-col ${depth > 0 ? 'ml-4 sm:ml-6 mt-1.5' : ''}`}>
        <div className="flex items-start gap-2">
          {depth > 0 && (
            <CornerDownRight className="h-3.5 w-3.5 text-slate-500 mt-1 shrink-0" />
          )}

          {node.satisfied ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 text-rose-400 mt-0.5 shrink-0" />
          )}

          <div className="flex-1 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`font-semibold ${node.satisfied ? 'text-slate-200' : 'text-rose-200'}`}>
                {node.label}
              </span>

              {isGroup && (
                <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono uppercase text-slate-400">
                  {isAnd ? 'ALL Required' : 'ONE Required'}
                </span>
              )}

              {node.satisfiedBy?.isTransferEquivalent && (
                <span className="inline-flex items-center gap-1 rounded bg-sky-950 px-1.5 py-0.5 text-[10px] font-medium text-sky-300 ring-1 ring-sky-500/30">
                  <ArrowRight className="h-2.5 w-2.5 text-sky-400" />
                  Transfer: {node.satisfiedBy.transferSource} ({node.satisfiedBy.grade})
                </span>
              )}
            </div>

            {node.explanation && !isGroup && (
              <p className={`mt-0.5 text-[11px] ${node.satisfied ? 'text-slate-400' : 'text-rose-300/80'}`}>
                {node.explanation}
              </p>
            )}
          </div>
        </div>

        {node.children && node.children.length > 0 && (
          <div className="border-l border-slate-800/80 pl-1 mt-1 space-y-1">
            {node.children.map((child, idx) => (
              <div key={idx}>{renderNode(child, depth + 1)}</div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-800/90 bg-slate-900/50 p-3.5 space-y-2">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Prerequisite Evaluation Breakdown
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
            tree.satisfied
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}
        >
          {tree.satisfied ? 'PASSED' : 'UNSATISFIED'}
        </span>
      </div>
      <div className="pt-1">{renderNode(tree, 0)}</div>
    </div>
  )
}
