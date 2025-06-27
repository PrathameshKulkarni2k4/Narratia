import React, { useState, useEffect } from "react";
import {
  User,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  Book,
  Calendar,
  Eye,
  Code,
  Layers,
  Sparkles,
  Zap,
  Menu,
  X,
} from "lucide-react";
import CreateTeam from "./CreateTeam";
import { useNavigate } from "react-router-dom";

const API_ENDPOINT = import.meta.env.VITE_USER_API_END_POINT;

const Hub = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectType, setProjectType] = useState("solo");
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const navigate = useNavigate();

  // Fetch user data and projects from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user from localStorage (stored during login)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }

        // Fetch projects from backend (you'll need to implement this endpoint)
        const response = await fetch(`${API_ENDPOINT}/projects`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setProjects(data.projects || []);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle team creation
  const handleCreateTeam = async (teamData) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/teams`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Team created:", data);
        // You can add success handling here, like redirecting to the new team page
      } else {
        throw new Error("Failed to create team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      throw error; // Re-throw to let CreateTeam component handle the error
    }
  };

  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div className="w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
        </div>
      ))}

      {/* Animated grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-green-900/5"></div>

      {/* Floating code symbols */}
      <div
        className="absolute top-1/4 left-1/4 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <Code className="w-8 h-8 text-blue-400/30" />
      </div>
      <div
        className="absolute top-3/4 right-1/3 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        <Sparkles className="w-6 h-6 text-purple-400/30" />
      </div>
      <div
        className="absolute top-1/2 right-1/4 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "3.5s" }}
      >
        <Layers className="w-7 h-7 text-green-400/30" />
      </div>
      <div
        className="absolute bottom-1/4 left-1/3 animate-bounce"
        style={{ animationDelay: "0.5s", animationDuration: "2.8s" }}
      >
        <Zap className="w-5 h-5 text-yellow-400/30" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white relative">
      <AnimatedBackground />

      {/* Header */}
      <header className="border-b border-[#30363d] bg-[#161b22]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowLeftSidebar(!showLeftSidebar)}
              className="lg:hidden p-2 hover:bg-[#30363d] rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="text-xl sm:text-2xl font-bold">🐙 Narratia</div>

            {/* Search - hidden on small screens */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-48 md:w-80"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search button for mobile */}
            <button className="sm:hidden p-2 hover:bg-[#30363d] rounded-md transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-[#30363d] rounded-md transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* Mobile create button */}
            <button
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className="lg:hidden p-2 hover:bg-[#30363d] rounded-md transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 hover:bg-[#30363d] rounded-md p-2 transition-colors"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Profile dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#161b22] border border-[#30363d] rounded-lg shadow-xl z-50 animate-in slide-in-from-top-2">
                  <div className="p-4 border-b border-[#30363d]">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{user?.name}</h3>
                        <p className="text-sm text-gray-400 truncate">
                          @{user?.username}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col sm:flex-row sm:space-x-4 text-sm space-y-1 sm:space-y-0">
                      <span>
                        <strong>{projects.length}</strong> projects
                      </span>
                      <span className="truncate">
                        <strong>{user?.email}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 p-2 hover:bg-[#30363d] rounded text-left">
                      <User className="w-4 h-4" />
                      <span>Your profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 p-2 hover:bg-[#30363d] rounded text-left">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2 border-[#30363d]" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-[#30363d] rounded text-left text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex relative">
        {/* Left Sidebar - Projects */}
        <aside
          className={`
          ${showLeftSidebar ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 fixed lg:static top-0 left-0 z-40 w-80 border-r border-[#30363d] bg-[#161b22]/95 lg:bg-[#161b22]/50 backdrop-blur-sm h-screen lg:min-h-screen transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-4 sm:p-6 h-full overflow-y-auto">
            {/* Mobile close button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Projects</h2>
              <button
                onClick={() => setShowLeftSidebar(false)}
                className="p-2 hover:bg-[#30363d] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Your Projects</h2>
              <span className="text-sm text-gray-400">{projects.length}</span>
            </div>

            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No projects yet</p>
                  <p className="text-sm">
                    Create your first project to get started
                  </p>
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-[#58a6ff] transition-colors truncate">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-3 text-xs text-gray-500 space-y-1 sm:space-y-0">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{project.visibility || "private"}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome back, {user?.name?.split(" ")[0]}!
                  <span className="inline-block ml-2 animate-wave">👋</span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Ready to create your next amazing story?
                </p>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 sm:p-6 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all cursor-pointer group transform hover:scale-105"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        New Project
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100">
                        Start a fresh story
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 sm:p-6 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all cursor-pointer group transform hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      <Book className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base">
                        My Projects
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-100">
                        View all projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Stats */}
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Your Dashboard
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">
                      {projects.length}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-400">
                      {user?.name?.length || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Name Length
                    </div>
                  </div>
                  <div className="text-center col-span-2 sm:col-span-1">
                    <div className="text-lg sm:text-2xl font-bold text-purple-400">
                      {new Date(
                        user?.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Member Since
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Create Project */}
        <aside
          className={`
          ${showRightSidebar ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 fixed lg:static top-0 right-0 z-40 w-80 border-l border-[#30363d] bg-[#161b22]/95 lg:bg-[#161b22]/50 backdrop-blur-sm h-screen transition-transform duration-300 ease-in-out
        `}
        >
          <div className="p-4 sm:p-6 h-full">
            {/* Mobile close button */}
            <div className="lg:hidden flex justify-end mb-4">
              <button
                onClick={() => setShowRightSidebar(false)}
                className="p-2 hover:bg-[#30363d] rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span>Create New Project</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Project</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-[#30363d] rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Project Type
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="projectType"
                        value="solo"
                        checked={projectType === "solo"}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] focus:ring-blue-500 focus:ring-2"
                      />
                      <div>
                        <div className="font-medium">Solo Project</div>
                        <div className="text-sm text-gray-400">
                          Work on your story independently
                        </div>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-3 border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="projectType"
                        value="team"
                        checked={projectType === "team"}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] focus:ring-blue-500 focus:ring-2"
                      />
                      <div>
                        <div className="font-medium">Team Project</div>
                        <div className="text-sm text-gray-400">
                          Collaborate with others on your story
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-[#30363d] hover:bg-[#484f58] text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      if (projectType === "team") {
                        setShowCreateTeamModal(true);
                      } else {
                        // Handle solo project creation logic here
                        console.log("Creating solo project");
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Team Modal */}
      <CreateTeam
        isOpen={showCreateTeamModal}
        onClose={() => setShowCreateTeamModal(false)}
        onCreateTeam={handleCreateTeam}
      />

      {/* Overlay for mobile sidebars */}
      {(showLeftSidebar || showRightSidebar) && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setShowLeftSidebar(false);
            setShowRightSidebar(false);
          }}
        ></div>
      )}

      {/* Click outside to close profile */}
      {showProfile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfile(false)}
        ></div>
      )}
    </div>
  );
};

export default Hub;