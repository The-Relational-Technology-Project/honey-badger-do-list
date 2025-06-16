
import React, { useState } from 'react';
import { CheckCircle2, Circle, Trash2, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group p-4 rounded-lg border-2 transition-all duration-200 ${
      task.completed 
        ? 'bg-green-50 border-green-200 opacity-75' 
        : 'bg-white border-gray-200 hover:border-amber-300 hover:shadow-md'
    }`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 transition-all duration-200 ${
            task.completed 
              ? 'text-green-600 hover:text-green-700' 
              : 'text-gray-400 hover:text-amber-600'
          }`}
        >
          {task.completed ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow"
                autoFocus
              />
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-3"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <span className={`text-lg ${
              task.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}>
              {task.text}
            </span>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              disabled={task.completed}
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
