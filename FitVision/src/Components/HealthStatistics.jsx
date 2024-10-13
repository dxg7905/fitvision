import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Coffee, Flame } from 'lucide-react';

const HealthStatistics = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Health Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard icon={<Activity />} label="Total Calories Burned" value={data.stats.totalCalories} />
        <StatCard icon={<Coffee />} label="Total Workouts" value={data.stats.totalWorkouts} />
        <StatCard icon={<Activity />} label="Avg. Heart Rate" value={`${data.stats.avgHeartRate} bpm`} />
        <StatCard icon={<Flame />} label="Workout Streak" value={data.streak} />
      </div>
    </motion.div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="flex items-center p-4 bg-gray-100 rounded-3xl">
    <div className="mr-4 text-purple-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default HealthStatistics;