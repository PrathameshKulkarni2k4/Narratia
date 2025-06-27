import React, { useState } from 'react';
import { 
  Users, 
  X, 
  UserPlus, 
  Shield, 
  Mail,
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

const CreateTeam = ({ isOpen, onClose, onCreateTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Permission states for each member
  const [memberPermissions, setMemberPermissions] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addTeamMember = () => {
    const email = newMemberEmail.trim().toLowerCase();
    
    // Validation
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    if (teamMembers.includes(email)) {
      setErrors({ email: 'This email is already added' });
      return;
    }
    
    if (teamMembers.length >= 3) {
      setErrors({ email: 'Maximum 3 team members allowed' });
      return;
    }

    // Add member and set default permissions
    setTeamMembers([...teamMembers, email]);
    setMemberPermissions({
      ...memberPermissions,
      [email]: {
        canEdit: false,
        canDelete: false,
        canInvite: false,
        canManage: false
      }
    });
    setNewMemberEmail('');
    setErrors({});
  };

  const removeTeamMember = (email) => {
    setTeamMembers(teamMembers.filter(member => member !== email));
    // Remove permissions for this member
    const updatedPermissions = { ...memberPermissions };
    delete updatedPermissions[email];
    setMemberPermissions(updatedPermissions);
  };

  const handlePermissionChange = (memberEmail, permission) => {
    setMemberPermissions({
      ...memberPermissions,
      [memberEmail]: {
        ...memberPermissions[memberEmail],
        [permission]: !memberPermissions[memberEmail]?.[permission]
      }
    });
  };

  const resetForm = () => {
    setTeamName('');
    setTeamMembers([]);
    setNewMemberEmail('');
    setMemberPermissions({});
    setErrors({});
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    // Validation
    const newErrors = {};
    
    if (!teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    if (teamMembers.length === 0) {
      newErrors.members = 'At least one team member is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare team data
      const teamData = {
        teamName: teamName.trim(),
        members: teamMembers.map(email => ({
          email,
          permissions: memberPermissions[email] || {
            canEdit: false,
            canDelete: false,
            canInvite: false,
            canManage: false
          }
        }))
      };

      // Call the parent component's create function
      await onCreateTeam(teamData);
      
      // Reset form and close modal
      resetForm();
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to create team. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span>Create Team Project</span>
            </h2>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-[#30363d] rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name..."
                className={`w-full px-3 py-2 bg-[#0d1117] border rounded-md text-sm focus:outline-none focus:ring-1 placeholder-gray-500 ${
                  errors.teamName 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-[#30363d] focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {errors.teamName && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.teamName}</span>
                </p>
              )}
            </div>

            {/* Add Team Members */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Members <span className="text-red-400">*</span>
                <span className="text-gray-400 ml-2">({teamMembers.length}/3)</span>
              </label>
              
              <div className="flex space-x-2 mb-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="Enter member's email..."
                    className={`w-full pl-10 pr-3 py-2 bg-[#0d1117] border rounded-md text-sm focus:outline-none focus:ring-1 placeholder-gray-500 ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                        : 'border-[#30363d] focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                  />
                </div>
                <button
                  onClick={addTeamMember}
                  disabled={teamMembers.length >= 3 || !newMemberEmail.trim()}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Error messages */}
              {errors.email && (
                <p className="mb-3 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
              
              {errors.members && (
                <p className="mb-3 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.members}</span>
                </p>
              )}

              {/* Team Members List */}
              {teamMembers.length > 0 ? (
                <div className="space-y-4">
                  {teamMembers.map((email, index) => (
                    <div key={email} className="p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
                      {/* Member Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-medium text-sm">{email}</span>
                            <div className="text-xs text-gray-400">Team Member</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeTeamMember(email)}
                          className="p-1 hover:bg-[#30363d] rounded text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Permissions */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Shield className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium">Permissions</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center space-x-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={memberPermissions[email]?.canEdit || false}
                              onChange={() => handlePermissionChange(email, 'canEdit')}
                              className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div>
                              <div className="text-sm font-medium">Can Edit</div>
                              <div className="text-xs text-gray-400">Edit project content</div>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={memberPermissions[email]?.canDelete || false}
                              onChange={() => handlePermissionChange(email, 'canDelete')}
                              className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div>
                              <div className="text-sm font-medium">Can Delete</div>
                              <div className="text-xs text-gray-400">Delete project items</div>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={memberPermissions[email]?.canInvite || false}
                              onChange={() => handlePermissionChange(email, 'canInvite')}
                              className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div>
                              <div className="text-sm font-medium">Can Invite</div>
                              <div className="text-xs text-gray-400">Invite new members</div>
                            </div>
                          </label>

                          <label className="flex items-center space-x-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors cursor-pointer">
                            <input
                              type="checkbox"
                              checked={memberPermissions[email]?.canManage || false}
                              onChange={() => handlePermissionChange(email, 'canManage')}
                              className="w-4 h-4 text-blue-500 bg-[#0d1117] border-[#30363d] rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div>
                              <div className="text-sm font-medium">Can Manage</div>
                              <div className="text-xs text-gray-400">Manage team settings</div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 border border-dashed border-[#30363d] rounded-lg">
                  <UserPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No team members added yet</p>
                  <p className="text-xs mt-1">Add team members using their email addresses</p>
                </div>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.submit}</span>
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-[#30363d]">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-[#30363d] hover:bg-[#484f58] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || !teamName.trim() || teamMembers.length === 0}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Team</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;