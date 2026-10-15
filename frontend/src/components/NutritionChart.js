import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NutritionChart = ({ summary, targets }) => {
  const data = [
    { name: 'Calories', consumed: summary?.calories || 0, target: targets?.calories || 2000 },
    { name: 'Protein', consumed: summary?.protein || 0, target: targets?.protein || 50 },
    { name: 'Carbs', consumed: summary?.carbs || 0, target: targets?.carbs || 250 },
    { name: 'Fat', consumed: summary?.fat || 0, target: targets?.fat || 70 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumed" fill="#8884d8" name="Consumed" />
        <Bar dataKey="target" fill="#82ca9d" name="Target" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutritionChart;