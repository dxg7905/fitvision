import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, Coffee, Utensils, Moon } from 'lucide-react'; // Make sure you import these icons
import { motion, AnimatePresence } from 'framer-motion';
import HealthStatistics from './HealthStatistics';
import WorkoutLog from './WorkoutLog';

const mockData = {
  caloriesBurned: [
    { day: 'Mon', value: 300 },
    { day: 'Tue', value: 400 },
    { day: 'Wed', value: 200 },
    { day: 'Thu', value: 500 },
    { day: 'Fri', value: 350 },
    { day: 'Sat', value: 450 },
    { day: 'Sun', value: 400 },
  ],
  weight: [
    { day: 'Mon', value: 70 },
    { day: 'Tue', value: 69.8 },
    { day: 'Wed', value: 69.5 },
    { day: 'Thu', value: 69.7 },
    { day: 'Fri', value: 69.2 },
    { day: 'Sat', value: 69 },
    { day: 'Sun', value: 68.8 },
  ],
  meals: {
    breakfast: '',
    lunch: '',
    dinner: '',
  },
  stats: {
    totalCalories: 2600,
    totalWorkouts: 5,
    avgHeartRate: 75,
  },
  workoutLogs: [],
  streak: 0,
};

const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const [selectedGraph, setSelectedGraph] = useState('caloriesBurned');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      updateStreak();
    }, 86400000);
    return () => clearInterval(interval);
  }, []);

  const handleMealLog = (meal, value) => {
    setData(prevData => ({
      ...prevData,
      meals: {
        ...prevData.meals,
        [meal]: value,
      },
    }));
  };

  const updateStreak = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayFormatted = today.toISOString().split('T')[0];
    const yesterdayFormatted = yesterday.toISOString().split('T')[0];

    const hasWorkoutToday = data.workoutLogs.some(log => log.date === todayFormatted);
    const hasWorkoutYesterday = data.workoutLogs.some(log => log.date === yesterdayFormatted);

    if (hasWorkoutToday) {
      setData(prevData => ({
        ...prevData,
        streak: prevData.streak + 1,
      }));
    } else if (!hasWorkoutYesterday) {
      setData(prevData => ({
        ...prevData,
        streak: 0,
      }));
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectGraph = (graph) => {
    setSelectedGraph(graph);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#000a06_0%,#115739_50%,#4ead85_100%)] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">FitVision</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {selectedGraph === 'caloriesBurned' ? 'Calories Burned' : 'Weight Tracker'}
              </h2>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-purple-500 text-white px-4 py-2 rounded-3xl flex items-center"
                >
                  Select Graph <ChevronDown className="ml-2" />
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-3xl shadow-lg z-10"
                    >
                      <button
                        onClick={() => selectGraph('caloriesBurned')}
                        className="block w-full text-left px-4 py-2 hover:bg-purple-100"
                      >
                        Calories Burned
                      </button>
                      <button
                        onClick={() => selectGraph('weight')}
                        className="block w-full text-left px-4 py-2 hover:bg-purple-100"
                      >
                        Weight
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data[selectedGraph]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name={selectedGraph === 'caloriesBurned' ? 'Calories' : 'Weight (kg)'}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <HealthStatistics data={data} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-3xl shadow-lg p-6 md:col-span-2"
          >
            <h2 className="text-2xl font-semibold mb-4">Meal Logger</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MealInput icon={<Coffee />} meal="breakfast" value={data.meals.breakfast} onChange={handleMealLog} />
              <MealInput icon={<Utensils />} meal="lunch" value={data.meals.lunch} onChange={handleMealLog} />
              <MealInput icon={<Moon />} meal="dinner" value={data.meals.dinner} onChange={handleMealLog} />
            </div>
          </motion.div>

          <WorkoutLog
            data={data}
            setData={setData}
            updateStreak={updateStreak}
          />
        </div>
      </div>
    </div>
  );
};

const MealInput = ({ icon, meal, value, onChange }) => (
  <div className="flex items-center bg-gray-100 rounded-3xl p-2">
    <div className="mr-2 text-purple-500">{icon}</div>
    <input
      type="text"
      placeholder={`Log your ${meal}`}
      value={value}
      onChange={(e) => onChange(meal, e.target.value)}
      className="flex-grow bg-transparent border-none focus:outline-none"
    />
  </div>
);

export default Dashboard;