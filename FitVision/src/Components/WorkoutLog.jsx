import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

const WorkoutLog = ({ data, setData, updateStreak }) => {
  const [newWorkout, setNewWorkout] = useState({ date: '', type: '', duration: '' });

  const handleWorkoutLog = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    setData(prevData => ({
      ...prevData,
      workoutLogs: [...prevData.workoutLogs, { ...newWorkout, date: today }],
      stats: {
        ...prevData.stats,
        totalWorkouts: prevData.stats.totalWorkouts + 1,
      },
    }));
    setNewWorkout({ date: '', type: '', duration: '' });
    updateStreak();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-3xl shadow-lg p-6 md:col-span-2"
    >
      <h2 className="text-2xl font-semibold mb-4">Workout Log</h2>
      <form onSubmit={handleWorkoutLog} className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Workout type"
          value={newWorkout.type}
          onChange={(e) => setNewWorkout({...newWorkout, type: e.target.value})}
          className="flex-grow p-2 border rounded-3xl"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newWorkout.duration}
          onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
          className="flex-grow p-2 border rounded-3xl"
        />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded-3xl flex items-center">
          <PlusCircle className="mr-2" /> Start Workout
        </button>
      </form>
      <div className="max-h-60 overflow-y-auto">
        {data.workoutLogs.map((log, index) => (
          <div key={index} className="bg-gray-100 p-2 mb-2 rounded-3xl">
            <p><strong>{log.date}</strong>: {log.type} for {log.duration} minutes</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkoutLog;