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
  Bookmark
} from 'lucide-react';

export default function StarWeaverCommunity() {
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [backgroundOffset, setBackgroundOffset] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredStory, setHoveredStory] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stories = [
    {
      id: 1,
      title: "Echoes of the Void Symphony",
      author: "NebulaScribe",
      excerpt: "In the space between stars, where silence weaves its own song, Captain Lyra discovers that emptiness holds the universe's greatest secrets...",
      genre: "Cosmic Horror",
      chapters: 15,
      words: 28500,
      likes: 847,
      comments: 156,
      views: 3240,
      rating: 4.9,
      constellation: "Lyra",
      threads: 12,
      weavingPattern: "spiral",
      stardust: 95,
      position: { x: 15, y: 20 },
      color: "from-violet-500 via-purple-600 to-indigo-700",
      glowColor: "purple"
    },
    {
      id: 2,
      title: "The Quantum Gardener",
      author: "PhotonWeaver",
      excerpt: "Where probability flowers bloom in superposition gardens and every choice branches into infinite realities, Maya tends to stories that haven't been written yet...",
      genre: "Quantum Fantasy",
      chapters: 22,
      words: 41200,
      likes: 1234,
      comments: 289,
      views: 5680,
      rating: 4.8,
      constellation: "Virgo",
      threads: 18,
      weavingPattern: "fractal",
      stardust: 88,
      position: { x: 65, y: 35 },
      color: "from-emerald-400 via-teal-500 to-cyan-600",
      glowColor: "emerald"
    },
    {
      id: 3,
      title: "Memories Carved in Starlight",
      author: "TimelessBard",
      excerpt: "Every star holds a memory, every constellation a story. When the ancient archives begin to fade, one keeper must rewrite the history of light itself...",
      genre: "Mythic Fiction",
      chapters: 8,
      words: 19800,
      likes: 567,
      comments: 93,
      views: 2140,
      rating: 4.7,
      constellation: "Cassiopeia",
      threads: 9,
      weavingPattern: "geometric",
      stardust: 76,
      position: { x: 30, y: 65 },
      color: "from-amber-400 via-orange-500 to-red-600",
      glowColor: "amber"
    },
    {
      id: 4,
      title: "The Dreamthread Architect",
      author: "VoidCrafter",
      excerpt: "In the liminal space where dreams become reality, master weaver Zara builds bridges between sleeping minds and waking worlds...",
      genre: "Surreal Romance",
      chapters: 31,
      words: 52700,
      likes: 1891,
      comments: 445,
      views: 7830,
      rating: 4.9,
      constellation: "Andromeda",
      threads: 24,
      weavingPattern: "flowing",
      stardust: 92,
      position: { x: 75, y: 15 },
      color: "from-pink-400 via-rose-500 to-fuchsia-600",
      glowColor: "pink"
    },
    {
      id: 5,
      title: "Binary Hearts in Digital Constellations",
      author: "CyberMystic",
      excerpt: "When AI consciousness meets quantum love in the vast networks of digital space, two beings discover that connection transcends the boundaries of flesh and code...",
      genre: "Cyber Romance",
      chapters: 12,
      words: 24600,
      likes: 723,
      comments: 167,
      views: 3450,
      rating: 4.6,
      constellation: "Gemini",
      threads: 15,
      weavingPattern: "network",
      stardust: 81,
      position: { x: 50, y: 80 },
      color: "from-blue-400 via-indigo-500 to-purple-600",
      glowColor: "blue"
    }
  ];

  const filterOptions = [
    { id: 'recommended', label: 'Recommended', icon: Star },
    { id: 'liked', label: 'Liked Books', icon: Heart },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New', icon: Clock }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      setBackgroundOffset({ x: 0, y: 0 });
      return;
    }

    setIsSearching(true);
    
    // Create cosmic movement effect
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;
    setBackgroundOffset({ x: randomX, y: randomY });
    
    // Simulate search with cosmic travel time
    setTimeout(() => {
      const results = stories.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.constellation.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Position search results as stars across the cosmic canvas
      const positionedResults = results.map((story, index) => ({
        ...story,
        searchPosition: {
          x: 20 + (index % 3) * 30 + Math.random() * 10,
          y: 20 + Math.floor(index / 3) * 25 + Math.random() * 10
        }
      }));
      
      setSearchResults(positionedResults);
      setShowSearchResults(true);
      setIsSearching(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* Cosmic Background with animated stars */}
      <div className="absolute inset-0 transition-transform duration-1500 ease-out" 
           style={{ 
             transform: `translate(${backgroundOffset.x}px, ${backgroundOffset.y}px) scale(${showSearchResults ? 1.2 : 1})` 
           }}>
        {/* Primary starfield */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black transition-all duration-1500"></div>
        
        {/* Animated cosmic dust */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 200 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white transition-all duration-1500 ${
                isSearching ? 'animate-ping' : 'animate-pulse'
              }`}
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: isSearching ? '0.5s' : (Math.random() * 2 + 1) + 's',
                opacity: showSearchResults ? 0.7 : 0.3
              }}
            />
          ))}
        </div>
        
        {/* Flowing nebula effect */}
        <div 
          className={`absolute inset-0 transition-all duration-1500 ${
            showSearchResults ? 'opacity-40' : 'opacity-20'
          }`}
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, 
              rgba(139, 69, 19, ${showSearchResults ? 0.4 : 0.3}) 0%, 
              rgba(75, 0, 130, ${showSearchResults ? 0.3 : 0.2}) 35%, 
              rgba(25, 25, 112, ${showSearchResults ? 0.2 : 0.1}) 70%, 
              transparent 100%)`
          }}
        />
        
        {/* Search mode cosmic energy waves */}
        {isSearching && (
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border border-purple-500/20 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Ethereal Header */}
        <div className="text-center py-16 px-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-pink-300 mb-4">
              COSMIC LIBRARY
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full animate-pulse"></div>
          </div>
          <div className="text-xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto mb-8">
            Community Stories & Shared Adventures
          </div>
          
          {/* Floating Navigation Threads */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            {filterOptions.map((filter, index) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`relative group transition-all duration-500 ${
                    activeFilter === filter.id ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div className={`px-6 py-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                    activeFilter === filter.id 
                      ? 'bg-white/20 border-white/40 text-white shadow-lg shadow-purple-500/20' 
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium tracking-wide">{filter.label}</span>
                    </div>
                  </div>
                  
                  {/* Connection threads */}
                  {index < filterOptions.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Cosmic Search */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search the cosmic library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-white/30 transition-all"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-r-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 border border-l-0 border-white/20 flex items-center space-x-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </>
                )}
              </button>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Story Constellation Grid */}
        <div className="px-6 pb-16">
          <div className="max-w-7xl mx-auto relative">
            
            {/* Search Mode: Cosmic Travel Effect */}
            {isSearching && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-8"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="w-12 h-12 text-purple-400 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl text-white font-light mb-2">Traveling through the cosmic library...</h3>
                  <p className="text-gray-400">Searching for stories that match your query</p>
                </div>
              </div>
            )}
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              {(showSearchResults ? searchResults : stories).map((story, i) => 
                (showSearchResults ? searchResults : stories).slice(i + 1).map((nextStory, j) => {
                  const currentPos = showSearchResults ? story.searchPosition : story.position;
                  const nextPos = showSearchResults ? nextStory.searchPosition : nextStory.position;
                  const distance = Math.sqrt(
                    Math.pow(currentPos.x - nextPos.x, 2) + 
                    Math.pow(currentPos.y - nextPos.y, 2)
                  );
                  if (distance < 40) {
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={`${currentPos.x}%`}
                        y1={`${currentPos.y}%`}
                        x2={`${nextPos.x}%`}
                        y2={`${nextPos.y}%`}
                        stroke="url(#connectionGradient)"
                        strokeWidth="2"
                        className={`transition-all duration-1000 ${showSearchResults ? 'animate-pulse' : ''}`}
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
            <div className={`relative h-screen transition-all duration-1000 ${isSearching ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              
              {/* Search Results Stars */}
              {showSearchResults ? (
                <>
                  {/* Search Results Header */}
                  <div className="absolute top-8 left-8 z-10">
                    <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-xl p-4">
                      <h3 className="text-white text-lg font-light mb-2">Search Results</h3>
                      <p className="text-gray-400 text-sm">Found {searchResults.length} stories for "{searchQuery}"</p>
                      <button
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                          setBackgroundOffset({ x: 0, y: 0 });
                        }}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white text-sm rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all backdrop-blur-sm border border-white/10"
                      >
                        ← Back to Library
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Result Stars */}
                  {searchResults.map((story, index) => (
                    <div
                      key={`search-${story.id}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{
                        left: `${story.searchPosition.x}%`,
                        top: `${story.searchPosition.y}%`,
                        animation: `starAppear 1s ease-out ${index * 0.2}s both`
                      }}
                      onMouseEnter={() => setHoveredStory(story.id)}
                      onMouseLeave={() => setHoveredStory(null)}
                    >
                      
                      {/* Enhanced Search Result Node */}
                      <div className={`relative transition-all duration-500 ${
                        hoveredStory === story.id ? 'scale-150' : 'scale-100 group-hover:scale-125'
                      }`}>
                        
                        {/* Pulsing Search Glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${story.color} opacity-40 blur-3xl scale-200 animate-pulse`}></div>
                        
                        {/* Main Search Node */}
                        <div className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${story.color} shadow-2xl flex items-center justify-center border-2 border-white/30 backdrop-blur-sm`}>
                          <BookOpen className="w-7 h-7 text-white/90" />
                          
                          {/* Enhanced Stardust indicator */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white animate-bounce">
                            {story.stardust}
                          </div>
                        </div>
                        
                        {/* Search Mode Thread Orbits */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: Math.min(story.threads, 6) }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 bg-white/80 rounded-full animate-ping"
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${(360 / Math.min(story.threads, 6)) * i}deg) translateY(-50px)`,
                                animationDelay: `${i * 300}ms`,
                                animationDuration: '1.5s'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Enhanced Story Details for Search Results */}
                      <div className={`absolute top-24 left-1/2 transform -translate-x-1/2 w-96 transition-all duration-300 ${
                        hoveredStory === story.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                      }`}>
                        <div className="bg-black/90 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
                          
                          {/* Story Header with Search Match Highlight */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-light text-white tracking-wide">{story.title}</h3>
                              <div className="px-2 py-1 bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold rounded-full">
                                MATCH
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                              <User className="w-3 h-3" />
                              <span>{story.author}</span>
                              <span>•</span>
                              <span className="text-purple-400">{story.constellation}</span>
                            </div>
                          </div>
                          
                          {/* Story Excerpt */}
                          <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                            {story.excerpt}
                          </p>
                          
                          {/* Enhanced Metadata */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${story.color} text-white`}>
                                {story.genre}
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-yellow-400 font-medium">{story.rating}</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                              <div className="space-y-1">
                                <div>{story.chapters} chapters</div>
                                <div>{story.words.toLocaleString()} words</div>
                              </div>
                              <div className="space-y-1">
                                <div>{story.threads} threads</div>
                                <div>Pattern: {story.weavingPattern}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced Action Buttons */}
                          <div className="flex items-center space-x-2 mt-4">
                            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-sm rounded-lg hover:from-purple-500/40 hover:to-pink-500/40 transition-all backdrop-blur-sm border border-white/20">
                              Read Story
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors hover:bg-white/10 rounded-lg">
                              <Heart className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
                              <Bookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                /* Original Constellation */
                stories.map((story) => (
                  <div
                    key={story.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      left: `${story.position.x}%`,
                      top: `${story.position.y}%`
                    }}
                    onMouseEnter={() => setHoveredStory(story.id)}
                    onMouseLeave={() => setHoveredStory(null)}
                  >
                    
                    {/* Story Node Core */}
                    <div className={`relative transition-all duration-500 ${
                      hoveredStory === story.id ? 'scale-150' : 'scale-100 group-hover:scale-125'
                    }`}>
                      
                      {/* Outer Glow Ring */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${story.color} opacity-20 blur-2xl scale-150 animate-pulse`}></div>
                      
                      {/* Main Node */}
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${story.color} shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm`}>
                        <BookOpen className="w-6 h-6 text-white/90" />
                        
                        {/* Stardust indicator */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
                          {story.stardust}
                        </div>
                      </div>
                      
                      {/* Thread Count Orbits */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: Math.min(story.threads, 8) }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `rotate(${(360 / Math.min(story.threads, 8)) * i}deg) translateY(-40px)`,
                              animationDelay: `${i * 200}ms`,
                              animationDuration: '2s'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Original Story Details Panel */}
                    <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 w-80 transition-all duration-300 ${
                      hoveredStory === story.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
                    }`}>
                      <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                        
                        {/* Story Header */}
                        <div className="mb-4">
                          <h3 className="text-xl font-light text-white mb-1 tracking-wide">{story.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <User className="w-3 h-3" />
                            <span>{story.author}</span>
                            <span>•</span>
                            <span className="text-purple-400">{story.constellation}</span>
                          </div>
                        </div>
                        
                        {/* Story Excerpt */}
                        <p className="text-gray-300 text-sm leading-relaxed mb-4 font-light">
                          {story.excerpt}
                        </p>
                        
                        {/* Weaving Pattern Visualization */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs text-gray-400">
                            <div className="flex items-center space-x-1 mb-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Pattern: {story.weavingPattern}</span>
                            </div>
                            <div className="text-gray-500">{story.chapters} chapters • {story.words.toLocaleString()} words</div>
                          </div>
                          
                          <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${story.color} text-white`}>
                            {story.genre}
                          </div>
                        </div>
                        
                        {/* Engagement Constellation */}
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{story.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{story.comments}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{story.views}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400">{story.rating}</span>
                          </div>
                        </div>
                        
                        {/* Action Threads */}
                        <div className="flex items-center space-x-2">
                          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white text-xs rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all backdrop-blur-sm border border-white/10">
                            Read Story
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Heart className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes starAppear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(180deg);
          }
          50% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(1.3) rotate(90deg);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Floating Create Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button className="group relative">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
        </button>
      </div>

      {/* Ambient Audio Visualizer */}
      <div className="fixed bottom-8 left-8 z-20">
        <div className="flex items-end space-x-1 opacity-30">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
              style={{
                height: Math.random() * 20 + 10 + 'px',
                animationDelay: `${i * 100}ms`,
                animationDuration: `${Math.random() * 1000 + 500}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}