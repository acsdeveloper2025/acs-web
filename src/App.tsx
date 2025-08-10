
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CasesPage } from '@/pages/CasesPage';
import { CaseDetailPage } from '@/pages/CaseDetailPage';
import { PendingReviewPage } from '@/pages/PendingReviewPage';
import { ClientsPage } from '@/pages/ClientsPage';
import { LocationsPage } from '@/pages/LocationsPage';
import { BillingPage } from '@/pages/BillingPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { UsersPage } from '@/pages/UsersPage';
import { RealTimePage } from '@/pages/RealTimePage';
import { FormViewerPage } from '@/pages/FormViewerPage';

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
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <DashboardPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <CasesPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases/:id"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <CaseDetailPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cases/pending"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <PendingReviewPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <ClientsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/locations"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN']}>
                    <Layout>
                      <LocationsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/billing"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <BillingPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <ReportsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN']}>
                    <Layout>
                      <UsersPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/realtime"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <RealTimePage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forms"
                element={
                  <ProtectedRoute requiredRoles={['ADMIN', 'BACKEND']}>
                    <Layout>
                      <FormViewerPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
