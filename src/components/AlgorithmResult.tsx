import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from 'lucide-react';

interface AlgorithmResultProps {
  result: any;
  algorithm: string;
}

const AlgorithmResult: React.FC<AlgorithmResultProps> = ({ result, algorithm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-10 rounded-lg shadow-2xl mt-10 w-full max-w-6xl text-gray-100"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white">
        {algorithm.toUpperCase()} Simulation Steps
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {result.result.map((step: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-green-50/5 p-4 rounded-lg border border-green-500/20"
          >
            <div className="text-lg font-semibold mb-2 text-green-400">
              Step {step.step}
            </div>
            <div className="text-sm mb-2 text-green-300">
              Page: {step.page}
            </div>
            <div className="space-y-2">
              {step.frames.map((frame: any, j: number) => (
                <motion.div
                  key={j}
                  className={cn(
                    "border-2 p-2 text-center rounded",
                    step.faultIdx === j ? "border-red-500 text-red-500" : "border-green-500",
                    step.hitIdx === j ? "border-green-500 bg-green-500/20" : "",
                    frame === "-" ? "opacity-50" : ""
                  )}
                >
                  {frame}
                </motion.div>
              ))}
            </div>
            {step.replacedNumber !== null && (
              <div className="mt-2 flex items-center justify-center gap-2 text-red-400">
                <span>{step.replacedNumber}</span>
                <ArrowRight className="w-4 h-4" />
                <span>{step.page}</span>
              </div>
            )}
            <div className="mt-2 text-center">
              {step.hitIdx !== -1 ? (
                <span className="text-green-500">Hit</span>
              ) : (
                <span className="text-red-500">Page Fault</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-green-50/5 p-6 rounded-lg border border-green-500/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="text-green-400">Total Hits</div>
            <div className="text-2xl font-bold">{result.result[result.result.length - 1].hits}</div>
          </div>
          <div className="p-2">
            <div className="text-red-400">Total Faults</div>
            <div className="text-2xl font-bold">{result.result[result.result.length - 1].faults}</div>
          </div>
          <div className="p-2">
            <div className="text-green-400">Hit Rate</div>
            <div className="text-2xl font-bold">
              {((result.result[result.result.length - 1].hits / result.refArr.length) * 100).toFixed(2)}%
            </div>
          </div>
          <div className="p-2">
            <div className="text-red-400">Fault Rate</div>
            <div className="text-2xl font-bold">
              {((result.result[result.result.length - 1].faults / result.refArr.length) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AlgorithmResult;

