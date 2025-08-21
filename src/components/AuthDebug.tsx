import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug: React.FC = () => {
  const { user, userProfile, isAuthenticated, isAdmin, loading } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runDiagnostics = async () => {
    const results: string[] = [];
    
    try {
      // Test 1: Check Supabase connection
      results.push('🔍 Testing Supabase connection...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        results.push(`❌ Session error: ${sessionError.message}`);
      } else {
        results.push(`✅ Session check: ${session ? 'Active session' : 'No session'}`);
      }

      // Test 2: Check users table access
      results.push('🔍 Testing users table access...');
      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('email, role, is_active')
        .limit(5);
      
      if (usersError) {
        results.push(`❌ Users table error: ${usersError.message}`);
      } else {
        results.push(`✅ Users table accessible. Found ${users?.length || 0} users`);
        users?.forEach(user => {
          results.push(`   - ${user.email}: ${user.role} (${user.is_active ? 'active' : 'inactive'})`);
        });
      }

      // Test 3: Check admin users specifically
      results.push('🔍 Checking admin users...');
      const { data: admins, error: adminError } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'admin');
      
      if (adminError) {
        results.push(`❌ Admin query error: ${adminError.message}`);
      } else {
        results.push(`✅ Found ${admins?.length || 0} admin users`);
        admins?.forEach(admin => {
          results.push(`   - ${admin.email}: ${admin.is_active ? 'active' : 'inactive'}`);
        });
      }

      // Test 4: Test auth user creation
      if (session?.user) {
        results.push('🔍 Testing current user profile...');
        const { data: currentUserProfile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          results.push(`❌ Current user profile error: ${profileError.message}`);
          
          // Try to create the user profile
          results.push('🔧 Attempting to create user profile...');
          const isAdminEmail = session.user.email?.endsWith('@zenthra.com') || session.user.email === 'team.zenthra@gmail.com';
          
          const { data: newProfile, error: createError } = await supabase
            .from('users')
            .insert([{
              id: session.user.id,
              email: session.user.email!,
              full_name: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
              role: isAdminEmail ? 'admin' : 'user',
              is_active: true
            }])
            .select()
            .single();
          
          if (createError) {
            results.push(`❌ Profile creation failed: ${createError.message}`);
          } else {
            results.push(`✅ Profile created: ${newProfile.email} as ${newProfile.role}`);
          }
        } else {
          results.push(`✅ Current user profile found: ${currentUserProfile.email} as ${currentUserProfile.role}`);
        }
      }

    } catch (error) {
      results.push(`❌ Diagnostic error: ${error}`);
    }

    setTestResults(results);
  };

  const createTestUser = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@zenthra.com',
        password: 'test123',
        options: {
          data: {
            full_name: 'Test Admin User'
          }
        }
      });

      if (error) {
        setTestResults(prev => [...prev, `❌ Test user creation failed: ${error.message}`]);
      } else {
        setTestResults(prev => [...prev, `✅ Test user creation initiated for test@zenthra.com`]);
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Test user creation error: ${error}`]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 max-w-md max-h-96 overflow-y-auto shadow-lg z-50">
      <h3 className="font-bold text-gray-900 dark:text-white mb-2">Auth Debug</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Loading:</strong> {loading ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Admin:</strong> {isAdmin ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>User Email:</strong> {user?.email || 'None'}
        </div>
        <div>
          <strong>Profile Role:</strong> {userProfile?.role || 'None'}
        </div>
        <div>
          <strong>Profile Active:</strong> {userProfile?.is_active ? 'Yes' : 'No'}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={runDiagnostics}
          className="w-full px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Run Diagnostics
        </button>
        
        <button
          onClick={createTestUser}
          className="w-full px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Create Test User
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs max-h-48 overflow-y-auto">
          {testResults.map((result, index) => (
            <div key={index} className="mb-1">
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthDebug;