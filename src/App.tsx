
// Working Checkpoint - Enhanced Authentication System
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EnhancedLoginPage } from '@/pages/EnhancedLoginPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<EnhancedLoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '3rem',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      maxWidth: '600px',
                      width: '100%'
                    }}>
                      <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        color: '#1f2937'
                      }}>
                        🎉 Welcome to ACS Dashboard!
                      </h1>
                      <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        marginBottom: '2rem'
                      }}>
                        Authentication system is fully functional and integrated!
                      </p>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginBottom: '2rem'
                      }}>
                        <div style={{
                          backgroundColor: '#f0f9ff',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '2px solid #0ea5e9'
                        }}>
                          <h3 style={{ color: '#0369a1', margin: '0 0 0.5rem 0' }}>✅ Login System</h3>
                          <p style={{ color: '#075985', margin: 0, fontSize: '0.9rem' }}>Working perfectly</p>
                        </div>
                        <div style={{
                          backgroundColor: '#f0fdf4',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '2px solid #22c55e'
                        }}>
                          <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>🔐 Protected Routes</h3>
                          <p style={{ color: '#15803d', margin: 0, fontSize: '0.9rem' }}>Access controlled</p>
                        </div>
                        <div style={{
                          backgroundColor: '#fefce8',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '2px solid #eab308'
                        }}>
                          <h3 style={{ color: '#a16207', margin: '0 0 0.5rem 0' }}>🚀 Ready to Expand</h3>
                          <p style={{ color: '#ca8a04', margin: 0, fontSize: '0.9rem' }}>Add more features</p>
                        </div>
                      </div>
                      <button
                        onClick={() => window.location.href = '/login'}
                        style={{
                          padding: '0.75rem 2rem',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#b91c1c'}
                        onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626'}
                      >
                        Logout & Test Login Again
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
