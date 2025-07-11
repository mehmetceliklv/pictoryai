'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Image as ImageIcon, 
  Video, 
  Folder, 
  Settings, 
  LogOut,
  Sparkles,
  BarChart3,
  Clock,
  Zap
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Pictory AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=6366f1&color=fff`}
                  alt={user.displayName}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
              </div>
              <button
                onClick={() => router.push('/settings')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.displayName}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Let&apos;s create something amazing today
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <ImageIcon className="h-8 w-8" />
                <Sparkles className="h-5 w-5 opacity-75 group-hover:opacity-100" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate Image</h3>
              <p className="text-indigo-100 text-sm">Create stunning images from text prompts</p>
            </button>

            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <Video className="h-8 w-8" />
                <Zap className="h-5 w-5 opacity-75 group-hover:opacity-100" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Video</h3>
              <p className="text-purple-100 text-sm">Turn ideas into engaging videos</p>
            </button>

            <button className="bg-white border-2 border-dashed border-gray-300 text-gray-600 p-6 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-4">
                <Plus className="h-8 w-8" />
                <Folder className="h-5 w-5 opacity-75 group-hover:opacity-100" />
              </div>
              <h3 className="text-lg font-semibold mb-2">New Project</h3>
              <p className="text-gray-500 text-sm">Start a new creative project</p>
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Usage This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Images Generated</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.usage.imagesGenerated || 0}
                  </p>
                </div>
                <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.min((user.usage.imagesGenerated / (user.subscription.plan === 'free' ? 10 : user.subscription.plan === 'pro' ? 500 : 2000)) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {user.subscription.plan === 'free' ? '10' : user.subscription.plan === 'pro' ? '500' : '2000'} limit
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Videos Created</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user.usage.videosGenerated || 0}
                  </p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.min((user.usage.videosGenerated / (user.subscription.plan === 'free' ? 3 : user.subscription.plan === 'pro' ? 50 : 200)) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {user.subscription.plan === 'free' ? '3' : user.subscription.plan === 'pro' ? '50' : '200'} limit
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((user.usage.storageUsed || 0) / 1024 * 100) / 100} GB
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.min(((user.usage.storageUsed / 1024) / (user.subscription.plan === 'free' ? 1 : user.subscription.plan === 'pro' ? 25 : 100)) * 100, 100)}%` 
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {user.subscription.plan === 'free' ? '1' : user.subscription.plan === 'pro' ? '25' : '100'} GB limit
              </p>
            </div>
          </div>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize">
                  {user.subscription.plan} Plan
                </h3>
                <p className="text-gray-600">
                  {user.subscription.plan === 'free' 
                    ? 'Start creating with our free tier' 
                    : 'Thank you for being a premium member!'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {user.subscription.plan === 'free' && (
                  <button 
                    onClick={() => router.push('/pricing')}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Upgrade Plan
                  </button>
                )}
                <button 
                  onClick={() => router.push('/settings')}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-500 mb-6">
              Start creating your first project to see your activity here
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
              Create Your First Project
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}