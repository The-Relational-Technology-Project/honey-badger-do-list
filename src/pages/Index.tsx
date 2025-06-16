
import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Trash2, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import TaskItem from '@/components/TaskItem';
import AddTaskForm from '@/components/AddTaskForm';
import MotivationalQuote from '@/components/MotivationalQuote';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('honeyBadgerTasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt)
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('honeyBadgerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTasks([...tasks, newTask]);
    setShowAddForm(false);
    toast({
      title: "Task Added! 🦡",
      description: "Time to show this task who's boss!",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          toast({
            title: "Honey Badger Don't Care! ✅",
            description: "Another task conquered with fearless determination!",
          });
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task Eliminated! 🗑️",
      description: "Honey Badger cleared the path!",
    });
  };

  const editTask = (id: string, newText: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
    toast({
      title: "Task Updated! ✏️",
      description: "Adapted like a true Honey Badger!",
    });
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-6xl">🦡</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Honey Badger Tasks</h1>
                <p className="text-gray-300 text-lg">Fearless. Determined. Unstoppable.</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-400">{completedTasks}/{totalTasks}</div>
              <div className="text-gray-300">Tasks Conquered</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tasks Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Battle Plan</h2>
                <Button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Task
                </Button>
              </div>

              {showAddForm && (
                <AddTaskForm 
                  onAddTask={addTask} 
                  onCancel={() => setShowAddForm(false)} 
                />
              )}

              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🦡</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for Action!</h3>
                  <p className="text-gray-500">Add your first task and channel your inner Honey Badger!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MotivationalQuote />
            
            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Battle Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="font-bold text-xl text-gray-800">{totalTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-xl text-green-600">{completedTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-bold text-xl text-amber-600">{totalTasks - completedTasks}</span>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}% Complete
                  </p>
                </div>
              </div>
            </div>

            {/* Honey Badger Facts */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🦡 Honey Badger Fact</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Honey badgers have been observed using tools, working together, and even planning escape routes from enclosures. Their intelligence matches their legendary fearlessness!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
