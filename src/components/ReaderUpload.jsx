import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const StoryUpload = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const processFile = async (file) => {
    // Validate file type
    if (!file.name.endsWith('.txt')) {
      setError('Please upload a .txt file');
      return;
    }

    try {
      // Read file content
      const text = await file.text();
      
      // Create story object
      const newStory = {
        id: `story-${Date.now()}`,
        title: file.name.replace('.txt', ''),
        content: text,
        dateAdded: new Date().toISOString(),
        notes: []
      };

      onUpload(newStory);
      setError('');
    } catch (err) {
      setError('Error reading file. Please try again.');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".txt"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your story file here, or click to select
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Only .txt files are supported
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default StoryUpload;