"use client";
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Share2, 
  Search, 
  Star, 
  Eye, 
  Users,
  Sparkles,
  Plus,
  Filter,
  TrendingUp,
  Clock,
  Award,
  Flame,
  User,
  Bookmark,
  Edit3,
  Trash2,
  Play,
  Pause,
  Settings,
  BarChart3,
  FileText,
  Upload,
  Calendar,
  Target,
  PenTool,
  Save,
  Globe,
  Lock,
  ChevronDown,
  Grid3X3,
  List,
  SortDesc
} from 'lucide-react';

export default function MyStoriesPage() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'constellation'
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [showNewStoryModal, setShowNewStoryModal] = useState(false);
  const [newStoryData, setNewStoryData] = useState({
    title: '',
    genre: '',
    description: '',
    privacy: 'private',
    targetChapters: ''
  });
  const [myStories, setStories] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  //fetch data from backend

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/community-stories');
        if (!response.ok) {
          data = [
            {
              id: 5,
              title: "Quantum Hearts",
              status: "draft",
              privacy: "private",
              chapters: 3,
              words: 5600,
              likes: 0,
              comments: 0,
              views: 0,
              rating: 0,
              genre: "Sci-Fi Romance",
              lastEdited: "yesterday",
              drafts: 5,
              color: "from-pink-400 via-rose-500 to-fuchsia-600",
              position: { x: 75, y: 80 }
            }
          ];
          setStories(data);
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setStories(data); 
      } catch (err) {
        const data = [
          {
            id: 5,
            title: "Quantum Hearts",
            status: "draft",
            privacy: "private",
            chapters: 3,
            words: 5600,
            likes: 0,
            comments: 0,
            views: 0,
            rating: 0,
            genre: "Sci-Fi Romance",
            lastEdited: "yesterday",
            drafts: 5,
            color: "from-pink-400 via-rose-500 to-fuchsia-600",
            position: { x: 75, y: 80 }
          }
        ];
        setStories(data);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []); 

  const filteredStories = myStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || story.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'recent': return new Date(b.lastEdited) - new Date(a.lastEdited);
      case 'popular': return b.likes - a.likes;
      case 'alphabetical': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStories = sortedStories.slice(startIndex, startIndex + itemsPerPage);

  const handleNewStorySubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted!', newStoryData); 
    if (!newStoryData.title.trim()) {
      alert('Please enter a story title');
      return;
    }
    try {
      const response = await fetch('/start-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStoryData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to create story. Status: ${response.status}`);
      }  
      const createdStory = await response.json();
      console.log('Created story:', createdStory);
      // Reset form and close modal
      setNewStoryData({
        title: '',
        genre: '',
        description: '',
        privacy: 'private',
        targetChapters: ''
      });
      setShowNewStoryModal(false);
    } catch (error) {
      console.error('Error creating story:', error);
      alert('An error occurred while creating the story.');
    }
  };

  const handleInputChange = (field, value) => {
    setNewStoryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const totalStats = {
    totalWords: myStories.reduce((sum, story) => sum + story.words, 0),
    totalViews: myStories.reduce((sum, story) => sum + story.views, 0),
    totalLikes: myStories.reduce((sum, story) => sum + story.likes, 0),
    averageRating: myStories.filter(s => s.rating > 0).reduce((sum, story) => sum + story.rating, 0) / myStories.filter(s => s.rating > 0).length || 0
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published': return <Star className="w-4 h-4 text-green-400" />;
      case 'draft': return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'paused': return <Pause className="w-4 h-4 text-orange-400" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'public': return <Globe className="w-3 h-3 text-green-400" />;
      case 'unlisted': return <Eye className="w-3 h-3 text-yellow-400" />;
      case 'private': return <Lock className="w-3 h-3 text-red-400" />;
      default: return <Lock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Cosmic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black"></div>
        
        {/* Animated cosmic dust */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 2 + 1 + 'px',
                height: Math.random() * 2 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: Math.random() * 2 + 1 + 's',
              }}
            />
          ))}
        </div>
        
        {/* Flowing nebula effect */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, 
              rgba(139, 69, 19, 0.3) 0%, 
              rgba(75, 0, 130, 0.2) 35%, 
              rgba(25, 25, 112, 0.1) 70%, 
              transparent 100%)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Header Section */}
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Title and Stats */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300 mb-4">
                  MY STORIES
                </h1>
                <div className="flex items-center space-x-6 text-gray-400">
                  <span className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{myStories.length} Stories</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{totalStats.totalWords.toLocaleString()} Words</span>
                  </span>

                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light text-white">{myStories.length}</div>
                    <div className="text-xs text-gray-400">Stories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">{totalStats.totalWords.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">{totalStats.totalViews.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Views</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-white">{totalStats.totalLikes.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Total Likes</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              
              {/* Search */}
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                />
              </div>
              
              {/* Filters and Controls */}
              <div className="flex items-center space-x-3">
                
                {/* Status Filter */}
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                >
                  <option value="all" className="bg-black">All Stories</option>
                  <option value="published" className="bg-black">Published</option>
                  <option value="draft" className="bg-black">Drafts</option>
                  <option value="paused" className="bg-black">Paused</option>
                </select>
                
                {/* Sort By */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50"
                >
                  <option value="recent" className="bg-black">Recently Edited</option>
                  <option value="popular" className="bg-black">Most Popular</option>
                  <option value="alphabetical" className="bg-black">Alphabetical</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('constellation')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'constellation' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Display */}
        <div className="px-6 pb-16">
          <div className="max-w-7xl mx-auto">
            
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedStories.map((story) => (
                  <div key={story.id} className="group relative">
                    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-black/70 hover:border-white/30 transition-all duration-300 hover:scale-105">
                      
                      {/* Story Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(story.status)}
                            <h3 className="text-xl font-light text-white truncate">{story.title}</h3>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            {getPrivacyIcon(story.privacy)}
                            <span className="capitalize">{story.privacy}</span>
                            <span>•</span>
                            <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${story.color} text-white`}>
                              {story.genre}
                            </span>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex items-center space-x-1">
                          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Story Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 mb-4">
                        <div>
                          <div className="text-white font-medium">{story.words.toLocaleString()}</div>
                          <div className="text-xs">Words</div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{story.chapters}</div>
                          <div className="text-xs">Chapters</div>
                        </div>
                        {story.status === 'published' && (
                          <>
                            <div>
                              <div className="text-white font-medium">{story.likes}</div>
                              <div className="text-xs">Likes</div>
                            </div>
                            <div>
                              <div className="text-white font-medium">{story.views}</div>
                              <div className="text-xs">Views</div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Last Edited */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <span>Last edited {story.lastEdited}</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-sm rounded-lg hover:from-purple-500/40 hover:to-pink-500/40 transition-all backdrop-blur-sm border border-white/10">
                          {story.status === 'draft' ? 'Continue Writing' : 'Edit Story'}
                        </button>
                        {story.status === 'published' && (
                          <button className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                            View
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Constellation View */
              <div className="relative h-screen">
                
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  {paginatedStories.map((story, i) => 
                    paginatedStories.slice(i + 1).map((nextStory, j) => {
                      const distance = Math.sqrt(
                        Math.pow(story.position.x - nextStory.position.x, 2) + 
                        Math.pow(story.position.y - nextStory.position.y, 2)
                      );
                      if (distance < 35) {
                        return (
                          <line
                            key={`${i}-${j}`}
                            x1={`${story.position.x}%`}
                            y1={`${story.position.y}%`}
                            x2={`${nextStory.position.x}%`}
                            y2={`${nextStory.position.y}%`}
                            stroke="url(#connectionGradient)"
                            strokeWidth="2"
                            className="animate-pulse"
                          />
                        );
                      }
                      return null;
                    })
                  )}
                  <defs>
                    <linearGradient id="connectionGradient">
                      <stop offset="0%" stopColor="rgba(139, 69, 255, 0.4)" />
                      <stop offset="50%" stopColor="rgba(236, 72, 153, 0.4)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.4)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Story Nodes */}
                {paginatedStories.map((story) => (
                  <div
                    key={story.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      left: `${story.position.x}%`,
                      top: `${story.position.y}%`
                    }}
                    onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                  >
                    
                    {/* Story Node */}
                    <div className="relative transition-all duration-500 group-hover:scale-125">
                      
                      {/* Outer Glow */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${story.color} opacity-30 blur-2xl scale-150 animate-pulse`}></div>
                      
                      {/* Main Node */}
                      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${story.color} shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm`}>
                        <BookOpen className="w-6 h-6 text-white/90" />
                      </div>
                    </div>
                    
                    {/* Story Details Panel */}
                    <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 w-96 transition-all duration-300 ${
                      selectedStory === story.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                    }`}>
                      <div className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
                        
                        {/* Story Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-light text-white mb-1">{story.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              {getStatusIcon(story.status)}
                              <span className="capitalize">{story.status}</span>
                              <span>•</span>
                              {getPrivacyIcon(story.privacy)}
                              <span className="capitalize">{story.privacy}</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${story.color} text-white`}>
                            {story.genre}
                          </div>
                        </div>
                        
                        {/* Story Metadata */}
                        <div className="mb-4">
                          <div className="text-xs text-gray-400">
                            {story.words.toLocaleString()} words • {story.chapters} chapters • Last edited {story.lastEdited}
                          </div>
                        </div>
                        
                        {/* Stats Grid */}
                        {story.status === 'published' && (
                          <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                            <div>
                              <div className="text-white font-medium">{story.likes}</div>
                              <div className="text-xs text-gray-400">Likes</div>
                            </div>
                            <div>
                              <div className="text-white font-medium">{story.comments}</div>
                              <div className="text-xs text-gray-400">Comments</div>
                            </div>
                            <div>
                              <div className="text-white font-medium">{story.views}</div>
                              <div className="text-xs text-gray-400">Views</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-sm rounded-lg hover:from-purple-500/40 hover:to-pink-500/40 transition-all backdrop-blur-sm border border-white/10">
                            {story.status === 'draft' ? 'Continue Writing' : 'Edit Story'}
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                            <Settings className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* New Story Modal */}
      {showNewStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowNewStoryModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-black/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {/* Cosmic Background Effect */}
            <div className="absolute inset-0 rounded-3xl opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl"></div>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/20 animate-pulse"
                  style={{
                    width: Math.random() * 3 + 1 + 'px',
                    height: Math.random() * 3 + 1 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 2 + 's',
                  }}
                />
              ))}
            </div>
            
            {/* Modal Header */}
            <div className="relative mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300">
                  Create New Story
                </h2>
                <button
                  onClick={() => setShowNewStoryModal(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
                >
                  <Plus className="w-5 h-5 transform rotate-45" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">Begin your cosmic journey with a new story</p>
            </div>
            
            {/* Form */}
            <form onSubmit={handleNewStorySubmit} className="relative space-y-4">
              
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Story Title *
                </label>
                <input
                  type="text"
                  value={newStoryData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your story title..."
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                  required
                />
              </div>
              
              {/* Genre Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Genre
                </label>
                <select
                  value={newStoryData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                >
                  <option value="" className="bg-black">Select a genre...</option>
                  <option value="Fantasy" className="bg-black">Fantasy</option>
                  <option value="Sci-Fi" className="bg-black">Science Fiction</option>
                  <option value="Romance" className="bg-black">Romance</option>
                  <option value="Mystery" className="bg-black">Mystery</option>
                  <option value="Horror" className="bg-black">Horror</option>
                  <option value="Adventure" className="bg-black">Adventure</option>
                  <option value="Drama" className="bg-black">Drama</option>
                  <option value="Comedy" className="bg-black">Comedy</option>
                  <option value="Cosmic Horror" className="bg-black">Cosmic Horror</option>
                  <option value="Cyberpunk" className="bg-black">Cyberpunk</option>
                  <option value="Space Opera" className="bg-black">Space Opera</option>
                  <option value="Other" className="bg-black">Other</option>
                </select>
              </div>
              
              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newStoryData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Tell us about your story..."
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all resize-none"
                />
              </div>
              
              {/* Privacy and Target Chapters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Privacy
                  </label>
                  <select
                    value={newStoryData.privacy}
                    onChange={(e) => handleInputChange('privacy', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                  >
                    <option value="private" className="bg-black">Private</option>
                    <option value="unlisted" className="bg-black">Unlisted</option>
                    <option value="public" className="bg-black">Public</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Chapters
                  </label>
                  <input
                    type="number"
                    value={newStoryData.targetChapters}
                    onChange={(e) => handleInputChange('targetChapters', e.target.value)}
                    placeholder="e.g., 20"
                    min="1"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                  />
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewStoryModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 rounded-xl hover:bg-white/20 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newStoryData.title}
                  className={`flex-1 px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                    newStoryData.title 
                      ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 hover:scale-105' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Story</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Star Orbit Page Selector */}
      {totalPages > 1 && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative w-32 h-32">
            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center shadow-2xl">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            {/* Orbiting Page Stars */}
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              const angle = (360 / totalPages) * i - 90; // Start from top
              const radius = 50;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 ${
                    currentPage === pageNum ? 'scale-110' : 'scale-100'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  <div className={`relative ${currentPage === pageNum ? 'animate-pulse' : ''}`}>
                    {/* Outer Glow */}
                    <div className={`absolute inset-0 rounded-full blur-lg ${
                      currentPage === pageNum 
                        ? 'bg-gradient-to-r from-violet-400 to-purple-400 opacity-60 scale-150' 
                        : 'bg-white/20 opacity-30 scale-100'
                    } transition-all duration-300`}></div>
                    
                    {/* Star Node */}
                    <div className={`relative w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      currentPage === pageNum 
                        ? 'bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 text-white' 
                        : 'bg-white/20 backdrop-blur-sm text-gray-300 hover:bg-white/30 border border-white/20'
                    }`}>
                      <Star className="w-3 h-3" />
                    </div>
                    
                    {/* Connection Line to Center */}
                    <div className={`absolute w-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${
                      currentPage === pageNum ? 'opacity-40' : 'opacity-10'
                    }`}
                    style={{
                      height: `${radius}px`,
                      left: '50%',
                      top: '50%',
                      transformOrigin: 'top',
                      transform: `rotate(${angle + 90}deg) translateY(-50%)`
                    }}></div>
                    
                    {/* Page Number */}
                    <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs transition-all duration-300 ${
                      currentPage === pageNum ? 'text-white font-medium' : 'text-gray-400'
                    }`}>
                      {pageNum}
                    </div>
                  </div>
                </button>
              );
            })}
            
            {/* Orbital Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/10 rounded-full animate-spin opacity-20" style={{ animationDuration: '30s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-white/5 rounded-full animate-spin opacity-10" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-20 space-y-4">
        
        {/* New Story Button */}
        <button 
          onClick={() => setShowNewStoryModal(true)}
          className="group relative"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
        </button>
      </div>


    </div>
  );
}