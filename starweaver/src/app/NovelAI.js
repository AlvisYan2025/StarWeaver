"use client";
import React, { useState } from 'react';
import { BookOpen, Feather, Sparkles, User, MapPin, Settings, X, Plus, Edit3, RotateCcw, Edit } from 'lucide-react';

export default function NovelGeneratorUI() {
  const [showAssets, setShowAssets] = useState(false);
  const [activeAssetTab, setActiveAssetTab] = useState('characters');
  const [prompt, setPrompt] = useState('');
  const [storyText, setStoryText] = useState(`Chapter 1: The Awakening

The morning mist clung to the cobblestones of Aethermoor like whispered secrets, and Elena Brightblade knew that today would change everything. She had felt it in her dreams—the pull of something ancient, something that called to the sword at her side with a voice only she could hear.

The Crystal Caverns lay beyond the eastern hills, their entrance hidden by generations of overgrown thornvines. Yet Elena knew the path as if she had walked it a thousand times before. Perhaps, in her dreams, she had.

"The shadows grow restless," she murmured to herself, watching as the first rays of sunlight pierced through the ethereal fog. "And Thorne Shadowmere grows stronger with each passing day."`);
  
  const [currentGeneration, setCurrentGeneration] = useState(`

As Elena stepped forward, her boots echoing against the ancient stones, a figure emerged from the mist ahead. Cloaked in shadows that seemed to move independently of the wind, the stranger's presence sent a chill down her spine. The enchanted blade at her side began to hum with an otherworldly resonance.

"You feel it too, don't you?" the figure spoke, voice carrying the weight of centuries. "The awakening has begun, and neither of us can stop what comes next."`);
  
  const [currentStoryline, setCurrentStoryline] = useState('Main Timeline');
  const [isEditing, setIsEditing] = useState(false);
  const [editingChunk, setEditingChunk] = useState(null);
  
  const availableTimelines = [
    'Main Timeline',
    'Alternate Path A',
    'Alternate Path B',
    'Dark Timeline',
    'Romance Route'
  ];
  
  // Mock data for different chunks - in real app this would track generation history
  const textChunks = [
    { id: 1, text: "Chapter 1: The Awakening\n\nThe morning mist clung to the cobblestones of Aethermoor like whispered secrets, and Elena Brightblade knew that today would change everything. She had felt it in her dreams—the pull of something ancient, something that called to the sword at her side with a voice only she could hear." },
    { id: 2, text: "\n\nThe Crystal Caverns lay beyond the eastern hills, their entrance hidden by generations of overgrown thornvines. Yet Elena knew the path as if she had walked it a thousand times before. Perhaps, in her dreams, she had." },
    { id: 3, text: "\n\n\"The shadows grow restless,\" she murmured to herself, watching as the first rays of sunlight pierced through the ethereal fog. \"And Thorne Shadowmere grows stronger with each passing day.\"" }
  ];
  
  const characters = [
    { name: "Elena Brightblade", role: "Protagonist", description: "A brave warrior with a mysterious past and an enchanted sword that whispers ancient secrets." },
    { name: "Thorne Shadowmere", role: "Antagonist", description: "A dark sorcerer who seeks to harness the power of the Crystal Caverns for his own twisted purposes." }
  ];
  
  const locations = [
    { name: "Aethermoor", type: "Kingdom", description: "A mystical realm where magic flows through the very air, and cobblestone streets hold centuries of stories." },
    { name: "Crystal Caverns", type: "Ancient Site", description: "Mysterious underground chambers filled with luminescent crystals that pulse with otherworldly energy." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100/20 to-orange-100/30"></div>
      
      {/* Main Book Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Header with floating elements */}
        <div className="w-full max-w-5xl mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-amber-200/50">
              <Feather className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-2xl font-serif text-amber-900 font-medium">Untitled Story</h1>
              <p className="text-sm text-amber-600/80">Chapter 1 • 247 words</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAssets(!showAssets)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-amber-800 rounded-full shadow-lg border border-amber-200/50 hover:bg-white transition-all duration-300 hover:shadow-xl"
          >
            <BookOpen className="w-4 h-4" />
            <span className="font-medium">Story Assets</span>
          </button>
        </div>

        {/* Book Pages Container */}
        <div className="relative w-full max-w-5xl">
          {/* Book Shadow */}
          <div className="absolute inset-0 bg-amber-900/20 rounded-2xl transform rotate-1 scale-105 blur-xl"></div>
          
          {/* Main Book */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-200/30 overflow-hidden">
            {/* Book Spine Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-300 via-orange-400 to-red-400"></div>
            
            {/* Story Content */}
            <div className="p-12 min-h-96">
              {/* Storyline Label */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-amber-200/80 to-orange-200/80 backdrop-blur-sm rounded-full border border-amber-300/50">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <select
                    value={currentStoryline}
                    onChange={(e) => setCurrentStoryline(e.target.value)}
                    className="text-xs font-medium text-amber-800 uppercase tracking-wide bg-transparent border-none outline-none cursor-pointer"
                  >
                    {availableTimelines.map(timeline => (
                      <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto">
                {/* Read mode with chunks */}
                <div className="space-y-1">
                  {/* Existing story chunks with subtle indicators */}
                  {textChunks.map((chunk, index) => (
                    <div key={chunk.id} className="group relative">
                      <div className="absolute -left-6 top-0 bottom-0 flex items-center">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === 0 ? 'bg-amber-400' : 
                          index === 1 ? 'bg-orange-400' : 
                          'bg-red-400'
                        } opacity-30 group-hover:opacity-60`}></div>
                      </div>
                      
                      {editingChunk === chunk.id ? (
                        // Edit mode for this specific chunk
                        <div className="space-y-3 pl-6">
                          <textarea
                            defaultValue={chunk.text}
                            className="w-full min-h-32 resize-none border border-amber-200/50 outline-none bg-amber-50/30 text-gray-800 leading-8 text-lg font-serif p-4 rounded-lg focus:ring-2 focus:ring-orange-300/50"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                          />
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingChunk(null)}
                              className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingChunk(null)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Read mode for this chunk
                        <div className="relative">
                          <div
                            className="text-gray-800 leading-8 text-lg font-serif whitespace-pre-wrap group-hover:bg-amber-50/20 transition-all duration-200 rounded-lg p-2 -m-2"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                          >
                            {chunk.text}
                          </div>
                          
                          {/* Edit button for this chunk */}
                          <button
                            onClick={() => setEditingChunk(chunk.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-white/80 backdrop-blur-sm text-amber-600 hover:text-amber-800 hover:bg-white rounded-md shadow-sm transition-all"
                            title="Edit this section"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Current generation with different styling */}
                  {currentGeneration && (
                    <div className="relative group">
                      <div className="absolute -left-6 top-0 bottom-0 flex items-center">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-red-400 rounded-full opacity-60"></div>
                      
                      {editingChunk === 'current' ? (
                        // Edit mode for current generation
                        <div className="space-y-3 pl-6">
                          <textarea
                            defaultValue={currentGeneration}
                            className="w-full min-h-32 resize-none border border-orange-200/50 outline-none bg-orange-50/30 text-gray-800 leading-8 text-lg font-serif p-4 rounded-lg focus:ring-2 focus:ring-orange-300/50"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                          />
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingChunk(null)}
                              className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-md text-sm font-medium shadow-sm hover:shadow-md transition-all"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingChunk(null)}
                              className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-400 transition-all"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div 
                            className="text-gray-700 leading-8 text-lg font-serif whitespace-pre-wrap pl-6 bg-gradient-to-r from-orange-50/50 to-red-50/30 rounded-r-lg py-4 border-l-2 border-orange-200/50"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                          >
                            {currentGeneration}
                          </div>
                          
                          {/* Edit button for current generation */}
                          <button
                            onClick={() => setEditingChunk('current')}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 bg-white/80 backdrop-blur-sm text-orange-600 hover:text-orange-800 hover:bg-white rounded-md shadow-sm transition-all"
                            title="Edit this section"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          
                          {/* Regenerate button directly below generated text */}
                          <div className="pl-6 pt-2">
                            <button className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:from-amber-300 hover:to-orange-300 transition-all">
                              <RotateCcw className="w-3 h-3" />
                              <span>Regenerate</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Decorative page elements */}
            <div className="absolute top-8 right-8 text-amber-300/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute bottom-8 left-8 text-amber-300/30">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Prompt Input Area */}
        <div className="w-full max-w-5xl mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200/30 p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what happens next, introduce a character, or set a scene..."
                  className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300/50 focus:border-transparent resize-none text-gray-700 placeholder-amber-500/60"
                  rows="2"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-orange-500 hover:to-red-500">
                Generate
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm text-amber-600/80">
              <div className="flex items-center space-x-4">
                <span>Generation mode:</span>
                <select className="px-3 py-1 bg-white/80 border border-amber-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300/50">
                  <option>Continue story</option>
                  <option>Add dialogue</option>
                  <option>Describe scene</option>
                  <option>Character action</option>
                </select>
              </div>
              <button className="text-amber-600 hover:text-amber-800 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Sidebar Overlay */}
      {showAssets && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setShowAssets(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white/95 backdrop-blur-md shadow-2xl border-l border-amber-200/30 z-50 transform transition-transform duration-300">
            <div className="p-6 border-b border-amber-200/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-amber-900 font-medium">Story Assets</h2>
                <button
                  onClick={() => setShowAssets(false)}
                  className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-100/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex space-x-1 bg-amber-100/50 p-1 rounded-lg">
                <button 
                  onClick={() => setActiveAssetTab('characters')}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeAssetTab === 'characters' ? 'bg-white text-orange-600 shadow-sm' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <User className="w-4 h-4 mr-1" />
                  Characters
                </button>
                <button 
                  onClick={() => setActiveAssetTab('locations')}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    activeAssetTab === 'locations' ? 'bg-white text-orange-600 shadow-sm' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Locations
                </button>
              </div>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {activeAssetTab === 'characters' && (
                <div className="space-y-4">
                  {characters.map((char, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200/30 hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-serif font-medium text-amber-900 text-lg">{char.name}</h3>
                          <p className="text-xs text-orange-600 font-medium mb-2 uppercase tracking-wide">{char.role}</p>
                          <p className="text-sm text-amber-700 leading-relaxed">{char.description}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 text-amber-500 hover:text-amber-700 hover:bg-white/50 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-amber-300 rounded-lg p-4 text-amber-600 hover:border-orange-400 hover:text-orange-700 hover:bg-orange-50/50 transition-colors flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Character
                  </button>
                </div>
              )}
              
              {activeAssetTab === 'locations' && (
                <div className="space-y-4">
                  {locations.map((loc, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200/30 hover:shadow-md transition-all group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-serif font-medium text-amber-900 text-lg">{loc.name}</h3>
                          <p className="text-xs text-green-600 font-medium mb-2 uppercase tracking-wide">{loc.type}</p>
                          <p className="text-sm text-amber-700 leading-relaxed">{loc.description}</p>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 text-amber-500 hover:text-amber-700 hover:bg-white/50 rounded-lg transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full border-2 border-dashed border-amber-300 rounded-lg p-4 text-amber-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50/50 transition-colors flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Location
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}